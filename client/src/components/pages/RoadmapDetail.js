import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import GoogleMultiplexAd from "./GoogleMultiplexAd";
import GoogleDisplayAds from "./GoogleDisplayAds";

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme] = useTheme();

  useEffect(() => {
    axios
      .get(`/api/v1/roadmaps/${id}`)
      .then((res) => {
        setRoadmap(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching roadmap:", err.response ? err.response.data : err.message);
        setError("Failed to fetch roadmap. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Typography variant="h5" textAlign="center" sx={{ mt: 5 }}>Loading...</Typography>;
  if (error) return <Typography variant="h5" textAlign="center" color="error" sx={{ mt: 5 }}>{error}</Typography>;
  if (!roadmap) return <Typography variant="h5" textAlign="center" sx={{ mt: 5 }}>No roadmap found!</Typography>;

  const glassStyles = {
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.65)",
    border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0,0,0,0.1)",
    boxShadow: theme === "dark" ? "0 10px 40px rgba(0,0,0,0.3)" : "0 10px 40px rgba(0,0,0,0.08)",
    borderRadius: 3,
    p: { xs: 3, sm: 5 },
    fontFamily: "'Poppins', sans-serif",
    color: theme === "dark" ? "#E0E0E0" : "#1c1c1c",
    transition: "0.3s ease",
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
      {/* Roadmap Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
          fontSize: { xs: "1.4rem", sm: "2.2rem" },
          mb: 4,
        }}
      >
        {roadmap.category} Roadmap 🚀
      </Typography>

      <Grid container spacing={4}>
        {/* Left Sidebar Ads */}
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 3 }}>
            <GoogleDisplayAds />
          </Box>
        </Grid>

        {/* Main Roadmap Content */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={glassStyles}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                color: theme === "dark" ? "#BDBDBD" : "#333",
              }}
            >
              Follow this step-by-step guide to master{" "}
              <strong>{roadmap.category}</strong>.
            </Typography>

            <List sx={{ p: 0 }}>
              {roadmap.steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    mb: 2,
                    px: 3,
                    py: 1.5,
                    transition: "0.3s",
                    "&:hover": {
                      transform: { xs: "none", sm: "scale(1.02)" },
                      boxShadow:
                        theme === "dark"
                          ? "0 8px 30px rgba(0,0,0,0.4)"
                          : "0 8px 30px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`${index + 1}. ${step}`}
                      primaryTypographyProps={{
                        fontSize: { xs: "0.9rem", sm: "1.05rem" },
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        color: theme === "dark" ? "#E0E0E0" : "#1a1a1a",
                      }}
                    />
                  </ListItem>
                  {index !== roadmap.steps.length - 1 && (
                    <Divider
                      sx={{
                        mx: 3,
                        bgcolor: theme === "dark" ? "#444" : "#ccc",
                      }}
                    />
                  )}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Sidebar Ads */}
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 3 }}>
            <GoogleDisplayAds />
          </Box>
          <Box sx={{ mt: 3 }}>
            <GoogleMultiplexAd />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoadmapDetail;
