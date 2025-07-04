import Document from "../models/Document.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;

    const uploadedDocs = await Document.find({ userId });
    const uploaded = uploadedDocs.length;

    const signed = uploadedDocs.filter(doc => doc.signed).length;
    const pending = uploaded - signed;

    res.json({ uploaded, signed, pending });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
