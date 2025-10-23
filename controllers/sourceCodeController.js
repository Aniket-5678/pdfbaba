import SourceCode from "../models/sourceCodeModel.js";

// Create Source Code
export const createSourceCode = async (req, res) => {
  try {
    const { title, description, price, viewLink  } = req.body;

    // Zip file
    const zipFile = req.files?.zipFile ? req.files.zipFile[0].filename : null;

    // Single main thumbnail
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].filename : null;

    // Multiple images
    const multipleImages = req.files?.multipleImages ? req.files.multipleImages.map(f => f.filename) : [];

    if (!title || !price || !zipFile)
      return res.status(400).json({ message: "Title, price and zip file are required" });

    const sourceCode = await SourceCode.create({
      title,
      description,
      price,
       viewLink,
      zipFile: `/sourcecodes/${zipFile}`,
      thumbnail: thumbnail ? `/sourcecodes/${thumbnail}` : null,
      multipleImages: multipleImages.map(img => `/sourcecodes/${img}`),
    });

    res.status(201).json(sourceCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating source code", error });
  }
};

// Get all source codes
export const getAllSourceCodes = async (req, res) => {
  try {
    const codes = await SourceCode.find();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching codes", error });
  }
};


// Get source code by ID
export const getSourceCodeById = async (req, res) => {
  try {
    const { id } = req.params;

    const sourceCode = await SourceCode.findById(id);

    if (!sourceCode) {
      return res.status(404).json({ message: "Source code not found" });
    }

    res.json(sourceCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching source code", error });
  }
};



export const updateSourceCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price ,viewLink } = req.body;

    const zipFile = req.files?.zipFile ? `/sourcecodes/${req.files.zipFile[0].filename}` : undefined;
    const thumbnail = req.files?.thumbnail ? `/sourcecodes/${req.files.thumbnail[0].filename}` : undefined;
    const multipleImages = req.files?.multipleImages ? req.files.multipleImages.map(f => `/sourcecodes/${f.filename}`) : undefined;

    const updatedFields = { title, description, price ,viewLink};
    if (zipFile) updatedFields.zipFile = zipFile;
    if (thumbnail) updatedFields.thumbnail = thumbnail;
    if (multipleImages) updatedFields.multipleImages = multipleImages;

    const updatedSourceCode = await SourceCode.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedSourceCode) {
      return res.status(404).json({ message: "Source code not found" });
    }

    res.json({ message: "Source code updated successfully", updatedSourceCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating source code", error });
  }
};

// Delete Source Code
export const deleteSourceCode = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SourceCode.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Source code not found" });
    }

    res.json({ message: "Source code deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting source code", error });
  }
};