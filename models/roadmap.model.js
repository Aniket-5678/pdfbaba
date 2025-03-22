// models/Roadmap.js
import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema({
  category: { type: String, required: true },
  steps: { type: [String], required: true },
});

const Roadmap = mongoose.model("Roadmap", RoadmapSchema);

export default Roadmap;
