import express from "express"
import { searchQuestionPapers } from "../controllers/searchController.js";


const router = express.Router()


router.get('/search', searchQuestionPapers);



export default router