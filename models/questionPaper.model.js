import mongoose from 'mongoose';

const questionPaperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  slug:{
    type: String,
    required: true
},
  description: {
    type: String,
    required: true,
  },
  pdfs: {
    type: [String],
    required: true, // URL to the PDF file
  },
  category: {
    type: mongoose.ObjectId ,
    ref: 'Category',
    required: true
},


}, { timestamps: true });

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

export default QuestionPaper;
