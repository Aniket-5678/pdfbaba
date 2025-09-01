import QuestionPaper from '../models/questionPaper.model.js';

// Search Question Papers
export const searchQuestionPapers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(200).json({ success: true, data: [] });
    }

    // ✅ Case-insensitive regex search (name + description)
    const regex = new RegExp(query, "i");

    const questionPapers = await QuestionPaper.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    }).limit(20);

    res.status(200).json({
      success: true,
      data: questionPapers
    });
  } catch (error) {
    console.error('Error searching question papers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
