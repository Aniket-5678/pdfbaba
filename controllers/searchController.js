
import QuestionPaper from '../models/questionPaper.model.js';

// Search Question Papers
export const searchQuestionPapers = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request

    // Use a case-insensitive regex to find matching question papers
    const questionPapers = await QuestionPaper.find({
      name: { $regex: query, $options: 'i' }
    });

    if (questionPapers.length > 0) {
      res.status(200).json({
        success: true,
        data: questionPapers
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No question papers found'
      });
    }
  } catch (error) {
    console.error('Error searching question papers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
