import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Pagination,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme] = useTheme();
  const navigate = useNavigate();

  const cardsPerPage = 15;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error("Error fetching roadmaps:", err));
  }, []);

  // Filter based on search query
  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRoadmaps.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRoadmaps = filteredRoadmaps.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0); // Optional: Scroll up on page change
  };

  const getGlassCardStyle = () => ({
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s",
    height: "150px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    background:
      theme === "dark"
        ? "rgba(255, 255, 255, 0.06)"
        : "rgba(255, 255, 255, 0.6)",
    border:
      theme === "dark"
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow:
      theme === "dark"
        ? "0 8px 32px rgba(0,0,0,0.35)"
        : "0 8px 32px rgba(31, 38, 135, 0.25)",
    color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow:
        theme === "dark"
          ? "0 12px 48px rgba(0,0,0,0.5)"
          : "0 12px 48px rgba(31, 38, 135, 0.3)",
    },
  });

  return (
    <Layout>
      <Container sx={{ py: 4, mt: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.5rem",
            mb: 3,
          }}
        >
          📌 Explore Roadmaps
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search by category..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme === "dark" ? "#E0E0E0" : "#444" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            borderRadius: 2,
            input: {
              color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        />

        {/* Cards */}
        <Grid container spacing={4}>
          {currentRoadmaps.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                width: "100%",
                mt: 3,
                color: theme === "dark" ? "#BDBDBD" : "#555",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              No roadmaps found.
            </Typography>
          ) : (
            currentRoadmaps.map((roadmap) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={roadmap._id}
                onClick={() => navigate(`/roadmap/${roadmap._id}`)}
              >
                <Card sx={getGlassCardStyle()}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.2rem" },
                        textTransform: "capitalize",
                      }}
                    >
                      {roadmap.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                },
              }}
            />
          </Box>

        )}
        <Box>
          <NativeAd/>
        </Box>
      </Container>
    </Layout>
  );
};

export default Roadmap;
