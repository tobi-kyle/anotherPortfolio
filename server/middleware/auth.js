import jwt from "jsonwebtoken";
import config from "../../config/config.js";

// This is your requireSignin function (already in your file)
const requireSignin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);
    req.auth = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: "Admin only. Not authorized." });
};

export default requireSignin;
