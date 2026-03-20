import express from "express";
import {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getRelatedNotes,
} from "../controllers/note.controller.js";

const router = express.Router();

// ================= CREATE =================
router.post("/", createNote);

// ================= GET ALL =================
router.get("/", getAllNotes);


// ================= UPDATE =================
router.put("/:id", updateNote);

// ================= DELETE =================
router.delete("/:id", deleteNote);

// ================= RELATED =================
router.get("/related/:slug", getRelatedNotes);
router.get("/:slug", getSingleNote);

export default router;