import QuestionPaper from "../models/questionPaper.model.js"
import fs from 'fs';
import path from 'path';

// Create Question Paper
export const createQuestionPaper = async (req, res) => {
  try {
    const { name, description } = req.body;
    const pdfFiles = req.files;

    if (!name || !description || !pdfFiles || pdfFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and at least one PDF file are required',
      });
    }

    const pdfUrls = pdfFiles.map(file => `${req.protocol}://${req.get('host')}/uploads/pdfs/${file.filename}`);

    const newQuestionPaper = new QuestionPaper({
      name,
      description,
      pdfs: pdfUrls, // Ensure your schema field is `pdfs` if you use this name
    });

    await newQuestionPaper.save();

    res.status(201).json({
      success: true,
      message: 'Question paper created successfully',
      data: {
        name,
        description,
        pdfs: pdfUrls,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating question paper',
      error: error.message,
    });
  }
};


// Get All Question Papers
export const getAllQuestionPapers = async (req, res) => {
  try {
    const questionPapers = await QuestionPaper.find();
    res.status(200).json({
      success: true,
      data: questionPapers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question papers',
      error: error.message,
    });
  }
};

// Get Question Paper by ID
export const getQuestionPaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const questionPaper = await QuestionPaper.findById(id);

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: 'Question paper not found',
      });
    }

    res.status(200).json({
      success: true,
      data: questionPaper,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question paper',
      error: error.message,
    });
  }
};

// Update Question Paper
export const updateQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const pdfFiles = req.files;

    const updatedData = { name, description };
    if (pdfFiles.length > 0) {
      const pdfUrls = pdfFiles.map(file => `${req.protocol}://${req.get('host')}/uploads/pdfs/${file.filename}`);
      updatedData.pdfs = pdfUrls;
    }

    const questionPaper = await QuestionPaper.findByIdAndUpdate(id, updatedData, { new: true });

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: 'Question paper not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question paper updated successfully',
      data: questionPaper,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating question paper',
      error: error.message,
    });
  }
};

// Delete Question Paper
export const deleteQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const questionPaper = await QuestionPaper.findByIdAndDelete(id);

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: 'Question paper not found',
      });
    }

    questionPaper.pdfs.forEach(pdf => {
      const filePath = path.join(__dirname, '..', pdf);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.status(200).json({
      success: true,
      message: 'Question paper deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting question paper',
      error: error.message,
    });
  }
};