import SourceCode from "../models/sourceCodeModel.js";
import Note from "../models/note.model.js";
import LearningTutorial from "../models/learningTutorial.model.js";
import Roadmap from "../models/roadmap.model.js";
import Quiz from "../models/quiz.modal.js";
import CodingQuestion from "../models/codingQuestion.model.js";
import Category from "../models/category.model.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cleanText = (value = "") => String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export async function globalSearch(req, res) {
  const query = String(req.query.q || "").trim().slice(0, 100);
  if (query.length < 2) return res.json({ query, results: [] });

  const regex = new RegExp(escapeRegex(query), "i");
  const limit = Math.min(8, Math.max(1, Number.parseInt(req.query.limit, 10) || 5));

  try {
    const [projects, notes, tutorials, roadmaps, quizzes, challenges, categories] = await Promise.all([
      SourceCode.find({ $or: [{ title: regex }, { description: regex }] }).select("title description").limit(limit).lean(),
      Note.find({ $or: [{ title: regex }, { category: regex }, { tags: regex }] }).select("title slug category excerpt").limit(limit).lean(),
      LearningTutorial.find({ $or: [{ title: regex }, { language: regex }, { description: regex }, { channelName: regex }] }).select("title language description channelName").limit(limit).lean(),
      Roadmap.find({ $or: [{ category: regex }, { slug: regex }, { level: regex }, { description: regex }, { "nodes.title": regex }] }).select("category slug level description").limit(limit).lean(),
      Quiz.find({ $or: [{ title: regex }, { category: regex }] }).select("title category").limit(limit).lean(),
      CodingQuestion.find({ published: true, $or: [{ title: regex }, { language: regex }, { category: regex }, { difficulty: regex }, { topics: regex }, { description: regex }] }).select("title language difficulty category description").limit(limit).lean(),
      Category.find({ name: regex }).select("name slug").limit(limit).lean(),
    ]);

    const results = [
      ...projects.map((item) => ({ type: "Project", title: item.title, description: cleanText(item.description).slice(0, 150), path: `/service/${item._id}` })),
      ...notes.map((item) => ({ type: "Note", title: item.title, description: item.excerpt || item.category, path: `/note/${item.slug}` })),
      ...tutorials.map((item) => ({ type: "YouTube Tutorial", title: item.title, description: `${item.language} · ${item.channelName}`, path: "/learning-hub" })),
      ...roadmaps.map((item) => ({ type: "Roadmap", title: item.category, description: `${item.level} · ${cleanText(item.description).slice(0, 120)}`, path: `/roadmap/${item._id}` })),
      ...quizzes.map((item) => ({ type: "Quiz", title: item.title, description: item.category, path: "/practice-quiz" })),
      ...challenges.map((item) => ({ type: "Coding Practice", title: item.title, description: `${item.language} · ${item.difficulty} · ${item.category}`, path: "/coding-practice" })),
      ...categories.map((item) => ({ type: "Category", title: item.name, description: "Browse learning notes and resources", path: `/categories` })),
    ];
    const features = [
      { type: "Website Builder", title: "Website Builder", description: "Create and publish a website from a template or blank canvas", path: "/builder", terms: "website builder studio design publish templates" },
      { type: "Domain Search", title: "Domain Name Search", description: "Find domain name ideas for your next project", path: "/domain-suggestor", terms: "domain name search suggestor" },
      { type: "Learning", title: "Learning Categories", description: "Browse programming and technology learning topics", path: "/categories", terms: "learning categories programming technology" },
      { type: "YouTube Tutorials", title: "YouTube Tutorials", description: "Explore curated tutorials and recommended channels", path: "/learning-hub", terms: "youtube tutorials channels learning" },
      { type: "Coding Practice", title: "Coding Practice", description: "Solve programming challenges by language and difficulty", path: "/coding-practice", terms: "coding practice programming challenges" },
      { type: "Quizzes", title: "Practice Quizzes", description: "Test your programming and technology knowledge", path: "/practice-quiz", terms: "quiz quizzes practice test" },
      { type: "Projects", title: "Source Code Projects", description: "Browse ready-made website and software projects", path: "/service", terms: "source code projects templates" },
      { type: "Roadmaps", title: "Developer Roadmaps", description: "Follow a guided path through a technology topic", path: "/exam-roadmap", terms: "developer roadmap learning path" },
      { type: "Notes", title: "Study Notes", description: "Browse programming and technology notes", path: "/notes", terms: "study notes programming" },
    ];
    for (const feature of features) {
      if (regex.test(feature.terms) && !results.some((item) => item.type === feature.type && item.title === feature.title)) {
        results.push({ type: feature.type, title: feature.title, description: feature.description, path: feature.path });
      }
    }
    res.json({ query, results });
  } catch (error) {
    console.error("[global-search]", error);
    res.status(500).json({ message: "Unable to search Codebricket right now." });
  }
}
