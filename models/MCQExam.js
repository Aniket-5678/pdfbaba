import mongoose from "mongoose";

const mcqExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true }
    }
  ],
}, { timestamps: true });

export default mongoose.model("MCQExam", mcqExamSchema);
