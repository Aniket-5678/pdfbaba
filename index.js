import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import connectionDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import sendmailRoutes from "./routes/sendmailRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import sourceCodeRoutes from "./routes/sourceCodeRoutes.js";
import fs from "fs";
import SourceCode from "./models/sourceCodeModel.js";
import { SITE_URL, seoForPath, injectSeo } from "./helper/siteSeo.js";
import path from "path";
import { fileURLToPath } from "url";

// Environment is loaded before route modules initialize.

//mongodb connection
connectionDB();

const app = express();
app.set("trust proxy", "loopback");
app.get("/healthz", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? "ok" : "unavailable" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceCodeDir = path.join(process.cwd(), "sourcecodes");
if (!fs.existsSync(sourceCodeDir))
  fs.mkdirSync(sourceCodeDir, { recursive: true });

// Middleware to serve static files

app.use(
  "/sourcecodes",
  express.static(sourceCodeDir, { fallthrough: false }), // Important: prevents SPA fallback
);

// Handle missing ZIP files
app.use("/sourcecodes", (req, res) => {
  res.status(404).json({ message: "Source code file not found" });
});

app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://codebricket.com",
      "https://www.codebricket.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/email", sendmailRoutes);

app.use("/api/v1/contactuser", contactRoutes);

app.use("/api/v1/quizzes", quizRoutes);

app.use("/api/v1/roadmaps", roadmapRoutes);

app.use("/api/v1/domain", domainRoutes);

// Mount source code routes
app.use("/api/v1/sourcecode", sourceCodeRoutes);

// ✅ Public folder serve karna
app.use(express.static(path.join(__dirname, "public")));

app.get("/ads.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ads.txt"));
});

app.use(
  [
    "/api/notes",
    "/api/v1/questionpaper",
    "/api/v1/category",
    "/api/v1/keyword",
    "/uploads/pdfs",
  ],
  (req, res) =>
    res
      .status(410)
      .json({ message: "This PDF notes feature has been removed." }),
);
app.use("/api", (req, res) =>
  res.status(404).json({ message: "API endpoint not found" }),
);
app.use(express.static(path.join(__dirname, "client/build"), { index: false, redirect: false }));
app.get("*", async (req, res) => {
  if (req.hostname === "www.codebricket.com")
    return res.redirect(301, SITE_URL + req.originalUrl);
  if (
    /^\/(notes|note|notes-category|question|category|exam-pdf-explore)(\/|$)/.test(
      req.path,
    )
  )
    return res.status(410).send("This resource is no longer available.");
  const seo = seoForPath(req.path);
  if (
    /^\/service\/[a-f0-9]{24}$/.test(req.path) &&
    mongoose.connection.readyState === 1
  ) {
    try {
      const project = await SourceCode.findById(req.path.split("/").pop())
        .select("title description")
        .maxTimeMS(2000)
        .lean();
      if (project) {
        seo.title = project.title + " | Codebricket";
        seo.description = (
          project.description ||
          "Explore this source code project on Codebricket."
        )
          .replace(/<[^>]*>/g, "")
          .slice(0, 170);
      } else {
        seo.found = false;
        seo.robots = "noindex,follow";
      }
    } catch {
      seo.robots = "noindex,follow";
    }
  }
  fs.readFile(
    path.join(__dirname, "client/build/index.html"),
    "utf8",
    (error, html) => {
      if (error) return res.status(503).send("Frontend build is unavailable.");
      res.status(seo.found ? 200 : 404).send(injectSeo(html, seo));
    },
  );
});
app.listen(process.env.PORT || 8000, process.env.HOST || "127.0.0.1", () =>
  console.log("Codebricket server started"),
);
