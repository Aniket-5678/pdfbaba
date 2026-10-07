import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 80 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  template: { type: String, default: "atelier" },
  theme: { type: Object, default: {} },
  blocks: { type: [Object], default: [] },
  pages: { type: [Object], default: [] },
  published: { type: Boolean, default: false },
}, { timestamps: true });

const requestSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users", index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  projectType: { type: String, required: true },
  budget: { type: String, default: "Flexible" },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
}, { timestamps: true });

export const BuilderSite = mongoose.model("BuilderSite", siteSchema);
export const DeveloperRequest = mongoose.model("DeveloperRequest", requestSchema);
