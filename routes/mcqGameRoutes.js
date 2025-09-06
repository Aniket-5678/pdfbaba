import express from "express";
import {
  joinGame,
  getGameState,
  submitAnswers,
  getResults,
  leaveGame
} from "../controllers/mcqGameController.js";

const router = express.Router();

router.post("/join", joinGame);
router.get("/state", getGameState);
router.post("/answer", submitAnswers); // expects full answers array
router.post("/leave", leaveGame);
router.get("/results", getResults);

export default router;
