import express from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuizById } from "../controllers/quizController.js";

import {isAdmin, requireSignIn}  from  "../middlewear/authmiddlewear.js"

const router = express.Router();

router.post("/create",  requireSignIn ,isAdmin,createQuiz);
router.get("/all", getAllQuizzes);
router.get("/:id",  getQuizById);
router.delete("/:id", requireSignIn,isAdmin ,deleteQuiz);

export default router;
