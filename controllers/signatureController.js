// server/controllers/signatureController.js

import Signature from '../models/Signature.js';

// Save a new signature
export const saveSignature = async (req, res) => {
  try {
    // 🟡 Step 2: Add logs here
    console.log("➡️ Incoming Signature Save Request");
    console.log("🟢 req.body:", req.body);
    console.log("🟢 req.userId:", req.userId);

    const { documentId, x, y, page, font, text } = req.body;
    const userId = req.userId;

    const newSignature = new Signature({
      documentId,
      userId,
      userEmail: req.userEmail,
      x,
      y,
      page,
      font,
      text,
    });

    const saved = await newSignature.save();

    res.status(201).json({ message: "Signature saved ✅", _id: saved._id });
  } catch (error) {
    console.error("❌ SAVE SIGNATURE ERROR:", error); // 🔥 this is key
    res.status(500).json({ error: error.message });
  }
};

// Get all signatures for a document and page
export const getSignatures = async (req, res) => {
  try {
    const { documentId, page } = req.query;
    const userId = req.user.id; // ✅ FIXED

    const signatures = await Signature.find({ documentId, page: Number(page), userId });
    res.status(200).json(signatures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a specific signature by ID
export const deleteSignature = async (req, res) => {
  try {
    const { id } = req.params;
    await Signature.findByIdAndDelete(id);
    res.status(200).json({ message: 'Signature deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update signature position
export const updateSignaturePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { x, y } = req.body;

    await Signature.findByIdAndUpdate(id, { x, y });
    res.status(200).json({ message: 'Position updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
