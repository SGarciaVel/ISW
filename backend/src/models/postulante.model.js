const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// fecha limite para validacion
const MIN_DATE = new Date("1930-01-01");

const postulanteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    celular: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= MIN_DATE;
        },
        message:
          "La fecha de nacimiento debe ser después del 1 de enero de 1930.",
      },
    },
    rut: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Postulante = mongoose.model("Postulante", postulanteSchema);

module.exports = Postulante;
