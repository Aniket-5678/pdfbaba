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
import SmallBannerAd from "./SmallBannerAd";


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

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoadmaps.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRoadmaps = filteredRoadmaps.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const getGlassCardStyle = () => ({
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s",
    minHeight: { xs: "120px", sm: "140px" },
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background:
      theme === "dark"
        ? "rgba(255, 255, 255, 0.06)"
        : "rgba(255, 255, 255, 0.55)",
    border:
      theme === "dark"
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow:
      theme === "dark"
        ? "0 8px 32px rgba(0,0,0,0.35)"
        : "0 8px 32px rgba(31, 38, 135, 0.25)",
    color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
    "&:active": { transform: "scale(0.97)" },
    "&:hover": {
      transform: { xs: "none", sm: "scale(1.05)" },
      boxShadow:
        theme === "dark"
          ? "0 12px 48px rgba(0,0,0,0.5)"
          : "0 12px 48px rgba(31, 38, 135, 0.3)",
    },
  });

  return (
    <Layout>
      <Container sx={{ py: 4, mt: 15 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
            mb: 4,
          }}
        >
          📌 Explore Roadmaps
        </Typography>
  <Box display="flex" justifyContent="center" mb={2}>
    <SmallBannerAd />
  </Box>
        <TextField
          fullWidth
          placeholder="Search by category..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    fontSize: { xs: 22, sm: 24 },
                    color: theme === "dark" ? "#E0E0E0" : "#444",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 5,
            bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            borderRadius: 2,
            input: {
              color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "0.95rem", sm: "1rem" },
            },
          }}
        />

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
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
                xs={6} // 2 cards per row on mobile
                sm={6} // 2 cards per row on small screens
                md={4} // 3 cards per row on desktop
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
                      width: "100%",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                      fontSize: { xs: "0.85rem", sm: "1.15rem", md: "1.25rem" }, // mobile chhota, desktop bada
    textTransform: "capitalize",
    textAlign: "center",
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

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size={window.innerWidth < 600 ? "small" : "medium"}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                },
              }}
            />
          </Box>
        )}

        <Box mt={4}>
          <NativeAd />
        </Box>
      </Container>
    </Layout>
  );
};

export default Roadmap;
