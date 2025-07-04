// server/routes/emailRoutes.js
import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const signedFolderPath = path.resolve(__dirname, "../signed");

router.post("/send-signed-pdf", async (req, res) => {
  const { email, filename } = req.body;

  if (!email || !filename) {
    return res.status(400).json({ error: "Email and filename are required." });
  }

  const filePath = path.join(signedFolderPath, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Signed file not found." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Signed Document",
      text: "Please find the signed PDF document attached.",
      attachments: [
        {
          filename,
          path: filePath,
        },
      ],
    });

    res.status(200).json({ message: "PDF sent to email successfully ✅" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email ❌" });
  }
});

export default router;
