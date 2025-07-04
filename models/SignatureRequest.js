// models/SignatureRequest.js
import mongoose from 'mongoose';

const signatureRequestSchema = new mongoose.Schema({
  senderId: String,
  email: String,
  documentId: String,
  token: String,
  status: {
    type: String,
    enum: ['Pending', 'Signed', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.model('SignatureRequest', signatureRequestSchema);
