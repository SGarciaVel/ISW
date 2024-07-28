const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("./src/models/user.model");
const Emprendedor = require("./src/models/emprendedor.model");
const Inscripcion = require("./src/models/inscripcion.model");
const Postulante = require("./src/models/postulante.model");

async function enviarCorreo(usuario, comentario) {
  try {
    if (!usuario.email) {
      console.error(
        "Correo no enviado: el usuario no tiene una dirección de correo electrónico.",
      );
      return;
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emprendedoresubb@gmail.com",
        pass: "yubj grly vbxb cbrn",
      },
    });

    let mailOptions = {
      from: "emprendedoresubb@gmail.com",
      to: usuario.email,
      subject: "Notificación de Inscripción",
      text: comentario,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado a:", usuario.email);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

async function validarInscripciones() {
  try {
    const inscripciones = await Inscripcion.find();

    for (const inscripcion of inscripciones) {
      console.log(`Validación para inscripción con ID: ${inscripcion._id}`);
      console.log(`Raw Inscription Data:`, inscripcion);

      // Cargar manualmente los documentos relacionados
      const usuario = await User.findById(inscripcion.userId);
      const emprendedor = await Emprendedor.findById(inscripcion.emprendedorId);
      const postulante = await Postulante.findById(inscripcion.postulante);

      // Verificación del Usuario
      if (usuario) {
        console.log(
          `Usuario encontrado: ${usuario.username} (ID: ${inscripcion.userId})`,
        );
      } else {
        console.log(`Usuario: No encontrado (ID: ${inscripcion.userId})`);
      }

      // Verificación del Emprendedor
      if (emprendedor) {
        console.log(
          `Emprendedor encontrado: ${emprendedor.nombre_completo} (ID: ${inscripcion.emprendedorId})`,
        );
      } else {
        console.log(
          `Emprendedor: No encontrado (ID: ${inscripcion.emprendedorId})`,
        );
      }

      // Verificación del Postulante
      if (postulante) {
        console.log(
          `Postulante encontrado: ${postulante.nombre} (ID: ${inscripcion.postulante})`,
        );
      } else {
        console.log(
          `Postulante: No encontrado (ID: ${inscripcion.postulante})`,
        );
      }

      if (usuario && emprendedor && postulante) {
        await enviarCorreo(usuario, inscripcion.comentario);
      } else {
        console.log(
          "Datos incompletos para enviar la notificación por correo.",
        );
      }
    }
  } catch (error) {
    console.error("Error al validar inscripciones:", error);
  } finally {
    mongoose.disconnect();
  }
}

mongoose
  .connect(
    "mongodb+srv://sebastiangarcia1601:PrQopQHTke4zXHIp@cluster0.i5efwwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log("Conectado a la base de datos");
    validarInscripciones();
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
