import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const PlayQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [theme] = useTheme();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/v1/quizzes/${id}`);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleNextQuestion = () => {
    const correctAnswer = quiz.questions[currentQuestion].correctAnswer;
    const isCorrect = selectedOption.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setAnswers((prev) => [
      ...prev,
      { question: quiz.questions[currentQuestion].questionText, selectedOption, correctAnswer, isCorrect },
    ]);
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {quiz ? (
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 3,
            p: 2,
            backgroundColor: theme === "dark" ? "#333" : "white",
            color: theme === "dark" ? "white" : "black",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {quiz.title}
            </Typography>

            {!showResult ? (
              <Box mt={3}>
                <Typography variant="h6">
                  Q{currentQuestion + 1}: {quiz.questions[currentQuestion].questionText}
                </Typography>
                <RadioGroup
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio sx={{ color: theme === "dark" ? "white" : "black" }} />}
                      label={option}
                      sx={{
                        backgroundColor: selectedOption === option ? "#f0f0f0" : "transparent",
                        color: theme === "dark" ? "white" : "black",
                        borderRadius: "8px",
                        p: 1,
                      }}
                    />
                  ))}
                </RadioGroup>

                <Box textAlign="center" mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    sx={{
                      backgroundColor: theme === "dark" ? "#1976d2" : "#0678c6",
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme === "dark" ? "#1565c0" : "#0678c6",
                      },
                    }}
                  >
                    {currentQuestion + 1 < quiz.questions.length ? "Next" : "Submit"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box textAlign="center" mt={3}>
                <Typography variant="h5">Quiz Completed!</Typography>
                <Typography variant="h6">Your Score: {score} / {quiz.questions.length}</Typography>
                <Box mt={3}>
                  <Typography variant="h6" fontWeight="bold">Your Quiz Results:</Typography>
                  {answers.map((answer, index) => (
                    <Box key={index} p={2} mt={2} sx={{
                      backgroundColor: answer.isCorrect ? "#c8e6c9" : "#ffcdd2",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}>
                      {answer.isCorrect ? <AiOutlineCheckCircle color="green" size={24} /> : <AiOutlineCloseCircle color="red" size={24} />}
                      <Box>
                        <Typography variant="body1">Q{index + 1}: {answer.question}</Typography>
                        <Typography variant="body2">Your Answer: {answer.selectedOption}</Typography>
                        <Typography variant="body2">Correct Answer: {answer.correctAnswer}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, backgroundColor: theme === "dark" ? "#1976d2" : "#06c64c" }}
                  onClick={() => navigate("/quizplaylist")}
                >
                  Back to Quizzes
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default PlayQuiz;
