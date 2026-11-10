import express from "express";
import {
  createLearningTutorial,
  deleteLearningTutorial,
  listLearningTutorials,
  updateLearningTutorial,
} from "../controllers/learningTutorial.controller.js";
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js";

const router = express.Router();
router.get("/", listLearningTutorials);
router.post("/", requireSignIn, isAdmin, createLearningTutorial);
router.put("/:id", requireSignIn, isAdmin, updateLearningTutorial);
router.delete("/:id", requireSignIn, isAdmin, deleteLearningTutorial);

export default router;
