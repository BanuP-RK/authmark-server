// import mongoose from 'mongoose';

// const signatureSchema = new mongoose.Schema({
//   documentId: String,
//   userId: String,
//   x: Number,
//   y: Number,
//   page: Number,
//   font: String,
//   text: String,
// }, { timestamps: true });

// export default mongoose.model("Signature", signatureSchema);
import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  documentId: String,
  userId: String,
  userEmail: {
    type: String,
    required: true,
  },
  x: Number,
  y: Number,
  page: Number,
  font: String,
  text: String,
}, { timestamps: true });

export default mongoose.model("Signature", signatureSchema);
