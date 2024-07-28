const Inscripcion = require("../models/inscripcion.model");
const User = require("../models/user.model");
const Postulante = require("../models/postulante.model");
const Emprendedor = require("../models/emprendedor.model");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { inscripcionSchema } = require("../schema/inscripcion.schema");
const { postulanteSchema } = require("../schema/postulante.schema");
const sendMail = require("../utils/nodemailer");
const Joi = require("joi");

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
    console.log("Datos recibidos para crear inscripción:", req.body);

    // Datos del postulante
    const postulanteData = {
      nombre: req.body.nombre,
      email: req.body.email,
      celular: req.body.celular,
      direccion: req.body.direccion,
      fechaNacimiento: req.body.fechaNacimiento,
      rut: req.body.rut,
    };

    console.log("Datos del postulante_:", postulanteData);

    // Verificar si el postulante ya existe
    let postulante = await Postulante.findOne({ email: req.body.email });
    if (!postulante) {
      // Validar datos del postulante
      const { error: postulanteError, value: postulanteValue } =
        postulanteSchema.validate(postulanteData);
      if (postulanteError) {
        console.error(
          "Error en la validación de postulante:",
          postulanteError.details[0].message,
        );
        return respondError(req, res, 400, postulanteError.details[0].message);
      }

      // Crear nuevo postulante
      postulante = new Postulante(postulanteValue);
      await postulante.save();
    }

    // Datos de la inscripción (no incluye postulante)
    const inscripcionData = {
      comentario: req.body.comentario,
      estado: req.body.estado,
      userId: req.body.userId,
      emprendedorId: req.body.emprendedorId,
      carreraId: req.body.carreraId,
      nombre_puesto: req.body.nombre_puesto,
    };
    // Validar datos de inscripción
    const { error: inscripcionError, value: inscripcionValue } =
      inscripcionSchema.validate(inscripcionData, { abortEarly: false });
    if (inscripcionError) {
      console.error(
        "Error en la validación de inscripción:",
        inscripcionError.details.map((detail) => detail.message).join(", "),
      );
      return respondError(
        req,
        res,
        400,
        inscripcionError.details.map((detail) => detail.message).join(", "),
      );
    }

    // Crear nueva inscripción con el ID del postulante
    const nuevaInscripcion = new Inscripcion({
      ...inscripcionValue,
      postulante: postulante._id,
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
  console.log(
    "Solicitud para actualizar inscripción recibida",
    req.params,
    req.body,
  );
  const { id } = req.params;
  const { estado, comentario } = req.body;

  try {
    console.log("Validando datos de la solicitud");
    // Usa Joi para validar el objeto completo
    const { error, value } = Joi.object({
      estado: Joi.string()
        .valid("pendiente", "aprobada", "rechazada", "sin inscripciones")
        .required(),
      comentario: Joi.string().required(),
    }).validate({ estado, comentario });

    if (error) {
      console.log("Error de validación:", error.details[0].message);
      return respondError(req, res, 400, error.details[0].message);
    }

    console.log("Actualizando inscripción en la base de datos");
    const inscripcion = await Inscripcion.findByIdAndUpdate(
      id,
      { estado, comentario },
      { new: true },
    );

    if (!inscripcion) {
      console.log("Inscripción no encontrada");
      return res
        .status(404)
        .json({ state: "Error", message: "Inscripción no encontrada" });
    }
    // Si el estado de la inscripción es "aprobada", crear un nuevo emprendedor
    if (value.estado === "aprobada") {
      // Recuperar el postulante directamente desde el modelo Postulante usando el ID almacenado en la inscripción
      const postulante = await Postulante.findById(inscripcion.postulante);

      if (!postulante) {
        console.log("Postulante asociado no encontrado");
        return respondError(req, res, 404, "Postulante asociado no encontrado");
      }

      const emprendedorData = {
        userId: inscripcion.userId,
        nombre_completo: postulante.nombre,
        rut: postulante.rut,
        celular: postulante.celular,
        carreraId: inscripcion.carreraId,
        nombre_puesto: inscripcion.nombre_puesto,
        productosId: [],
        ayudantesId: [],
      };

      const nuevoEmprendedor = new Emprendedor(emprendedorData);
      await nuevoEmprendedor.save();

      // Actualizar el emprendedorId en la inscripción
      inscripcion.emprendedorId = nuevoEmprendedor._id;
      await inscripcion.save();

      // Enviar correo de notificación
      const subject = "Tu postulación ha sido aprobada";
      const text = `Hola ${postulante.nombre},\n\nTu postulación ha sido aprobada.\n\n`;
      await sendMail(postulante.email, subject, text);

      // Asignar rol de emprendedor al usuario
      const usuario = await User.findById(inscripcion.userId);
      if (usuario) {
        usuario.role = "emprendedor";
        await usuario.save();
      }
    }

    console.log("Solicitud procesada exitosamente");
    respondSuccess(req, res, 200, inscripcion);
  } catch (error) {
    console.error("Error al actualizar la inscripción:", error);
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
