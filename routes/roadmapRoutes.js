// routes/roadmapRoutes.js
import express from "express";
import { addRoadmap, deleteRoadmap, getRoadmapById, getRoadmaps, updateRoadmap } from "../controllers/roadmapController.js";
import {isAdmin, requireSignIn}  from  "../middlewear/authmiddlewear.js"

const router = express.Router();

router.get("/", getRoadmaps);
router.get("/:id",  getRoadmapById);
router.post("/", requireSignIn, isAdmin, addRoadmap);
router.put("/:id", requireSignIn, isAdmin, updateRoadmap);
router.delete("/:id", requireSignIn, isAdmin, deleteRoadmap);

export default router;
