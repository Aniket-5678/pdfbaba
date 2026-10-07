import multer from "multer";
import path from "path";
import fs from "fs";

const dir = path.join(process.cwd(), "uploads", "builder");
fs.mkdirSync(dir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`),
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (_req, file, cb) => {
  if (/^image\/(png|jpeg|webp|gif)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error("Upload a PNG, JPG, WEBP or GIF image"));
} }).single("image");
export default function builderUpload(req, res, next) {
  upload(req, res, (error) => error ? res.status(400).json({ message: error.message }) : next());
}
