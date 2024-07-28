"use strict";
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inscripcionSchema = new mongoose.Schema(
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
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    emprendedorId: {
      type: Schema.ObjectId,
      ref: "Emprendedor",
      required: true,
    },
    comentario: {
      type: String,
      default: "",
    },
    postulante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Postulante",
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
      default: "sin inscripciones",
      required: true,
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now,
      required: true,
    },
    rut: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
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
  },
  {
    versionKey: false,
  },
);

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
