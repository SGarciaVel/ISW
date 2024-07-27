const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio de correo que uses
  auth: {
    user: "emprendedoresubb@gmail.com",
    pass: "emprendedoresUBB!!",
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: "yistygc@gmail.com",
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
