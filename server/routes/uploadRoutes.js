// routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// ✅ Handle ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads')); // Note: Ensure correct relative path
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// ✅ Validate image types
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/; // Allow webp too
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!")); // ❗️Wrap error in `Error()` object
  }
}

// ✅ Configure upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

// ✅ Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded." });
  }
  res.json({ avatar: `/uploads/${req.file.filename}` }); // ✅ Use absolute path from server root
});

export default router;
