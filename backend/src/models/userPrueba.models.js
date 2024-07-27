const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definición del esquema de usuario
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "encargado", "emprendedor"],
    default: "emprendedor",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Método para ocultar la contraseña en las respuestas
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Middleware para hash de contraseña antes de guardar
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Comparar contraseñas
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exportar el modelo de usuario
module.exports = mongoose.model("User", userSchema);
