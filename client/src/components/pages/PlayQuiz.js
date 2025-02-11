import { useEffect, useState } from "react";
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
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const PlayQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [theme] = useTheme(); // Get theme from context

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
    if (selectedOption === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  return (
    <Container  maxWidth="md" sx={{ mt: 5 }}>
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
    color: "white", // Ensure text is visible
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
