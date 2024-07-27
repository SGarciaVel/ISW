require("dotenv").config();
const { sendEmail } = require("./emailHandler");

// Prueba de envío de correo
sendEmail(
  "sebastian.garcia1601@alumnos.ubiobio.cl",
  "Asunto de prueba",
  "Este es el cuerpo del correo de prueba.",
)
  .then(() => console.log("Correo de prueba enviado"))
  .catch((err) => console.error("Error al enviar el correo de prueba", err));
