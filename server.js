import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// ✅ Route imports
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import signatureRoutes from "./routes/signatureRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("✅ AuthMark backend is live and running!");
});

// 🟢 Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middlewares
const corsOptions = {
  origin: "https://authmark.netlify.app", // ✅ Only allow Netlify frontend
  credentials: true, // ✅ If you're sending cookies or auth headers
  methods: ["GET", "POST", "PUT", "DELETE"], // optional, but good for clarity
  allowedHeaders: ["Content-Type", "Authorization"], // optional but helpful for preflight checks
};

app.use(cors(corsOptions));

app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ Serve static files from /signed folder
app.use("/signed", express.static(path.join(__dirname, "signed")));

// ✅ Start Server after DB Connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
