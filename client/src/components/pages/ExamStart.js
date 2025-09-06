// ExamStart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

// Material UI imports
import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SmallBannerAd from "./SmallBannerAd";

// Create MUI theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function ExamStart() {
  const { examId } = useParams();
  const [auth] = useAuth();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();


    useEffect(() => {
          // Scroll to top when the component is mounted
          window.scrollTo(0, 0);
        }, []);

  // Fetch exam state
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await axios.get("/api/v1/mcqgame/state");
        if (res.data && res.data.exam) {
          const examRes = await axios.get(
            `/api/v1/mcqexam/${res.data.exam._id}`
          );
          const examData = examRes.data.exam;

          setExam(examData);
          setAnswers(new Array(examData.questions.length).fill(null));
        } else {
          setTimeout(fetchState, 500);
        }
      } catch (err) {
        console.error("Fetch exam error:", err);
      }
    };
    fetchState();
  }, [examId]);

  // Timer logic
  useEffect(() => {
    if (!exam) return;

    if (timeLeft <= 0) {
      handleSubmit(true); // auto submit when timer ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, exam]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const selectAnswer = (qIdx, optIdx) => {
    const newA = [...answers];
    newA[qIdx] = optIdx;
    setAnswers(newA);
  };

  const handleSubmit = async (auto = false) => {
    try {
      await axios.post("/api/v1/mcqgame/answer", {
        userId: auth?.user?._id,
        answers,
      });

      if (auto) {
        navigate(`/exam/result/${examId}`); // direct result page if time is over
      } else {
        navigate(`/exam/wait/${examId}`); // normal flow if user submits
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Submit failed");
    }
  };

  if (!exam)
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" sx={{ mt: 5 }}>
          Loading exam...
        </Typography>
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                <SmallBannerAd />
              </Box>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        {/* Header with Title + Timer */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            {exam.title}
          </Typography>
          <Typography
            variant="h6"
            color={timeLeft < 60 ? "error" : "textPrimary"} // red if < 1 min
          >
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>

        {exam.questions.map((q, i) => (
          <Card
            key={i}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Q{i + 1}. {q.question || q.questionText || "No text"}
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  name={`q-${i}`}
                  value={answers[i] !== null ? answers[i] : ""}
                  onChange={(e) => selectAnswer(i, parseInt(e.target.value))}
                >
                  {q.options.map((opt, j) => (
                    <FormControlLabel
                      key={j}
                      value={j}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleSubmit(false)}
          >
            Submit Answers
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ExamStart;
