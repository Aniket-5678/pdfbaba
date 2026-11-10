import mongoose from "mongoose";

const learningTutorialSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, trim: true, maxlength: 80 },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    channelName: { type: String, required: true, trim: true, maxlength: 120 },
    channelUrl: {
      type: String,
      required: true,
      trim: true,
      match: /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i,
    },
  },
  { timestamps: true },
);

learningTutorialSchema.index({ language: 1, title: 1 });

export default mongoose.model("LearningTutorial", learningTutorialSchema);
