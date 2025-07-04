// server/middleware/authenticateUser.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "my_very_strong_jwt_secret_key_2025";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id || decoded.userId; // compatible with both styles
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
