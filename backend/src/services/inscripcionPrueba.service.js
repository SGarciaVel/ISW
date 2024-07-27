const Inscripcion = require("../models/inscripcionPrueba.model");
const User = require("../models/user.model");
const { sendEmail } = require("../utils/emailHandler");

class InscripcionService {
  async getAll() {
    return await Inscripcion.find().populate("postulante");
  }

  async updateStatus(id, status, comentario = "") {
    const inscripcion = await Inscripcion.findById(id);
    if (!inscripcion) {
      throw new Error("Inscripción no encontrada");
    }

    inscripcion.status = status;
    inscripcion.comentario = comentario;
    await inscripcion.save();

    const postulante = await User.findById(inscripcion.postulante);
    if (!postulante) {
      throw new Error("Postulante no encontrado");
    }

    await sendEmail(
      postulante.email,
      "Estado de tu postulación",
      `Tu postulación ha sido ${status}. ${comentario}`,
    );

    if (status === "aceptada") {
      postulante.role = "emprendedor";
      await postulante.save();
    }

    return inscripcion;
  }
}

module.exports = new InscripcionService();
