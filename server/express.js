import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";

const app = express();

// 🔐 Load FRONTEND_URL from environment variables
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ✅ Setup CORS with dynamic origin
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

// Root test route (optional)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;
