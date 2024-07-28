const Joi = require("joi");

const postulanteSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  direccion: Joi.string().required(),
  fechaNacimiento: Joi.date().required(),
  rut: Joi.string().required(), // Asegúrate de que esté aquí si es necesario
  celular: Joi.string().required(), // Usar celular en lugar de telefono
});

module.exports = { postulanteSchema };
