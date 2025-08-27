import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Box,
  LinearProgress,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SmallBannerAd from "./SmallBannerAd";

const PlayQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [timeOver, setTimeOver] = useState(false);
  const timerRef = useRef(null);
  const [theme] = useTheme();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/v1/quizzes/${id}`);
      const shuffled = response.data.questions.sort(() => Math.random() - 0.5);
      setQuiz({ ...response.data, questions: shuffled });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    // Start 30-minute timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimeOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleNextQuestion = () => {
    const correctAnswer = quiz.questions[currentQuestion].correctAnswer;
    const isCorrect =
      selectedOption.trim().toLowerCase() ===
      correctAnswer.trim().toLowerCase();

    setAnswers((prev) => [
      ...prev,
      {
        question: quiz.questions[currentQuestion].questionText,
        selectedOption,
        correctAnswer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      clearInterval(timerRef.current);
      setShowResult(true);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <SmallBannerAd />
      </Box>

      {quiz ? (
        <Card
          sx={{
            boxShadow: 4,
            borderRadius: 4,
            p: { xs: 2, md: 3 },
            backgroundColor: theme === "dark" ? "#222" : "#fff",
            color: theme === "dark" ? "white" : "black",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              {quiz.title}
            </Typography>

            {timeOver ? (
              <Box textAlign="center" mt={3}>
                <Typography variant="h5" color="error">
                  ⏰ Time Over!
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/quizplaylist")}
                >
                  Back to Quizzes
                </Button>
              </Box>
            ) : !showResult ? (
              <Box mt={2}>
                {/* Progress + Timer */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </Typography>
                  <Chip
                    label={`⏱ ${minutes}m ${seconds}s`}
                    color={timeLeft <= 300 ? "error" : "primary"} // red if <5min
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(timeLeft / (30 * 60)) * 100}
                  sx={{ mb: 3, height: 10, borderRadius: 5 }}
                />

                {/* Question */}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 2, fontSize: { xs: "1rem", md: "1.2rem" } }}
                >
                  {quiz.questions[currentQuestion].questionText}
                </Typography>

                {/* Options */}
                <RadioGroup
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {quiz.questions[currentQuestion].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                          px: 2,
                          py: 1,
                          mb: 1,
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "#f9f9f9",
                          },
                          ...(selectedOption === option && {
                            backgroundColor: "#e3f2fd",
                            borderColor: "#1976d2",
                            fontWeight: "bold",
                          }),
                        }}
                      />
                    )
                  )}
                </RadioGroup>

                <Box textAlign="center" mt={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                  >
                    {currentQuestion + 1 < quiz.questions.length
                      ? "Next Question"
                      : "Submit Quiz"}
                  </Button>
                </Box>
              </Box>
            ) : (
              /* Results */
              <Box textAlign="center" mt={3}>
                <Typography variant="h5" fontWeight="bold">
                  🎉 Quiz Completed!
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Your Score: {score} / {quiz.questions.length}
                </Typography>

                <Box mt={3}>
                  {answers.map((answer, index) => (
                    <Box
                      key={index}
                      p={2}
                      mt={2}
                      sx={{
                        backgroundColor: answer.isCorrect
                          ? "#c8e6c9"
                          : "#ffcdd2",
                        borderRadius: "12px",
                        textAlign: "left",
                        boxShadow: 1,
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {answer.isCorrect ? (
                          <AiOutlineCheckCircle color="green" size={24} />
                        ) : (
                          <AiOutlineCloseCircle color="red" size={24} />
                        )}
                        <Typography fontWeight="bold">
                          Q{index + 1}: {answer.question}
                        </Typography>
                      </Box>
                      <Typography sx={{ mt: 1 }}>
                        ✅ Correct:{" "}
                        <strong style={{ color: "green" }}>
                          {answer.correctAnswer}
                        </strong>
                      </Typography>
                      <Typography>
                        📝 Your Answer:{" "}
                        <strong style={{ color: "blue" }}>
                          {answer.selectedOption || "Not Answered"}
                        </strong>
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box mt={3} display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()}
                  >
                    Play Again
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/quizplaylist")}
                  >
                    Back to Quizzes
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default PlayQuiz;
