require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors("*"));

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

app.post("/send-email", async (req, res) => {
  try {
    const { email, subject, message, name } = req.body;
    await sendEmail({ email, subject, message, name });
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome foks" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
