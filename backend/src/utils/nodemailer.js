const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'emprendedoresubb@gmail.com',
    pass: 'yubj grly vbxb cbrn',
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'emprendedoresubb@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = sendMail;
