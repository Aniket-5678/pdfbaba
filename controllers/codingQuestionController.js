import mongoose from "mongoose";
import axios from "axios";
import CodingQuestion from "../models/codingQuestion.model.js";

const editableFields = ["title", "language", "challengeType", "difficulty", "category", "description", "examples", "constraints", "topics", "starterCode", "functionName", "testCases", "hints", "solution", "explanation", "timeComplexity", "spaceComplexity", "published"];
const safePayload = (body = {}) => Object.fromEntries(editableFields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const judgeLanguages = { javascript: 63, js: 63, typescript: 74, python: 71, python3: 71, java: 62, c: 50, "c++": 54, cpp: 54, csharp: 51, "c#": 51, go: 60, rust: 73, php: 68, ruby: 72, kotlin: 78, swift: 83 };
let codingTextIndexPromise;

async function ensureCodingTextIndex() {
  if (!codingTextIndexPromise) {
    codingTextIndexPromise = (async () => {
      const collection = CodingQuestion.collection;
      let indexes = [];
      try {
        indexes = await collection.indexes();
      } catch (error) {
        if (error.code !== 26 && error.codeName !== "NamespaceNotFound") throw error;
      }
      const previousTextIndex = indexes.find((index) => index.key?._fts === "text" && index.language_override !== "contentLanguage");
      if (previousTextIndex) await collection.dropIndex(previousTextIndex.name);
      await collection.createIndex(
        { title: "text", description: "text", topics: "text", language: "text" },
        { default_language: "none", language_override: "contentLanguage" },
      );
    })().catch((error) => {
      codingTextIndexPromise = null;
      throw error;
    });
  }
  return codingTextIndexPromise;
}

export const listCodingQuestions = async (req, res) => {
  try {
    const { language, difficulty, topic, q = "", page = "1", limit = "50", includeDrafts } = req.query;
    const isAdmin = (includeDrafts === "true" || req.includeDrafts === true) && req.user?.role === 1;
    const filter = isAdmin ? {} : { published: true };
    if (language) filter.language = new RegExp(`^${String(language).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topics = topic;
    if (q.trim()) {
      await ensureCodingTextIndex();
      filter.$text = { $search: q.trim() };
    }
    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const [items, total] = await Promise.all([
      CodingQuestion.find(filter).sort({ createdAt: -1 }).skip((currentPage - 1) * pageSize).limit(pageSize).lean(),
      CodingQuestion.countDocuments(filter),
    ]);
    const safeItems = isAdmin ? items : items.map(({ solution, explanation, testCases = [], ...item }) => ({ ...item, testCases: testCases.filter((test) => !test.hidden) }));
    res.json({ items: safeItems, total, page: currentPage, pages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: "Unable to load coding questions." });
  }
};

export const getCodingQuestion = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid question id." });
    const filter = { _id: req.params.id, ...(req.user?.role === 1 ? {} : { published: true }) };
    const question = await CodingQuestion.findOne(filter).lean();
    if (!question) return res.status(404).json({ message: "Coding question not found." });
    if (req.user?.role !== 1) {
      question.testCases = question.testCases.filter((test) => !test.hidden);
      question.solution = "";
      question.explanation = "";
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Unable to load coding question." });
  }
};

export const getCodingSolution = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid question id." });
    const question = await CodingQuestion.findOne({ _id: req.params.id, published: true }).select("solution explanation timeComplexity spaceComplexity").lean();
    if (!question) return res.status(404).json({ message: "Coding question not found." });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Unable to load the solution." });
  }
};

export const executeCodingQuestion = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid question id." });
    const question = await CodingQuestion.findOne({ _id: req.params.id, published: true }).select("language challengeType functionName testCases").lean();
    if (!question) return res.status(404).json({ message: "Coding question not found." });
    const sourceCode = typeof req.body?.sourceCode === "string" ? req.body.sourceCode : "";
    if (!sourceCode.trim() || sourceCode.length > 50000) return res.status(400).json({ message: "Provide code between 1 and 50,000 characters." });
    const languageId = judgeLanguages[question.language.toLowerCase()];
    if (!languageId) return res.status(400).json({ message: `Online execution is not configured for ${question.language}.` });
    if (question.functionName && !/^[A-Za-z_$][\w$]*$/.test(question.functionName)) return res.status(400).json({ message: "This challenge has an invalid function name." });
    const judgeUrl = (process.env.JUDGE0_API_URL || "https://ce.judge0.com").replace(/\/$/, "");
    const submitting = req.body?.submit === true;
    const cases = question.testCases.filter((test) => submitting || !test.hidden).slice(0, 20);
    if (!cases.length) return res.status(400).json({ message: "This challenge has no visible test cases configured." });
    const headers = { "Content-Type": "application/json" };
    if (process.env.JUDGE0_API_KEY) {
      if (judgeUrl.includes("rapidapi.com")) {
        headers["X-RapidAPI-Key"] = process.env.JUDGE0_API_KEY;
        headers["X-RapidAPI-Host"] = new URL(judgeUrl).host;
      } else headers["X-Auth-Token"] = process.env.JUDGE0_API_KEY;
    }
    const results = await Promise.all(cases.map(async (test) => {
      const stdin = Array.isArray(test.input) || (test.input && typeof test.input === "object") ? JSON.stringify(test.input) : String(test.input ?? "");
      const expected = typeof test.expectedOutput === "string" ? test.expectedOutput : JSON.stringify(test.expectedOutput);
      let code = sourceCode;
      if (["javascript", "js"].includes(question.language.toLowerCase()) && question.functionName && Array.isArray(test.input)) {
        code += `\n;console.log(JSON.stringify(${question.functionName}(...${JSON.stringify(test.input)})));`;
      }
      try {
        const { data } = await axios.post(`${judgeUrl}/submissions?base64_encoded=false&wait=true`, { source_code: code, language_id: languageId, stdin, cpu_time_limit: 2, wall_time_limit: 5, memory_limit: 128000 }, { headers, timeout: 12000, maxBodyLength: 60000 });
        const actual = (data.stdout || data.compile_output || data.stderr || data.status?.description || "").trim();
        const passed = data.status?.id === 3 && actual === expected.trim();
        return test.hidden ? { passed, hidden: true, status: data.status?.description || "Unknown" } : { passed, expected, actual, status: data.status?.description || "Unknown" };
      } catch (error) {
        throw new Error(error.response?.data?.message || "Code execution provider is unavailable.");
      }
    }));
    res.json({ passed: results.filter((result) => result.passed).length, total: results.length, results });
  } catch (error) {
    res.status(503).json({ message: error.message || "Code execution provider is unavailable." });
  }
};

export const createCodingQuestion = async (req, res) => {
  try {
    await ensureCodingTextIndex();
    const question = await CodingQuestion.create(safePayload(req.body));
    res.status(201).json({ message: "Coding question created.", question });
  } catch (error) {
    console.error("[coding-question:create]", error);
    const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
    const message = error.name === "ValidationError" || error.name === "CastError"
      ? error.message
      : process.env.NODE_ENV === "production"
        ? "Unable to save this question. Check the server database connection and logs."
        : `${error.name || "Error"}: ${error.message || "Unable to create coding question."}`;
    res.status(status).json({ message });
  }
};

export const updateCodingQuestion = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid question id." });
    const question = await CodingQuestion.findByIdAndUpdate(req.params.id, safePayload(req.body), { new: true, runValidators: true });
    if (!question) return res.status(404).json({ message: "Coding question not found." });
    res.json({ message: "Coding question updated.", question });
  } catch (error) {
    res.status(400).json({ message: error.name === "ValidationError" ? error.message : "Unable to update coding question." });
  }
};

export const deleteCodingQuestion = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid question id." });
    const question = await CodingQuestion.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Coding question not found." });
    res.json({ message: "Coding question deleted." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete coding question." });
  }
};
