import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { FaLaptopCode, FaBook, FaFreeCodeCamp, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import ThemeContext

const categories = [
  {
    title: "TechZone",
    description:
      "Explore learning materials on ReactJS, NodeJS, HTML, CSS, and web development technologies. Perfect for aspiring developers!",
    icon: <FaLaptopCode size={40} />,
    link: "categoryworks",
  },
  {
    title: "Space Studies",
    description:
      "Explore the universe with PDFs on space exploration, satellite technology, astronomy, and space missions from leading space agencies.",
    icon: <FaBook size={40} />,
    link: "categoryworks",
  },
  {
    title: "Spiritual Insights",
    description:
      "Dive into spiritual teachings, meditation practices, and wisdom from various traditions to enhance personal growth and inner peace.",
    icon: <FaFreeCodeCamp size={40} />,
    link: "categoryworks",
  },
];

const steps = [
  {
    title: "Search for Notes",
    description:
      "Use the search bar to find PDFs across different categories like TechZone, Space Studies, and Spiritual Insights.",
    icon: <FaSearch size={40} />,
    link: "howitworks",
  },
  {
    title: "Select and Download",
    description:
      "Pick the PDF that fits your needs, whether you're looking to learn a new tech skill or explore space or spirituality.",
    icon: <FaBook size={40} />,
  },
];

const GlassCard = ({ title, description, icon, link, theme }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link to={link || "#"} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          background: theme === "dark" ? "rgba(30,30,30,0.6)" : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow:
            theme === "dark"
              ? "0 8px 24px rgba(255,255,255,0.05)"
              : "0 8px 24px rgba(0,0,0,0.1)",
          color: theme === "dark" ? "#fff" : "#000",
          textAlign: "center",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.03)" },
          height: "100%",
        }}
      >
        <CardContent>
          <Box sx={{ mb: 2, color: theme === "dark" ? "#90caf9" : "#1976d2" }}>{icon}</Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontFamily: "Poppins, sans-serif",
              color: theme === "dark" ? "#ccc" : "#333",
              fontSize: "0.9rem",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  </Grid>
);

const Featurepdf = () => {
  const [theme] = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme === "dark" ? "#121212" : "#fff",
        py: 6,
        px: 2,
        minHeight: "100vh",
      }}
    >
      {/* Featured Categories */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          Featured PDF Categories
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat, index) => (
            <GlassCard key={index} {...cat} theme={theme} />
          ))}
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          How It Works
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {steps.map((step, index) => (
            <GlassCard key={index} {...step} theme={theme} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Featurepdf;
