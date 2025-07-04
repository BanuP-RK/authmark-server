// server/controllers/signatureRequestController.js

import jwt from 'jsonwebtoken';
import SignatureRequest from '../models/SignatureRequest.js';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export const sendSignatureRequest = async (req, res) => {
  const { email, documentId } = req.body;
  const senderId = req.userId;

  try {
    const token = jwt.sign({ email, documentId }, JWT_SECRET, { expiresIn: '7d' });

    const request = new SignatureRequest({ senderId, email, documentId, token });
    await request.save();

    const publicLink = `http://localhost:5173/sign/${token}`;

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
      subject: 'Document Signature Request',
      html: `<p>Please sign the document by clicking the link below:</p>
             <a href="${publicLink}">${publicLink}</a>`,
    });

    res.status(200).json({ message: 'Signature request email sent ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
