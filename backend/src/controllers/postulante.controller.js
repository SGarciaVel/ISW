const Postulante = require("../models/postulante.model");
const { respondSuccess, respondError } = require("../utils/resHandler");

// Crea un nuevo postulante
exports.createPostulante = async (req, res) => {
  try {
    const { nombre, email, celular, direccion, fechaNacimiento, rut } = req.body;

    const nuevoPostulante = new Postulante({
      nombre,
      email,
      celular,
      direccion,
      fechaNacimiento,
      rut,
    });

    const postulante = await nuevoPostulante.save();
    respondSuccess(req, res, 201, postulante);
  } catch (error) {
    console.error("Error al crear el postulante:", error);
    respondError(req, res, 500, "Error al crear el postulante");
  }
};
