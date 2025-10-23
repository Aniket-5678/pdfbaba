import mongoose from "mongoose";

const sourceCodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  zipFile: { type: String, required: true }, // path to uploaded zip file
  thumbnail: { type: String }, // main thumbnail as single string
  multipleImages: [{ type: String }], // all other images as array
   viewLink: { type: String }
}, { timestamps: true });

export default mongoose.model("SourceCode", sourceCodeSchema);
