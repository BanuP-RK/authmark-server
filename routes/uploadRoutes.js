// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const router = express.Router();

// // Ensure "signed" directory exists
// const signedDir = path.join("signed");
// if (!fs.existsSync(signedDir)) fs.mkdirSync(signedDir);

// // Setup multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, signedDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueFilename = `${Date.now()}-signed-document.pdf`;
//     cb(null, uniqueFilename);
//   },
// });

// const upload = multer({ storage });

// // POST /api/upload/upload-signed-pdf
// router.post("/upload-signed-pdf", upload.single("pdf"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   // ✅ Return filename and full path to frontend
//   return res.status(200).json({
//     message: "Uploaded successfully",
//     filename: req.file.filename,
//     path: req.file.path,
//   });
// });

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ correct import

const router = express.Router();

// Create "signed" directory if not exists
const signedDir = path.join("signed");
if (!fs.existsSync(signedDir)) fs.mkdirSync(signedDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, signedDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-signed-document.pdf`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

// ✅ Protect this route with verifyToken
router.post("/upload-signed-pdf", verifyToken, upload.single("pdf"), (req, res) => {
  const userId = req.userId; // You now get this from the token ✅

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // You can save `userId` or later find `userEmail` if needed
  return res.status(200).json({
    message: "Uploaded successfully",
    filename: req.file.filename,
    path: req.file.path,
  });
});

export default router;

