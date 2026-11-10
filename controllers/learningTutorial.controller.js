import LearningTutorial from "../models/learningTutorial.model.js";

const fields = ["language", "title", "description", "channelName", "channelUrl"];
function cleanTutorial(body) {
  return Object.fromEntries(fields.map((field) => [field, body[field]]));
}

export async function listLearningTutorials(req, res) {
  try {
    const tutorials = await LearningTutorial.find().sort({ language: 1, createdAt: -1 }).lean();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: "Unable to load learning tutorials" });
  }
}

export async function createLearningTutorial(req, res) {
  try {
    const tutorial = await LearningTutorial.create(cleanTutorial(req.body));
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(400).json({ message: "Please provide all tutorial details and a valid YouTube channel link." });
  }
}

export async function updateLearningTutorial(req, res) {
  try {
    const tutorial = await LearningTutorial.findByIdAndUpdate(
      req.params.id,
      cleanTutorial(req.body),
      { new: true, runValidators: true },
    );
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json(tutorial);
  } catch (error) {
    res.status(400).json({ message: "Please provide all tutorial details and a valid YouTube channel link." });
  }
}

export async function deleteLearningTutorial(req, res) {
  try {
    const tutorial = await LearningTutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json({ message: "Tutorial deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid tutorial id" });
  }
}
