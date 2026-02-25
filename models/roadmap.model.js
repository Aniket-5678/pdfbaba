import mongoose from "mongoose";

/* -------- Node (box in roadmap chart) -------- */
const nodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  type: {
    type: String,
    enum: ["start", "normal", "advanced", "optional"],
    default: "normal"
  },

  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
});

/* -------- Connection line between nodes -------- */
const edgeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  target: { type: String, required: true },
  label: { type: String, default: "" }
});

/* -------- Main Roadmap -------- */
const RoadmapSchema = new mongoose.Schema({
  category: { type: String, required: true }, // ex: Web Development
  slug: { type: String, unique: true },       // web-development
  level: { type: String, default: "beginner" },
  description: { type: String, default: "" },

  nodes: [nodeSchema],
  edges: [edgeSchema]

}, { timestamps: true });

export default mongoose.model("Roadmap", RoadmapSchema);