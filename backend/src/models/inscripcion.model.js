"use strict";
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inscripcionSchema = new mongoose.Schema(
  {
    comentario: {
      type: String,
      default: "",
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
      default: "sin inscripciones",
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    emprendedorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emprendedor",
      default: null,
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now,
      required: true,
    },
    carreraId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Carrera",
    },
    nombre_puesto: {
      type: String,
      required: true,
    },
    postulante: { type: mongoose.Schema.Types.ObjectId, ref: "Postulante" },
    // Agregar esto si es necesario
  },
  {
    versionKey: false,
  },
);

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
