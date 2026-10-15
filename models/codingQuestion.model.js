import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  input: { type: mongoose.Schema.Types.Mixed, default: "" },
  output: { type: mongoose.Schema.Types.Mixed, required: true },
  explanation: { type: String, default: "" },
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { type: mongoose.Schema.Types.Mixed, default: null },
  expectedOutput: { type: mongoose.Schema.Types.Mixed, required: true },
  hidden: { type: Boolean, default: false },
}, { _id: false });

const CodingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  language: { type: String, required: true, trim: true, maxlength: 60, index: true },
  challengeType: { type: String, enum: ["algorithm", "frontend", "output", "multiple-choice"], default: "algorithm" },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy", index: true },
  category: { type: String, trim: true, default: "Coding" },
  description: { type: String, required: true, trim: true, maxlength: 20000 },
  examples: { type: [exampleSchema], default: [] },
  constraints: { type: [String], default: [] },
  topics: { type: [String], default: [], index: true },
  starterCode: { type: String, default: "", maxlength: 50000 },
  functionName: { type: String, default: "", trim: true, maxlength: 120 },
  testCases: { type: [testCaseSchema], default: [] },
  hints: { type: [String], default: [] },
  solution: { type: String, default: "", maxlength: 50000 },
  explanation: { type: String, default: "", maxlength: 20000 },
  timeComplexity: { type: String, default: "", maxlength: 120 },
  spaceComplexity: { type: String, default: "", maxlength: 120 },
  published: { type: Boolean, default: true, index: true },
}, { timestamps: true });

// Keep the challenge's programming-language field out of MongoDB's implicit
// text-language override (which otherwise rejects values such as HTML/CSS).
CodingQuestionSchema.index(
  { title: "text", description: "text", topics: "text", language: "text" },
  { default_language: "none", language_override: "contentLanguage" },
);

export default mongoose.model("CodingQuestion", CodingQuestionSchema);
