"use strict";
const Joi = require("joi");

const inscripcionBodySchema = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El userId no puede estar vacío.",
      "any.required": "El userId es obligatorio.",
      "string.base": "userId debe ser de tipo string.",
      "string.pattern.base":
        "El userId proporcionado no es un ObjectId válido.",
    }),
  emprendedorId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El emprendedorId no puede estar vacío.",
      "any.required": "El emprendedorId es obligatorio.",
      "string.base": "emprendedorId debe ser de tipo string.",
      "string.pattern.base":
        "El emprendedorId proporcionado no es un ObjectId válido.",
    }),
  estado: Joi.string()
    .valid("pendiente", "aprobada", "rechazada", "sin inscripciones")
    .default("sin inscripciones")
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "any.required": "El estado es obligatorio.",
      "string.base": "estado debe ser de tipo string.",
      "string.valid": "El estado debe ser uno de los valores permitidos.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const inscripcionIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

const inscripcionSchema = Joi.object({
  comentario: Joi.string().required(),
  estado: Joi.string()
    .valid("pendiente", "aprobada", "rechazada", "sin inscripciones")
    .required(),
  userId: Joi.string().required(),
  emprendedorId: Joi.string().allow(null),
  carreraId: Joi.string().required(),
  nombre_puesto: Joi.string().required(),
});

module.exports = {
  inscripcionBodySchema,
  inscripcionIdSchema,
  inscripcionSchema,
};
