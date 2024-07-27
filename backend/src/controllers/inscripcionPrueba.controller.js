const Inscripcion = require("../models/inscripcion.model");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { inscripcionSchema } = require("../schema/inscripcion.schema");

// Obtiene todas las inscripciones
exports.getAllInscripciones = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // filtros adicionales
  const filters = {};
  if (req.query.estado) {
    filters.estado = req.query.estado;
  }

  try {
    const inscripciones = await Inscripcion.find().skip(skip).limit(limit);
    const total = await Inscripcion.countDocuments(filters);
    // respondSuccess(req, res, 200, inscripciones);
    respondSuccess(req, res, 200, {
      total,
      page,
      pages: Math.ceil(total / limit),
      inscripciones,
    });
  } catch (error) {
    respondError(req, res, 500, "Error al obtener las inscripciones");
  }
};

// Obtiene una inscripción por ID
exports.getInscripcionById = async (req, res) => {
  try {
    const { id } = req.params;
    const inscripcion = await Inscripcion.findById(id);
    if (!inscripcion) {
      return respondError(req, res, 404, "Inscripción no encontrada");
    }
    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    respondError(req, res, 500, "Error al obtener la inscripción");
  }
};

// Crea una nueva inscripción
exports.createInscripcion = async (req, res) => {
  try {
    const {
      nombre,
      email,
      estado,
      comentario,
      postulante,
      emprendedorId,
      userId,
    } = req.body;
    if (
      !nombre ||
      !email ||
      !estado ||
      !postulante ||
      !emprendedorId ||
      !userId
    ) {
      return respondError(req, res, 400, "Faltan campos requeridos");
    }
    console.log("Datos recibidos para crear inscripción:", req.body);
    const { error, value } = inscripcionSchema.validate(req.body);
    if (error) {
      console.error("Error en la validación:", error.details[0].message);
      return respondError(req, res, 400, error.details[0].message);
    }

    const nuevaInscripcion = new Inscripcion({
      ...value,
      fechaCreacion: new Date(),
    });
    const inscripcion = await nuevaInscripcion.save();
    console.log("Inscripción creada exitosamente:", inscripcion);
    respondSuccess(req, res, 201, inscripcion);
  } catch (error) {
    console.error("Error al crear la inscripción:", error);
    respondError(req, res, 500, "Error al crear la inscripción");
  }
};

// Actualiza una inscripción existente
exports.updateInscripcion = async (req, res) => {
  const { id } = req.params;
  const { estado, comentario } = req.body;

  try {
    const { error, value } = inscripcionSchema.validate({ estado, comentario });
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }

    const inscripcion = await Inscripcion.findByIdAndUpdate(
      id,
      { estado: value.estado, comentario: value.comentario },
      { new: true },
    );
    if (!inscripcion) {
      return respondError(req, res, 404, "Inscripción no encontrada");
    }
    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    respondError(req, res, 500, "Error al actualizar la inscripción");
  }
};

// Elimina una inscripción por ID
exports.deleteInscripcion = async (req, res) => {
  const { id } = req.params;

  try {
    const inscripcion = await Inscripcion.findByIdAndDelete(id);
    if (!inscripcion) {
      return respondError(req, res, 404, "Inscripción no encontrada");
    }
    respondSuccess(req, res, 200, {
      message: "Inscripción eliminada exitosamente",
    });
  } catch (error) {
    respondError(req, res, 500, "Error al eliminar la inscripción");
  }
};
