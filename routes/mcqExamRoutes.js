import express from "express";
import { createExam, deleteExam, getExamById, getExams } from "../controllers/mcqExamController.js";


const router = express.Router();

// @route POST /api/v1/mcqexam
router.post("/", createExam);

// @route GET /api/v1/mcqexam
router.get("/", getExams);

// @route GET /api/v1/mcqexam/:id
router.get("/:id", getExamById);

router.delete("/:id", deleteExam);
export default router;
