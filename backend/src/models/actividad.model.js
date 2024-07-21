const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
  emprendedoresId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emprendedor",
    },
  ],
  productosId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
  categoria: {
    type: String,
    required: true,
    enum: ["Reunión", "Taller", "Evento", "Otro"],
  },
  nombre: {
    type: String,
    required: true,
    maxLength: 100,
  },
  descripcion: {
    type: String,
    required: true,
    maxLength: 255,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: Date,
    required: true,
  },
  horaFin: {
    type: Date,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  capacidadAsistentes: {
    type: Number,
    required: true,
  },
});

const Actividad = mongoose.model("Actividad", actividadSchema);

module.exports = Actividad;

//
