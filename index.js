import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectionDB from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import questionPaperRoutes from "./routes/questionPaperRoutes.js"
import sendmailRoutes from "./routes/sendmailRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//dotenv configuration
dotenv.config()

//mongodb connection
connectionDB()

const app = express() 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'uploads/pdfs' directory exists
const pdfDir = path.join(__dirname, 'uploads', 'pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Middleware to serve static files
app.use('/uploads/pdfs', express.static(pdfDir));



app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true
}))



app.use('/api/v1/user', userRoutes)

app.use('/api/v1/questionpaper', questionPaperRoutes)

app.use('/api/v1/email',  sendmailRoutes)

app.use('/api/v1/contactuser',  contactRoutes)

app.use('/api/v1/keyword',  searchRoutes)


// Serve static frontend files
app.use(express.static(path.join(__dirname, './client/build')));

// Serve index.html for any unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});



app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`);
})



