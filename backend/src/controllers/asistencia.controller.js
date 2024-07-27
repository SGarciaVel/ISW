const actividad = require("../models/actividad.model");
const emprendedor = require("../models/emprendedor.model");
const user = require("../models/user.model");
const transporter = require("../config/nodemailer");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { getActividadById } = require("./actividad.controller");

async function enroll(req, res) {
  try {
    const { id: id } = req.params;
    const userId = req.user.id;

    const actividad = await getActividadById(id);
    if (!actividad) {
      return respondError(req, res, 404, "Actividad no encontrada.");
    }

    const emprendedor = await getEmprendedorById({ userId });
    if (!emprendedor) {
      return respondError(req, res, 403, "Sin autorización");
    }

    const isInscrito = actividad.asistentes.some((asistente) =>
      asistente.userId.equals(userId),
    );
    if (isInscrito) {
      return respondError(req, res, 400, "Ya se encuentra inscrito.");
    }
    activity.asistentes.push({ userId });
    await actividad.save();

    const user = await getUserById(userId);
    const opcionesCorreo = {
      de: "your_email",
      para: user.email,
      asunto: "Inscripción a Actividad Confirmada",
      texto:
        "Te has inscrito de manera exitosa a ${actividad.categoria} en ${actividad.lugar} del ${actividad.fechaInicio} hasta ${actividad.fechaFin}. Por favor, confirma tu asistencia al menos 3 días antes del evento.",
    };

    transporter.enviarCorreo(opcionesCorreo, (error, info) => {
      if (error) return respondError(req, res, 500, error.mensaje);
      res.json({ mensaje: "Inscripción exitosa!", info });
    });
  } catch (error) {
    handleError(error, "asistencia.controller -> enroll");
    respondError(req, res, 500, "Error al inscribirse en la actividad");
  }
}

async function confirm(req, res) {
  try {
    const { id: id } = req.params;
    const userId = req.user.id;

    const actividad = await getActividadById(id);
    if (!actividad) {
      return respondError(req, res, 404, "Actividad no encontrada");
    }

    const asistente = actividad.asistentes.find((asistente) =>
      asistente.userId.equals(userId),
    );
    if (!asistente) {
      return respondError(
        req,
        res,
        400,
        "No se encuentra inscrito en esta actividad.",
      );
    }

    const diasRestantes =
      (new Date(actividad.fechaInicio) - new Date()) / (1000 * 60 * 60 * 24);
    if (diasRestantes < 3) {
      return respondError(
        req,
        res,
        400,
        "Lo sentimos. No es posible confirmar asistencia en menos de 3 días antes del evento",
      );
    }

    asistente.confirmado = true;
    await actividad.save();

    res.json({ mensaje: "Asistencia confirmada" });
  } catch (error) {
    handleError(error, "asistencia.controller -> confirm");
    respondError(req, res, 500, "Error al confirmar asistencia");
  }
}

module.exports = {
  inscribir,
  confirmar,
};
