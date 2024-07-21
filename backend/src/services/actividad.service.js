const Actividad = require("../models/actividad.model");
const Emprendedor = require("../models/emprendedor.model");
const User = require("../models/user.model");
const { enviarCorreo } = require("../utils/email");
const { handleError } = require("../utils/errorHandler");

async function getAllActividades() {
  try {
    const actividades = await Actividad.find().populate("emprendedoresId");
    if (actividades.length === 0)
      return [null, "No hay actividades registradas"];
    return [actividades, null];
  } catch (error) {
    handleError(error, "actividad.service -> getAllActividades");
    return [null, error.message];
  }
}

async function getActividadById(id) {
  try {
    const actividad = await Actividad.findById(id).populate("emprendedoresId");
    if (!actividad) return [null, "Actividad no encontrada"];
    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> getActividadById");
    return [null, error.message];
  }
}

async function createActividad(actividadData) {
  try {
    const actividad = new Actividad(actividadData);
    await actividad.save();
    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> createActividad");
    return [null, error.message];
  }
}

async function updateActividadById(id, actividadData) {
  try {
    const updatedActividad = await Actividad.findByIdAndUpdate(
      id,
      actividadData,
      { new: true },
    ).populate("emprendedoresId");
    if (!updatedActividad) return [null, "Actividad no se actualizó"];
    return [updatedActividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> updateActividadById");
    return [null, error.message];
  }
}

async function deleteActividad(id) {
  try {
    const deletedActividad = await Actividad.findByIdAndDelete(id);
    if (!deletedActividad) return [null, "Actividad no eliminada"];
    return [deletedActividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> deleteActividad");
    return [null, error.message];
  }
}

async function inscribirEmprendedor(actividadId, emprendedorId) {
  try {
    const actividad = await Actividad.findById(actividadId);
    if (!actividad) return [null, "Actividad no encontrada"];

    if (!actividad.emprendedoresId.includes(emprendedorId)) {
      actividad.emprendedoresId.push(emprendedorId);
      await actividad.save();

      // Obtener el correo del usuario asociado al emprendedor
      const emprendedor =
        await Emprendedor.findById(emprendedorId).populate("userId");
      if (!emprendedor) {
        return [null, "Emprendedor no encontrado"];
      }
      const user = await User.findById(emprendedor.userId);
      if (!user) {
        return [null, "Usuario no encontrado"];
      }
      const userEmail = user.email;

      // Enviar correo electrónico
      const emailReport = {
        email: userEmail,
        mensaje: `Usted está inscrito en la actividad: ${
          actividad.nombre
        }. Esto es un recordatorio para que asista el ${actividad.fechaInicio.toLocaleDateString()} a la hora ${actividad.horaInicio.toLocaleTimeString()}.`,
      };
      const emailResponse = await enviarCorreo(emailReport);
      if (emailResponse.error) {
        console.error("Error al enviar correo:", emailResponse.error);
      }
    } else {
      return [null, "El emprendedor ya está inscrito en esta actividad"];
    }

    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> inscribirEmprendedor");
    return [null, error.message];
  }
}

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividadById,
  deleteActividad,
  inscribirEmprendedor,
};
