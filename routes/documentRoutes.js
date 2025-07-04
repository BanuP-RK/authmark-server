import express from "express";
import { saveDocument, getUserDocuments } from "../controllers/documentController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ named import

const router = express.Router();

router.post("/", verifyToken, saveDocument);
router.get("/", verifyToken, getUserDocuments);

export default router;
