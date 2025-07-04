// server/controllers/emailController.js
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const sendSignedPdf = async (req, res) => {
  try {
    const { email } = req.body;
    const { filename } = req.query; // assume signed PDF filename passed in query

    const filePath = path.resolve(`./signed/${filename}`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Signed Document',
      text: 'Attached is the signed PDF document.',
      attachments: [
        {
          filename,
          path: filePath,
        },
      ],
    });

    res.status(200).json({ message: 'Signed PDF sent via email successfully ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
