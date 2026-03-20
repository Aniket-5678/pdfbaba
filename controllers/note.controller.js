import Note from "../models/note.model.js";
import sanitizeHtml from "sanitize-html";

// ================= CREATE =================
export const createNote = async (req, res) => {
  try {
    const { title, category, content, tags } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ sanitize content
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "h3",
      ]),
      allowedAttributes: {
        a: ["href"],
        img: ["src", "alt"],
      },
    });

    const note = await Note.create({
      title,
      category,
      content: cleanContent,
      tags,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
export const getAllNotes = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = {};

if (category) {
  // Convert slug back to normal category name (replace dashes with spaces)
  const categoryName = category.replace(/-/g, " "); 
  query.category = { $regex: `^${categoryName}$`, $options: "i" }; // case-insensitive match
}

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const notes = await Note.find(query)
      .select("-content") // fast load
      .sort({ createdAt: -1 });

    res.json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE =================
export const getSingleNote = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();



    const note = await Note.findOne({
      slug: { $regex: `^${slug}$`, $options: "i" }
    });

    

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      note
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
// ================= UPDATE =================
export const updateNote = async (req, res) => {
  try {
    const { title, category, content, tags } = req.body;

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // ✅ sanitize if content updated
    const cleanContent = content
      ? sanitizeHtml(content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "img",
            "h1",
            "h2",
            "h3",
          ]),
          allowedAttributes: {
            a: ["href"],
            img: ["src", "alt"],
          },
        })
      : note.content;

    note.title = title || note.title;
    note.category = category || note.category;
    note.content = cleanContent;
    note.tags = tags || note.tags;

    await note.save();

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= RELATED NOTES =================
export const getRelatedNotes = async (req, res) => {
  try {
    const note = await Note.findOne({ slug: req.params.slug });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const related = await Note.find({
      category: note.category,
      _id: { $ne: note._id },
    })
      .limit(5)
      .select("title slug");

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};