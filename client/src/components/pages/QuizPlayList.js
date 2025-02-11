import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Theme context for dark mode

const QuizPlayList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/v1/quizzes/all");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <Layout>
      <Box marginTop={"100px"} sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 3,
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            color: theme === "dark" ? "white" : "black",
          }}
        >
          Available Quizzes
        </Typography>

        {quizzes.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1.2rem" },
              color: theme === "dark" ? "white" : "black",
            }}
          >
            No quizzes available
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {quizzes.map((quiz) => (
              <Grid item xs={6} sm={6} md={4} key={quiz._id}>
                <Card
                  sx={{
                    maxWidth: 400,
                    mx: "auto",
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "0.3s",
                    ":hover": { boxShadow: 6 },
                    backgroundColor: theme === "dark" ? "#333" : "white",
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: theme === "dark" ? "white" : "black",
                      }}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: theme === "dark" ? "#ccc" : "black",
                        mt: 1,
                      }}
                    >
                      {quiz.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, fontFamily: "Poppins, sans-serif" }}
                      onClick={() => navigate(`/play/${quiz._id}`)}
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default QuizPlayList;