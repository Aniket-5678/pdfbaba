// ExamWait.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Material UI imports
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function ExamWait() {
  const { examId } = useParams();
  const navigate = useNavigate();


    useEffect(() => {
          // Scroll to top when the component is mounted
          window.scrollTo(0, 0);
        }, []);
        
  useEffect(() => {
    let mounted = true;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("/api/v1/mcqgame/results");
        if (mounted && res.status === 200) {
          clearInterval(interval);
          navigate(`/exam/result/${examId}`);
        }
      } catch (err) {
        // ignore 400 (results not ready)
      }
    }, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [examId, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <CardContent>
            <CircularProgress size={60} sx={{ mb: 3 }} color="primary" />
            <Typography variant="h5" gutterBottom>
              Waiting for other players to finish...
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Results will appear here once everyone has submitted their answers.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default ExamWait;
