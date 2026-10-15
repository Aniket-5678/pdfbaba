import express from "express";
import { createCodingQuestion, deleteCodingQuestion, executeCodingQuestion, getCodingQuestion, getCodingSolution, listCodingQuestions, updateCodingQuestion } from "../controllers/codingQuestionController.js";
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js";

const router = express.Router();
router.get("/", listCodingQuestions);
router.get("/admin/all", requireSignIn, isAdmin, (req, res, next) => {
  req.includeDrafts = true;
  next();
}, listCodingQuestions);
router.get("/:id/solution", getCodingSolution);
router.post("/:id/execute", executeCodingQuestion);
router.get("/:id", getCodingQuestion);
router.post("/", requireSignIn, isAdmin, createCodingQuestion);
router.put("/:id", requireSignIn, isAdmin, updateCodingQuestion);
router.delete("/:id", requireSignIn, isAdmin, deleteCodingQuestion);
export default router;
