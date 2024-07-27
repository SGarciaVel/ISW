const mongoose = require("mongoose");

const asistenciaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    asistio: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Asistencia = mongoose.model("Asistencia", asistenciaSchema);

module.exports = Asistencia;
