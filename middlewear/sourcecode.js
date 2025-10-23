import multer from "multer";
import path from "path";
import fs from "fs";

// Upload folder (directly in project root)
const uploadPath = path.join(process.cwd(), "sourcecodes");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.fieldname === "zipFile" && ext === ".zip") cb(null, true);
  else if (
    ["thumbnail", "multipleImages"].includes(file.fieldname) &&
    [".jpg", ".jpeg", ".png"].includes(ext)
  )
    cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

const sourcecodeUpload = multer({ storage, fileFilter }).fields([
  { name: "zipFile", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "multipleImages", maxCount: 20 },
]);

export default sourcecodeUpload;
