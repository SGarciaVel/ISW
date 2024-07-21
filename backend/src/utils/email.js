const { API_KEY } = require("../config/configEnv.js");
const { Resend } = require("resend");


async function enviarCorreo(report) {
  try {
    const resend = new Resend(API_KEY);
    const toEmail = "testemprendedoresubb@gmail.com";
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Notificación de Actividad EMPRENDEDORES UBB",
      html: `<strong>${report.mensaje}</strong>`,
    });

    if (error) {
      return { error };
    }

    return { data };
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return { error: err.message };
  }
}

module.exports = { enviarCorreo };
//
