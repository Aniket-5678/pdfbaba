import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectionDB from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import questionPaperRoutes from "./routes/questionPaperRoutes.js"
import sendmailRoutes from "./routes/sendmailRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import  quizRoutes from "./routes/quizRoutes.js"
import roadmapRoutes from "./routes/roadmapRoutes.js"
import domainRoutes from "./routes/domainRoutes.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from "react";
import ReactDOMServer from "react-dom/server";
import helmetPkg from "react-helmet-async";
const { HelmetProvider } = helmetPkg;


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


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pdf-baba.com",
      "https://www.pdf-baba.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
)





app.use('/api/v1/user', userRoutes)

app.use('/api/v1/questionpaper', questionPaperRoutes)

app.use('/api/v1/email',  sendmailRoutes)

app.use('/api/v1/contactuser',  contactRoutes)

app.use('/api/v1/keyword',  searchRoutes)

app.use('/api/v1/category', categoryRoutes )

app.use('/api/v1/quizzes', quizRoutes)

app.use("/api/v1/roadmaps",  roadmapRoutes );

app.use("/api/v1/domain",  domainRoutes );




// ✅ Public folder serve karna
app.use(express.static(path.join(__dirname, "public")));

app.get('/ads.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ads.txt'));
});



// Serve static frontend files
app.use(express.static(path.join(__dirname, './client/build')));

// Serve index.html for any unknown routes (for React Router)
app.get("*", (req, res) => {
  const helmetContext = {};

  // Render empty div only for helmet
  ReactDOMServer.renderToString(
    React.createElement(HelmetProvider, { context: helmetContext },
      React.createElement("div", null)
    )
  );

  const { helmet } = helmetContext;
  const indexFile = path.resolve(__dirname, "./client/build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("SSR Error:", err);
      return res.status(500).send("Server error");
    }

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root"></div>`)
        .replace("<title>React App</title>", `${helmet.title.toString()}${helmet.meta.toString()}`)
    );
  });
});





//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
//});




app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`)
})

