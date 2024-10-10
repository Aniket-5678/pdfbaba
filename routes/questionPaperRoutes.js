import express from "express"
import upload from "../middlewear/multer.js"
import { createQuestionPaper, deleteQuestionPaper, getAllQuestionPapers, getQuestionPaperById, updateQuestionPaper } from "../controllers/questionPaperController.js"
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js"



const router = express.Router()

router.post('/create-question', requireSignIn, isAdmin,  upload.array('pdfs', 20), createQuestionPaper)

router.get('/all-questions',  getAllQuestionPapers);


// Route to get a single question paper by ID
router.get('/question/:id',  getQuestionPaperById)
// Route to update a question paper
router.put('/update-question/:id', requireSignIn, isAdmin, upload.array('pdfs', 20), updateQuestionPaper);

// Route to delete a question paper
router.delete('/delete-question/:id', requireSignIn, isAdmin, deleteQuestionPaper);



export default router