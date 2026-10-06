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

const sourcecodeUpload = multer({
  storage,
  fileFilter,
   limits: {
    fileSize: 1024 * 1024 * 1024, // 1 GB max file size
  },

}).fields([
  { name: "zipFile", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "multipleImages", maxCount: 20 },
]);

// Multer errors happen before the controller and otherwise fall through to
// Express's HTML error page. Keep upload failures in the API's JSON format.
const handleSourcecodeUpload = (req, res, next) => {
  sourcecodeUpload(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      const tooLarge = error.code === "LIMIT_FILE_SIZE";
      return res.status(tooLarge ? 413 : 400).json({
        message: tooLarge
          ? "An uploaded file exceeds the 1 GB limit"
          : "Upload could not be processed",
        code: error.code,
      });
    }

    if (error.message === "Invalid file type") {
      return res.status(400).json({
        message: "ZIP must be a .zip file; images must be JPG or PNG",
      });
    }

    console.error("Source code upload failed:", error);
    return res.status(500).json({ message: "Could not save uploaded files" });
  });
};

export default handleSourcecodeUpload;
