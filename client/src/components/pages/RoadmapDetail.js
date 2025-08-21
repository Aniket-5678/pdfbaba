// src/pages/RoadmapDetail.jsx

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
} from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // ✅ Theme context
import GoogleMultiplexAd from "./GoogleMultiplexAd";
import MonetagPushBanners from "./MonetagPushBanners";

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme] = useTheme(); // 'dark' or 'light'

  useEffect(() => {
    axios
      .get(`/api/v1/roadmaps/${id}`)
      .then((res) => {
        setRoadmap(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "❌ Error fetching roadmap:",
          err.response ? err.response.data : err.message
        );
        setError("Failed to fetch roadmap. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
        Loading...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="h4" textAlign="center" color="error" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );

  if (!roadmap)
    return (
      <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
        No roadmap found!
      </Typography>
    );

  // Glass effect styles
  const glassStyles = {
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
    borderRadius: 4,
    p: { xs: 3, sm: 5 },
    fontFamily: "'Poppins', sans-serif",
    color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
    transition: "0.3s ease",
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Roadmap Title */}
      <Typography
        variant="h3"
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

      {/* Glass Styled Box */}
      <Paper elevation={0} sx={glassStyles}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.2rem" },
            color: theme === "dark" ? "#BDBDBD" : "#333",
          }}
        >
          Follow this step-by-step guide to master{" "}
          <strong>{roadmap.category}</strong>.
        </Typography>

        <List>
          {roadmap.steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                bgcolor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.75)",
                borderRadius: 2,
                mb: 2,
                px: 2,
              }}
            >
              <ListItem>
                <ListItemText
                  primary={`${index + 1}. ${step}`}
                  primaryTypographyProps={{
                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    color: theme === "dark" ? "#E0E0E0" : "#1a1a1a",
                  }}
                />
              </ListItem>
              {index !== roadmap.steps.length - 1 && (
                <Divider
                  sx={{
                    mx: 2,
                    bgcolor: theme === "dark" ? "#444" : "#ccc",
                  }}
                />
              )}
            </Box>
          ))}
        </List>
      </Paper>
      <Box>
        <GoogleMultiplexAd/>
      </Box>
      <Box>
        <MonetagPushBanners/>
      </Box>
    </Container>
  );
};

export default RoadmapDetail;
