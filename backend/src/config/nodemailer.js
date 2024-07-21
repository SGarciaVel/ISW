const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "your_email_service",
  auth: {
    user: "your_email",
    pass: "your_email_password",
  },
});

module.exports = transporter;
