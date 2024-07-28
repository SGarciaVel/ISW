const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    /* telefono: {
      type: String,
      required: true,
    }, */
    direccion: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Postulante = mongoose.model("Postulante", postulanteSchema);

module.exports = Postulante;
