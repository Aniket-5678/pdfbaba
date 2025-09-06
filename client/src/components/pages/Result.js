// Result.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// Material UI imports
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Card,
  CardContent,
  Box,
  Collapse,
  IconButton,
  useMediaQuery,
  Button
} from "@mui/material";

import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
// Create MUI theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function Result() {
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState({}); // track which user's answers are expanded
  const isMobile = useMediaQuery("(max-width:600px)"); // detect mobile screen
 const navigate = useNavigate()


   useEffect(() => {
         // Scroll to top when the component is mounted
         window.scrollTo(0, 0);
       }, []);
       
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/v1/mcqgame/results");
        setResults(res.data);
      } catch (err) {
        console.error("Fetch results error", err);
      }
    };
    fetch();
  }, []);

  const toggleExpand = (userId) => {
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  if (!results.length)
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" align="center" sx={{ mt: 5 }}>
          Loading results...
        </Typography>
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
  <Button
    variant="outlined"
    startIcon={<ArrowBack />}
    onClick={() => navigate("/exams")}
  >
    Back
  </Button>
</Box>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Leaderboard
        </Typography>

        <Paper
          elevation={3}
          sx={{
            mb: 4,
            overflowX: "auto", // scrollable table on mobile
            borderRadius: 3,
          }}
        >
          <Table size={isMobile ? "small" : "medium"}>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
  <TableRow>
    <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem", px: 1 }}>
      Rank
    </TableCell>
    <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem", px: 1 }}>
      Username
    </TableCell>
    <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem", px: 1 }}>
      Marks
    </TableCell>
    <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem", px: 1 }}>
      Correct
    </TableCell>
    <TableCell sx={{ fontWeight: "bold", fontSize: "0.6rem", px: 1 }}>
      Wrong
    </TableCell>
  </TableRow>
</TableHead>
            <TableBody>
              {results.map((r, idx) => (
                <TableRow
                  key={r.userId}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "rgba(0,0,0,0.02)" },
                  }}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{r.username}</TableCell>
                  <TableCell>{r.score}</TableCell>
                  <TableCell sx={{ color: "green", fontWeight: 600 }}>
                    {r.correctCount}
                  </TableCell>
                  <TableCell sx={{ color: "red", fontWeight: 600 }}>
                    {r.wrongCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Typography
          variant={isMobile ? "h6" : "h5"}
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Per-user answers
        </Typography>
        {results.map((r) => (
          <Card
            key={r.userId}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: 3,
              p: 1,
            }}
          >
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={{ fontWeight: 500 }}
                >
                  {r.username} — Marks: {r.score} — Correct: {r.correctCount}
                </Typography>
                <IconButton
                  size={isMobile ? "small" : "medium"}
                  onClick={() => toggleExpand(r.userId)}
                >
                  {expanded[r.userId] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Collapse in={expanded[r.userId]} timeout="auto" unmountOnExit>
                <Box mt={2}>
                  {r.answers.map((a, i) => (
                    <Box
                      key={i}
                      mb={1.5}
                      p={1.2}
                      sx={{
                        borderRadius: 2,
                        fontSize: isMobile ? "0.85rem" : "1rem",
                        bgcolor: a.isCorrect
                          ? "rgba(56, 142, 60, 0.1)"
                          : "rgba(211, 47, 47, 0.1)",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Q{i + 1}:</strong> Selected:{" "}
                        {a.selectedText ?? "No Answer"} — Correct:{" "}
                        {a.correctAnswerText} —{" "}
                        <span
                          style={{
                            color: a.isCorrect ? "green" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {a.isCorrect ? "Right" : "Wrong"}
                        </span>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default Result;
