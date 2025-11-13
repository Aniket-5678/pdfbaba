import express from "express";
import {
  createSourceCode,
  deleteSourceCode,
  getAllSourceCodes,
  getSourceCodeById,
  updateSourceCode,
} from "../controllers/sourceCodeController.js";
import {
  startPayment,
  verifyPayment,
  downloadSourceCode,
  checkFileAvailability,
  getUserOrders,
  getAllUserOrders,
} from "../controllers/paymentController.js";
import sourcecodeUpload from "../middlewear/sourcecode.js";
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js";

const router = express.Router();

router.post("/create", sourcecodeUpload, createSourceCode);

router.get("/", getAllSourceCodes);


router.post("/buy", requireSignIn, startPayment);
router.post("/verify", requireSignIn, verifyPayment);

router.get("/download/:token", requireSignIn, downloadSourceCode);
router.get("/download/check/:id", requireSignIn, checkFileAvailability);
router.get("/my-orders", requireSignIn, getUserOrders);
router.get("/all-orders", requireSignIn, isAdmin, getAllUserOrders);
router.get("/:id", getSourceCodeById);

router.put("/update/:id",  sourcecodeUpload, updateSourceCode);
router.delete("/delete/:id", deleteSourceCode);

export default router;
