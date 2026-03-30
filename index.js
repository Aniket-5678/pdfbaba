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
import sourceCodeRoutes from "./routes/sourceCodeRoutes.js"
import noteRoutes from "./routes/note.routes.js";
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

const sourceCodeDir = path.join(process.cwd(), "sourcecodes");
if (!fs.existsSync(sourceCodeDir)) fs.mkdirSync(sourceCodeDir, { recursive: true });




// Middleware to serve static files
app.use('/uploads/pdfs', express.static(pdfDir));



app.use(
  "/sourcecodes",
  express.static(sourceCodeDir, { fallthrough: false }) // Important: prevents SPA fallback
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

app.use("/api/notes", noteRoutes);

// Mount source code routes
app.use("/api/v1/sourcecode", sourceCodeRoutes);

// ✅ Public folder serve karna
app.use(express.static(path.join(__dirname, "public")));

app.get('/ads.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ads.txt'));
});



// Serve static frontend files
app.use(express.static(path.join(__dirname, './client/build')));

const SITE_URL = "https://pdf-baba.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatSlug = (slug = "") =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function buildMetaTags(seo) {
  return `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
    <meta name="robots" content="${escapeHtml(seo.robots || "index, follow")}" />

    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:image" content="${escapeHtml(seo.image)}" />
    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />
    <meta property="og:type" content="${escapeHtml(seo.type)}" />
    <meta property="og:site_name" content="PDF Baba" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.image)}" />
  `;
}

function removeExistingSeoTags(html) {
  return html
    .replace(/<title>.*?<\/title>/gis, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "");
}

/* ---------------- SPA + DYNAMIC META INJECTION ---------------- */

