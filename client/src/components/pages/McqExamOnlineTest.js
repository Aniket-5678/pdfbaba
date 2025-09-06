// src/components/McqExamOnlineTest.js
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Assuming you have theme context

const McqExamOnlineTest = () => {
  const [theme] = useTheme();

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
          maxWidth: { xs: "95vw", sm: "85vw" },
          textAlign: "center",
          p: { xs: 2, sm: 3 },
          boxShadow: theme === "dark" ? 1 : 3,
          borderRadius: 3,
          bgcolor: theme === "dark" ? "#121212" : "#ffffff",
        }}
      >
        <CardContent>
          {/* Heading */}
          <Typography
            variant="h6" // 👈 chhota heading
            fontWeight="bold"
            gutterBottom
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.1rem", sm: "1.5rem" }, // 👈 thoda chhota size
              color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            }}
          >
            📝 Online MCQ Exam Test
          </Typography>

          {/* Sub Heading */}
          <Typography
            variant="body2"
            paragraph
            sx={{
              color: theme === "dark" ? "#BDBDBD" : "#424242",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.8rem", sm: "1rem" },
              mb: 2,
            }}
          >
            Boost your knowledge with our <strong>real-time MCQ exams</strong>.  
            Attempt tests, track your score instantly, and prepare like a pro.
          </Typography>

          {/* Features */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.85rem", sm: "0.95rem" }, // 👈 thoda aur subtle
              color: theme === "dark" ? "#BDBDBD" : "#2c2c2c",
              textAlign: "left",
              mb: 2,
            }}
          >
            ✅ <strong>Multiple Subjects</strong> – Practice from wide range of topics. <br />
            ✅ <strong>Real-Time Timer</strong> – Attempt like real exam. <br />
            ✅ <strong>Instant Results</strong> – Check score & performance instantly. <br />
            ✅ <strong>Free & Paid Tests</strong> – Explore different levels of practice.  
          </Typography>

          {/* Button */}
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                width: "100%",
                maxWidth: { xs: "100%", sm: "250px" },
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "0.85rem", sm: "0.95rem" }, // 👈 thoda compact
                py: { xs: 1.1, sm: 1.3 },
                bgcolor: theme === "dark" ? "#1E88E5" : "#1976d2",
                ":hover": {
                  bgcolor: theme === "dark" ? "#1565C0" : "#115293",
                },
              }}
              component={Link}
              to="/exams" // ✅ Redirect exam list page
            >
              Play Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default McqExamOnlineTest;
