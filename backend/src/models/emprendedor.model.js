"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emprendedorSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    nombre_completo: {
      type: String,
      required: true,
      maxLength: 100,
    },
    rut: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
      minLength: 9,
      maxLength: 15,
    },
    carreraId: {
      type: Schema.ObjectId,
      ref: "Carrera",
      required: true,
    },
    nombre_puesto: {
      type: String,
      required: true,
      maxLength: 100,
    },
    productosId: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Productos",
        },
      ],
      required: true,
      default: [],
      maxItems: 100,
    },
    ayudantesId: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Ayudantes",
        },
      ],
      required: false,
      default: [],
      maxItems: 3,
    },
  },
  {
    versionKey: false,
  },
);

const Emprendedor = mongoose.model("Emprendedor", emprendedorSchema);

module.exports = Emprendedor;
