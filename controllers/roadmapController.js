import Roadmap from "../models/roadmap.model.js";

/* GET ALL ROADMAPS */
export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().select("category slug level");
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET SINGLE ROADMAP */
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap)
      return res.status(404).json({ message: "Roadmap not found" });

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE ROADMAP */
export const addRoadmap = async (req, res) => {
  try {
    const { category, slug, level, description, nodes, edges } = req.body;

    const roadmap = await Roadmap.create({
      category,
      slug,
      level,
      description,
      nodes,
      edges
    });

    res.json({ message: "Roadmap Added Successfully", roadmap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE ROADMAP */
export const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!roadmap)
      return res.status(404).json({ message: "Roadmap not found" });

    res.json({ message: "Roadmap Updated Successfully", roadmap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE ROADMAP */
export const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);

    if (!roadmap)
      return res.status(404).json({ message: "Roadmap not found" });

    res.json({ message: "Roadmap Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};