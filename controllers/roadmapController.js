// controllers/roadmapController.js
import Roadmap from "../models/roadmap.model.js";

// Get all roadmaps
export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single roadmap by ID
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roadmap" });
  }
};

// Add a new roadmap
export const addRoadmap = async (req, res) => {
  try {
    const newRoadmap = new Roadmap(req.body);
    await newRoadmap.save();
    res.json({ message: "Roadmap Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding roadmap" });
  }
};

// Update a roadmap
export const updateRoadmap = async (req, res) => {
  try {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json({ message: "Roadmap Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating roadmap" });
  }
};

// Delete a roadmap
export const deleteRoadmap = async (req, res) => {
  try {
    const deletedRoadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!deletedRoadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json({ message: "Roadmap Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting roadmap" });
  }
};
