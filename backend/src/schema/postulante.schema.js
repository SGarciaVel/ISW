const Joi = require("joi");

const postulanteSchema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    telefono: Joi.string().required(),
    direccion: Joi.string().required(),
    fechaNacimiento: Joi.date().required(),
});

module.exports = { postulanteSchema };
