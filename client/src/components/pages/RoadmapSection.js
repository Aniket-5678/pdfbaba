import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

const RoadmapSection = () => {
  const [theme] = useTheme(); // Get current theme

  return (
    <Container maxWidth="lg" sx={{ my: 8, textAlign: "center" }}>
      <Box
        sx={{
          bgcolor: theme === "dark" ? "#121212" : "white",
          color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
          p: 5,
          borderRadius: 3,
          boxShadow: theme === "dark" ? 1 : 3,
          transition: "0.3s",
          fontFamily: "'Poppins', sans-serif",
          "&:hover": { boxShadow: theme === "dark" ? 3 : 5 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "0.9rem", sm: "1.5rem" }, // 1rem for mobile, 1.5rem for desktop
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
          }}
        >
          Your Career Path Starts Here 🚀
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          mb={3}
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjusting subtitle for mobile
            fontFamily: "'Poppins', sans-serif",
            color: theme === "dark" ? "#BDBDBD" : "#2c2c2c",
          }}
        >
          Master Full-Stack, AI, Cybersecurity & More with Expert Roadmaps!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/roadmapdata"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            bgcolor: theme === "dark" ? "#1E88E5" : "#1976d2",
            ":hover": { bgcolor: theme === "dark" ? "#1565C0" : "#115293" },
          }}
        >
          Explore Roadmaps →
        </Button>
      </Box>
    </Container>
  );
};

export default RoadmapSection;
