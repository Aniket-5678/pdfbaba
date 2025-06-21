import express from 'express';
import { generateDomains } from '../controllers/domainController.js';



const router = express.Router();

router.post('/suggest', generateDomains);

export default router;