app.get("*", async (req, res) => {
  try {
    const indexFile = path.resolve(__dirname, "./client/build/index.html");

    // Force non-www
    const host = req.get("host");
    if (host === "www.pdf-baba.com") {
      return res.redirect(301, `https://pdf-baba.com${req.originalUrl}`);
    }

    const pathName = req.path;
    const cleanCanonical = `${SITE_URL}${pathName}`;

    // Default SEO
    let seo = {
      title: "PDF Baba - Study Notes, Question Papers, Quizzes & PDFs",
      description:
        "Read and download study notes, question papers, quizzes, roadmaps and source code for learning on PDF Baba.",
      keywords:
        "PDF Baba, study notes, question papers, quizzes, roadmaps, source code, learning PDFs",
      image: DEFAULT_IMAGE,
      canonical: cleanCanonical,
      type: "website",
      robots: "index, follow",
    };

    /* ---------------- PUBLIC ROUTES ---------------- */

    // HOME
    if (pathName === "/") {
      seo = {
        title: "PDF Baba - Study Notes, Question Papers, Quizzes & PDFs",
        description:
          "Explore study notes, question papers, quizzes, roadmaps, source code and learning PDFs online on PDF Baba.",
        keywords:
          "PDF Baba, study notes, question papers, quizzes, roadmaps, source code, learning PDFs",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/`,
        type: "website",
        robots: "index, follow",
      };
    }

    // ABOUT
    else if (pathName === "/about") {
      seo = {
        title: "About Us | PDF Baba",
        description:
          "Learn more about PDF Baba, our educational resources, notes, quizzes, question papers and learning tools.",
        keywords:
          "about PDF Baba, educational platform, study resources, learning PDFs",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/about`,
        type: "website",
        robots: "index, follow",
      };
    }

    // CONTACT
    else if (pathName === "/contact") {
      seo = {
        title: "Contact Us | PDF Baba",
        description:
          "Contact PDF Baba for support, queries, suggestions or educational resource related help.",
        keywords: "contact PDF Baba, support, educational help",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/contact`,
        type: "website",
        robots: "index, follow",
      };
    }

    // EXPLORE
    else if (pathName === "/explore") {
      seo = {
        title: "Explore Study Resources | PDF Baba",
        description:
          "Explore notes, quizzes, question papers, roadmaps and educational content on PDF Baba.",
        keywords:
          "explore study resources, notes, quizzes, question papers, PDF Baba",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/explore`,
        type: "website",
        robots: "index, follow",
      };
    }

    // CATEGORY PAGE
    else if (pathName.startsWith("/category/")) {
      const slug = pathName.split("/category/")[1] || "";
      const categoryName = formatSlug(slug);

      seo = {
        title: `${categoryName} Study Material | PDF Baba`,
        description: `Explore ${categoryName} notes, PDFs, study material and learning resources on PDF Baba.`,
        keywords: `${categoryName}, ${categoryName} notes, ${categoryName} pdf, ${categoryName} study material`,
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/category/${slug}`,
        type: "website",
        robots: "index, follow",
      };
    }

    // HOW IT WORKS
    else if (pathName === "/howitworks") {
      seo = {
        title: "How It Works | PDF Baba",
        description:
          "Understand how PDF Baba works and how you can access notes, PDFs, quizzes and learning resources.",
        keywords: "how PDF Baba works, study resources guide",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/howitworks`,
        type: "website",
        robots: "index, follow",
      };
    }

    // CATEGORY WORKS
    else if (pathName === "/categoryworks") {
      seo = {
        title: "Categories Guide | PDF Baba",
        description:
          "Explore how categories work on PDF Baba and find educational notes and study material easily.",
        keywords: "categories, notes categories, study material categories",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/categoryworks`,
        type: "website",
        robots: "index, follow",
      };
    }

    // PRIVACY
    else if (pathName === "/privacy") {
      seo = {
        title: "Privacy Policy | PDF Baba",
        description:
          "Read the Privacy Policy of PDF Baba to understand how we handle your information and website usage.",
        keywords: "privacy policy, PDF Baba privacy",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/privacy`,
        type: "website",
        robots: "index, follow",
      };
    }

    // TERMS
    else if (pathName === "/termcondition") {
      seo = {
        title: "Terms & Conditions | PDF Baba",
        description:
          "Read the Terms and Conditions of PDF Baba for using our educational content and services.",
        keywords: "terms and conditions, PDF Baba terms",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/termcondition`,
        type: "website",
        robots: "index, follow",
      };
    }

    // DISCOVER MORE
    else if (pathName === "/discover-more") {
      seo = {
        title: "Discover More Resources | PDF Baba",
        description:
          "Discover more educational resources, study material, PDFs and learning content on PDF Baba.",
        keywords: "discover more, educational resources, study material",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/discover-more`,
        type: "website",
        robots: "index, follow",
      };
    }

    // SERVICE LIST
    else if (pathName === "/service") {
      seo = {
        title: "Educational Services | PDF Baba",
        description:
          "Explore educational services, source code, study tools and learning support on PDF Baba.",
        keywords: "educational services, source code, study tools",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/service`,
        type: "website",
        robots: "index, follow",
      };
    }

    // SERVICE DETAILS
    else if (pathName.startsWith("/service/")) {
      const id = pathName.split("/service/")[1] || "";

      seo = {
        title: `Service Details | PDF Baba`,
        description:
          "Explore detailed educational service information and learning resources on PDF Baba.",
        keywords: `service details, educational service, PDF Baba`,
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/service/${id}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // QUIZ PLAYLIST
    else if (pathName === "/quizplaylist") {
      seo = {
        title: "Quiz Playlist | PDF Baba",
        description:
          "Browse quiz playlists and practice educational quizzes online on PDF Baba.",
        keywords: "quiz playlist, mcq quiz, online quiz",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/quizplaylist`,
        type: "website",
        robots: "index, follow",
      };
    }

    // PLAY QUIZ
    else if (pathName.startsWith("/play/")) {
      const id = pathName.split("/play/")[1] || "";

      seo = {
        title: `Play Quiz | PDF Baba`,
        description:
          "Play and practice quiz questions online on PDF Baba to improve your learning.",
        keywords: "play quiz, mcq practice, online quiz",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/play/${id}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // ROADMAP LIST
    else if (pathName === "/roadmapdata") {
      seo = {
        title: "Learning Roadmaps | PDF Baba",
        description:
          "Browse educational roadmaps and learning paths to improve your study journey on PDF Baba.",
        keywords: "learning roadmap, study roadmap, career roadmap",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/roadmapdata`,
        type: "website",
        robots: "index, follow",
      };
    }

    // ROADMAP DETAIL
    else if (pathName.startsWith("/roadmap/")) {
      const id = pathName.split("/roadmap/")[1] || "";

      seo = {
        title: `Roadmap Details | PDF Baba`,
        description:
          "Explore detailed roadmap guidance and learning paths on PDF Baba.",
        keywords: "roadmap details, study roadmap, learning path",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/roadmap/${id}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // DOMAIN SUGGESTOR
    else if (pathName === "/domain-suggestor") {
      seo = {
        title: "Domain Name Suggestor | PDF Baba",
        description:
          "Find useful domain name suggestions and ideas with the domain suggestor tool on PDF Baba.",
        keywords: "domain suggestor, domain name ideas, website name ideas",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/domain-suggestor`,
        type: "website",
        robots: "index, follow",
      };
    }

    // QUESTION PAPER DETAIL
    else if (pathName.startsWith("/question/")) {
      const id = pathName.split("/question/")[1] || "";

      seo = {
        title: `Question Paper | PDF Baba`,
        description:
          "Access question paper details and related educational resources on PDF Baba.",
        keywords: "question paper, exam paper, pdf, study material",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/question/${id}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // NOTES HOME
    else if (pathName === "/notes") {
      seo = {
        title: "Study Notes Categories | PDF Baba",
        description:
          "Browse note categories, study material and educational PDFs on PDF Baba.",
        keywords: "study notes, notes categories, educational pdfs",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/notes`,
        type: "website",
        robots: "index, follow",
      };
    }

    // NOTES CATEGORY
    else if (pathName.startsWith("/notes-category/")) {
      const category = pathName.split("/notes-category/")[1] || "";
      const categoryName = formatSlug(category);

      seo = {
        title: `${categoryName} Notes | PDF Baba`,
        description: `Browse ${categoryName} notes, PDFs and study material on PDF Baba.`,
        keywords: `${categoryName}, ${categoryName} notes, study material, pdf`,
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/notes-category/${category}`,
        type: "website",
        robots: "index, follow",
      };
    }

    // NOTE DETAIL
    else if (pathName.startsWith("/note/")) {
      const slug = pathName.split("/note/")[1] || "";
      const noteName = formatSlug(slug);

      seo = {
        title: `${noteName} Notes | PDF Baba`,
        description: `Read ${noteName} notes online and access helpful study material on PDF Baba.`,
        keywords: `${noteName}, notes, pdf notes, study material`,
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/note/${slug}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // SOURCE CODE BUY PAGE
    else if (pathName.startsWith("/sourcecode/buy/")) {
      const id = pathName.split("/sourcecode/buy/")[1] || "";

      seo = {
        title: `Buy Source Code | PDF Baba`,
        description:
          "Access source code purchase details and educational coding resources on PDF Baba.",
        keywords: "buy source code, coding project, project source code",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/sourcecode/buy/${id}`,
        type: "article",
        robots: "index, follow",
      };
    }

    // SUCCESS PAGE (better noindex)
    else if (pathName.startsWith("/success/")) {
      const id = pathName.split("/success/")[1] || "";

      seo = {
        title: `Payment Success | PDF Baba`,
        description:
          "Payment success confirmation page on PDF Baba.",
        keywords: "payment success, PDF Baba",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/success/${id}`,
        type: "website",
        robots: "noindex, nofollow",
      };
    }

    // SOURCE CODE ORDER (private-ish)
    else if (pathName === "/sourcecode-order") {
      seo = {
        title: "Source Code Orders | PDF Baba",
        description:
          "Manage your source code orders and purchases on PDF Baba.",
        keywords: "source code order, purchases, PDF Baba",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}/sourcecode-order`,
        type: "website",
        robots: "noindex, nofollow",
      };
    }

    /* ---------------- PRIVATE / ADMIN ROUTES ---------------- */

    else if (pathName.startsWith("/dashboard")) {
      seo = {
        title: "Dashboard | PDF Baba",
        description: "User or admin dashboard on PDF Baba.",
        keywords: "dashboard, PDF Baba",
        image: DEFAULT_IMAGE,
        canonical: `${SITE_URL}${pathName}`,
        type: "website",
        robots: "noindex, nofollow",
      };
    }

    /* ---------------- FALLBACK / 404-LIKE ---------------- */

    else {
      seo = {
        title: "PDF Baba - Study Notes, Question Papers, Quizzes & PDFs",
        description:
          "Explore educational resources, notes, quizzes, question papers and learning content on PDF Baba.",
        keywords:
          "PDF Baba, study notes, question papers, quizzes, educational content",
        image: DEFAULT_IMAGE,
        canonical: cleanCanonical,
        type: "website",
        robots: "index, follow",
      };
    }

    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error("SEO Injection Error:", err);
        return res.status(500).send("Server error");
      }

      const metaTags = buildMetaTags(seo);
      const cleanedHtml = removeExistingSeoTags(data);
      const html = cleanedHtml.replace("</head>", `${metaTags}</head>`);

      return res.send(html);
    });
  } catch (error) {
    console.error("Meta Injection Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});




//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
//});




app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`)
})

