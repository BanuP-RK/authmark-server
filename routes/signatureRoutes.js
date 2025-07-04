import express from 'express';
import {
  saveSignature,
  getSignatures,
  deleteSignature,
  updateSignaturePosition,
} from '../controllers/signatureController.js';
import { sendSignatureRequest } from '../controllers/signatureRequestController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅ correct one

const router = express.Router();

router.post('/', verifyToken, saveSignature);
router.get('/', verifyToken, getSignatures);
router.delete('/:id', verifyToken, deleteSignature);
router.put('/:id', verifyToken, updateSignaturePosition);

// Add this later if needed
// router.post('/send-request', verifyToken, sendSignatureRequest);

export default router;
