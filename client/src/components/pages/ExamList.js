import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Pagination,
  TextField,
} from "@mui/material";

import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext"; // Theme context
import SmallBannerAd from "./SmallBannerAd";
import GoogleDisplayAds from "./GoogleDisplayAds";

function ExamList() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [auth] = useAuth();
  const [theme] = useTheme();
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 9;

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      axios
        .get("/api/v1/mcqexam")
        .then((res) => {
          setExams(res.data.exams);
          setFilteredExams(res.data.exams);
        })
        .catch((err) => console.error("Fetch Exams Error:", err));
    }
  }, [auth?.user]);

  // 🔍 Debounce Search Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔍 Apply search filter
  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredExams(exams);
    } else {
      const lowerSearch = debouncedSearch.toLowerCase();
      setFilteredExams(
        exams.filter((exam) => exam.title.toLowerCase().includes(lowerSearch))
      );
    }
    setCurrentPage(1); // Reset to first page on search
  }, [debouncedSearch, exams]);

  const handleJoin = async (examId) => {
    try {
      await axios.post("/api/v1/mcqgame/join", {
        userId: auth?.user?._id,
        username:
          auth?.user?.username ||
          auth?.user?.fullName ||
          auth?.user?.name ||
          auth?.user?.email,
        examId,
      });
      navigate(`/exam/${examId}`);
    } catch (err) {
      console.error("Join Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Unable to join");
    }
  };

  const handleSignInRedirect = () => {
    navigate("/login");
  };

  // 🚀 Agar login nahi hai toh ek card ke andar button + text
  if (!auth?.user) {
    return (
      <Layout>
        <Container
          maxWidth="sm"
          sx={{
            mt: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 3,
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme === "dark" ? "white" : "black",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Please sign in to view available exams.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSignInRedirect}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                }}
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );
  }

  // Pagination logic
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 15, mb: 5 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "white" : "black",
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Available Exams
        </Typography>

     <Box
  sx={{
    mt: 3,
    display: "flex",
    justifyContent: "center",
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      bgcolor: theme === "dark" ? "#2b2b2b" : "#f5f5f5",
      borderRadius: "50px",
      px: 2,
      py: 0.5,
      boxShadow: 2,
      width: "100%",
      maxWidth: "450px",
    }}
  >
    <TextField
      variant="standard"
      placeholder="Search exams..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        disableUnderline: true,
      }}
      sx={{
        flex: 1,
        input: {
          color: theme === "dark" ? "white" : "black",
          fontFamily: "Poppins, sans-serif",
          fontSize: "0.95rem",
          px: 1,
        },
      }}
    />
    <Box
      sx={{
        ml: 1,
        cursor: "pointer",
        color: theme === "dark" ? "lightgray" : "gray",
        "&:hover": {
          color: theme === "dark" ? "white" : "black",
        },
      }}
    >
      <i
        className="react-icon"
        style={{
          fontSize: "1.4rem",
        }}
      >
        <span role="img">🔍</span>
      </i>
    </Box>
  </Box>
</Box>

        {/* Banner Ad */}
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <SmallBannerAd />
        </Box>

        {/* Exams Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {currentExams.length > 0 ? (
            currentExams.map((exam) => (
              <Grid item xs={12} sm={6} md={4} key={exam._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 2,
                    backgroundColor: theme === "dark" ? "#2b2b2b" : "#fff",
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      {exam.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: theme === "dark" ? "lightgray" : "gray",
                      }}
                    >
                      {exam.questions.length} question
                      {exam.questions.length > 1 ? "s" : ""}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleJoin(exam._id)}
                      sx={{
                        borderRadius: 2,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Join
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                mt: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: theme === "dark" ? "lightgray" : "gray",
                }}
              >
                No exams found.
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Box>
        )}
      </Container>
      <GoogleDisplayAds/>
    </Layout>
  );
}

export default ExamList;
