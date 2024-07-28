const Joi = require("joi");

const postulanteSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  celular: Joi.string().required(),
  direccion: Joi.string().required(),
  fechaNacimiento: Joi.date().required(),
  rut: Joi.string().required(),
});

module.exports = { postulanteSchema };
