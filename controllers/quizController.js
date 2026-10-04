import Quiz from "../models/quiz.modal.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { category, title, questions } = req.body;
    const newQuiz = new Quiz({ category, title, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const title = String(req.body.title || "").trim();
    if (!title)
      return res.status(400).json({ message: "Quiz title is required." });
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true },
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch {
    res.status(400).json({ message: "Could not update quiz." });
  }
};
