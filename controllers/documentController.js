import Document from "../models/Document.js";

// Save new document
export const saveDocument = async (req, res) => {
  try {
    const { filename, signed } = req.body;
    const userId = req.userId;

    const newDoc = new Document({ userId, filename, signed });
    const savedDoc = await newDoc.save();

    res.status(201).json({ message: "Document saved", document: savedDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all documents for logged-in user
export const getUserDocuments = async (req, res) => {
  try {
    const userId = req.userId;
    const documents = await Document.find({ userId });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};