const mongoose = require("mongoose");
const User = require("./src/models/user.model"); // Ajusta la ruta según tu estructura de carpetas

// Conéctate a la base de datos
mongoose.connect(
  "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

async function updatePasswords() {
  try {
    // Encuentra todos los usuarios
    const users = await User.find({});

    for (const user of users) {
      if (user.password && !user.password.startsWith("$2a$")) {
        // Verifica si la contraseña ya está encriptada
        const hashedPassword = await User.encryptPassword(user.password);
        await User.updateOne({ _id: user._id }, { password: hashedPassword });
        console.log(`Contraseña actualizada para el usuario ${user.email}`);
      }
    }
  } catch (error) {
    console.error("Error actualizando contraseñas:", error);
  } finally {
    console.log("Contraseñas actualizadas");
    mongoose.disconnect();
  }
}

updatePasswords();
