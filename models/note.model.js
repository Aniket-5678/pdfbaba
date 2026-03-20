import mongoose from "mongoose";
import slugify from "slugify";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
    },

    tags: [String],

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🔥 Auto slug + excerpt
noteSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.content) {
    this.excerpt = this.content.replace(/<[^>]+>/g, "").slice(0, 150);
  }

  next();
});

const Note = mongoose.model("Note", noteSchema);

export default Note;