import express from "express";
import mongoose from "mongoose";
import { requireSignIn, isAdmin } from "../middlewear/authmiddlewear.js";
import {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getRelatedNotes,
} from "../controllers/note.controller.js";
const router = express.Router();
const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ message: "Invalid note ID" });
router.get("/", getAllNotes);
router.post("/", requireSignIn, isAdmin, createNote);
router.put("/:id", requireSignIn, isAdmin, validId, updateNote);
router.delete("/:id", requireSignIn, isAdmin, validId, deleteNote);
router.get("/related/:slug", getRelatedNotes);
router.get("/:slug", getSingleNote);
export default router;
