// controllers/mcqGameController.js
import MCQExam from "../models/MCQExam.js";

/**
 * Global in-memory state (one active lobby/exam at a time)
 */
let players = [];            // [{ userId, username, answers:[], completed:false, score:0 }]
let pendingExamId = null;    // which exam is in lobby
let gameStarted = false;
let countdownTimer = null;
let timeLeft = 30;
let currentExam = null;      // MCQExam document when started
let resultsReady = false;
let finalResults = [];       // computed when all submit

const resetGame = () => {
  players = [];
  pendingExamId = null;
  gameStarted = false;
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  timeLeft = 30;
  currentExam = null;
  resultsReady = false;
  finalResults = [];
};

/**
 * joinGame
 * body: { userId, username, examId }
 */
export const joinGame = async (req, res) => {
  try {
    const { userId, username, examId } = req.body;
    if (!userId || !username || !examId) {
      return res.status(400).json({ message: "userId, username and examId required" });
    }

    // If another exam lobby is active and different examId => reject
    if (pendingExamId && pendingExamId !== examId && !gameStarted) {
      return res.status(400).json({ message: "Another exam lobby is active. Try later." });
    }

    // If game already started for that exam, reject
    if (gameStarted && pendingExamId === examId) {
      return res.status(400).json({ message: "Exam already started. You missed it." });
    }

    // set pendingExamId
    if (!pendingExamId) pendingExamId = examId;

    // add player if not exists
    if (!players.find(p => p.userId === userId)) {
      players.push({ userId, username, answers: [], completed: false, score: 0 });
    }

    // start countdown if not already
    if (!gameStarted && !countdownTimer) {
      startCountdown();
    }

    return res.json({
      success: true,
      message: "Joined lobby",
      players: players.map(p => ({ userId: p.userId, username: p.username, completed: p.completed })),
      timeLeft,
      gameStarted,
    });
  } catch (err) {
    console.error("joinGame error:", err);
    return res.status(500).json({ message: "Error joining game", error: err.message });
  }
};

/**
 * Get current state
 */
export const getGameState = (req, res) => {
  return res.json({
    gameStarted,
    timeLeft,
    players: players.map(p => ({ userId: p.userId, username: p.username, completed: p.completed })),
    exam: gameStarted ? {
      _id: currentExam._id,
      title: currentExam.title,
      questions: currentExam.questions.map(q => ({ question: q.question, options: q.options.length })) // don't send correctAnswer
    } : null,
    resultsReady
  });
};

/**
 * Submit full answers array
 * POST body: { userId, answers: [selectedIndex, ...] }
 */
export const submitAnswers = (req, res) => {
  try {
    const { userId, answers } = req.body;
    if (!userId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "userId and answers array required" });
    }
    if (!gameStarted || !currentExam) {
      return res.status(400).json({ message: "No active exam" });
    }

    const player = players.find(p => p.userId === userId);
    if (!player) return res.status(400).json({ message: "Player not found" });

    // store answers and compute correctness
    const perQuestion = currentExam.questions.map((q, idx) => {
      const selectedIndex = typeof answers[idx] === "number" ? answers[idx] : null;
      const selectedText = selectedIndex !== null && q.options[selectedIndex] ? q.options[selectedIndex] : null;
      const correctAnswerText = q.correctAnswer;
      const isCorrect = selectedText !== null && selectedText === correctAnswerText;
      return { selectedIndex, selectedText, correctAnswerText, isCorrect };
    });

    // update player
    player.answers = perQuestion;
    player.completed = true;
    player.correctCount = perQuestion.filter(p => p.isCorrect).length;
    player.wrongCount = perQuestion.length - player.correctCount;
    player.score = player.correctCount; // you can change scoring formula here

    // check if all players completed
    const allDone = players.length > 0 && players.every(p => p.completed === true);

    if (allDone) {
      // prepare finalResults
      finalResults = players.map(p => ({
        userId: p.userId,
        username: p.username,
        score: p.score,
        correctCount: p.correctCount,
        wrongCount: p.wrongCount,
        answers: p.answers
      }))
      // sort descending by score
      finalResults.sort((a,b) => b.score - a.score);
      resultsReady = true;
      gameStarted = false;

      // optionally reset after some seconds (comment/uncomment as desired)
      // setTimeout(() => resetGame(), 2 * 60 * 1000);

      return res.json({ success: true, finished: true });
    }

    return res.json({ success: true, finished: false });
  } catch (err) {
    console.error("submitAnswers error:", err);
    return res.status(500).json({ message: "Error submitting answers", error: err.message });
  }
};

/**
 * results endpoint - returns results only when ready
 */
export const getResults = (req, res) => {
  if (!resultsReady) {
    return res.status(400).json({ message: "Results not ready yet" });
  }
  return res.json(finalResults);
};

/**
 * leaveGame - remove player (body: { userId })
 */
export const leaveGame = (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    players = players.filter(p => p.userId !== userId);

    // if no players left, reset full state
    if (players.length === 0) {
      resetGame();
    }

    return res.json({ success: true, message: "Left the exam" });
  } catch (err) {
    console.error("leaveGame error:", err);
    return res.status(500).json({ message: "Error leaving game", error: err.message });
  }
};

/* ---------- helpers ---------- */
const startCountdown = () => {
  timeLeft = 30;
  countdownTimer = setInterval(async () => {
    timeLeft--;
    // note: since this is HTTP-only API, clients poll /state. If using socket.io, you would emit events here.

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      await startGame();
    }
  }, 1000);
};

const startGame = async () => {
  try {
    if (!pendingExamId) {
      console.warn("startGame: no pendingExamId");
      return;
    }
    const exam = await MCQExam.findById(pendingExamId);
    if (!exam) {
      console.warn("startGame: exam not found", pendingExamId);
      resetGame();
      return;
    }
    currentExam = exam;
    gameStarted = true;
    resultsReady = false;
    finalResults = [];

    // reset player states
    players = players.map(p => ({
      ...p,
      answers: [],
      completed: false,
      score: 0,
      correctCount: 0,
      wrongCount: 0
    }));

    // note: clients will pick up gameStarted and exam via GET /state
  } catch (err) {
    console.error("startGame error:", err);
    resetGame();
  }
};

export default {
  joinGame,
  getGameState,
  submitAnswers,
  getResults,
  leaveGame
};
