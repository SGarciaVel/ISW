const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ackermanfgdiscord@gmail.com",
        pass: "2022!!??Lagarra",
    },
});

module.exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "ackermanfgdiscord@gmail.com",
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};
