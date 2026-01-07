const nodemailer = require("nodemailer");
const { formatEvent } = require("./msg_format");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(event) {
  const text = formatEvent(event);

  await transporter.sendMail({
    from: `"Xahau Ops Detector" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `[Xahau] ${event.type} detected`,
    text
  });
}

module.exports = { sendEmail };
