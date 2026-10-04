import Category from "../models/category.model.js";
import Note from "../models/note.model.js";
import slugify from "slugify";
import mongoose from "mongoose";
const fail = (res, e) =>
  res
    .status(e.code === 11000 ? 409 : 400)
    .json({
      success: false,
      message:
        e.code === 11000
          ? "This category already exists."
          : "Could not save category. Check the name and try again.",
    });
export async function createCategoryController(req, res) {
  try {
    const name = String(req.body.name || "").trim();
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Category name is required." });
    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    });
    res
      .status(201)
      .json({ success: true, category, message: "Category created." });
  } catch (e) {
    fail(res, e);
  }
}
export async function updateCategoryController(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    const name = String(req.body.name || "").trim();
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Category name is required." });
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    const previous = category.name;
    category.name = name;
    category.slug = slugify(name, { lower: true, strict: true });
    await category.save();
    await Note.updateMany(
      { category: previous.toLowerCase() },
      { $set: { category: name.toLowerCase() } },
    );
    res.json({ success: true, category, message: "Category updated." });
  } catch (e) {
    fail(res, e);
  }
}
export async function categoryController(req, res) {
  try {
    const category = await Category.find({}).sort({ name: 1 });
    res.json({ success: true, category });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Could not load categories." });
  }
}
export async function singleCategoryController(req, res) {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    res.json({ success: true, category });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Could not load category." });
  }
}
export async function deleteCategoryController(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    res.json({
      success: true,
      message: "Category deleted. Existing notes are preserved.",
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Could not delete category." });
  }
}
