const mongoose = require("mongoose");

const InscripcionSchema = new mongoose.Schema({
  // otros campos
  status: {
    type: String,
    enum: ["pendiente", "aceptada", "rechazada"],
    default: "pendiente",
  },
  comentario: {
    type: String,
    default: "",
  },
  postulante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Inscripcion", InscripcionSchema);
