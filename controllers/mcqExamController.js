import MCQExam from "../models/MCQExam.js";

// Create Exam
export const createExam = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const exam = new MCQExam({ title, questions });
    await exam.save();
    res.status(201).json({ success: true, exam });
  } catch (error) {
    console.error("Create Exam Error:", error);
    res.status(500).json({ success: false, message: "Failed to create exam" });
  }
};

// Get All Exams
export const getExams = async (req, res) => {
  try {
    const exams = await MCQExam.find();
    res.json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch exams" });
  }
};

// Get Single Exam
export const getExamById = async (req, res) => {
  try {
    const exam = await MCQExam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }
    res.json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch exam" });
  }
};


//  Delete Exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await MCQExam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }
    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete exam" });
  }
};