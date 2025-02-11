import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Assuming theme context

const QuizIntro = () => {
  const [theme] = useTheme(); // Get current theme

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: { xs: 1, sm: 2 },
        my: { xs: 3, sm: 4 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: "95vw", sm: "90vw" },
          textAlign: "center",
          p: { xs: 2, sm: 3 },
          boxShadow: theme === "dark" ? 1 : 3,
          borderRadius: 2,
          bgcolor: theme === "dark" ? "#121212" : "#ffffff",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            }}
          >
            Start Your Quiz Journey
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              fontFamily: "Poppins, sans-serif",
              color: theme === "dark" ? "#BDBDBD" : "#2c2c2c",
              mb: 2,
            }}
          >
            Boost your knowledge with our engaging quizzes. Pick a category, challenge yourself, and track your progress!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/quizplaylist"
            sx={{
              mt: 2,
              width: "100%",
              maxWidth: { xs: "100%", sm: "300px" },
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              py: { xs: 1.2, sm: 1.5 },
              bgcolor: theme === "dark" ? "#1E88E5" : "#1976d2",
              ":hover": { bgcolor: theme === "dark" ? "#1565C0" : "#115293" },
            }}
          >
            Practice Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizIntro;
