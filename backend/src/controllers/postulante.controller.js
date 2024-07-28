const Postulante = require("../models/postulante.model");
const { respondSuccess, respondError } = require("../utils/resHandler");

// Crea un nuevo postulante
exports.createPostulante = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion, fechaNacimiento } = req.body;

    const nuevoPostulante = new Postulante({
      nombre,
      email,
      telefono,
      direccion,
      fechaNacimiento,
    });

    const postulante = await nuevoPostulante.save();
    respondSuccess(req, res, 201, postulante);
  } catch (error) {
    console.error("Error al crear el postulante:", error);
    respondError(req, res, 500, "Error al crear el postulante");
  }
};
