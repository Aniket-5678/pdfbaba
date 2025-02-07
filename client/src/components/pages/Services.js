import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Assuming a theme context

const Services = () => {
  const [theme] = useTheme(); // Get the theme state

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
          boxShadow: theme === "dark" ? 1 : 3, // Dark mode me less shadow
          borderRadius: 2,
          bgcolor: theme === "dark" ? "#121212" : "#ffffff", // Dark mode background
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            color="primary"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: theme === "dark" ? "#E0E0E0" : "#2c2c2c", // Light gray in dark mode, soft black in light mode
            }}
          >
            🚀 Our Services
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{
              color: theme === "dark" ? "#BDBDBD" : "#2c2c2c",
              mb: 2,
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            We provide high-quality resources for students and professionals, including:
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "#BDBDBD" : "#2c2c2c",
            }}
          >
            ✅ <strong>Web Development Projects code </strong> – Complete frontend and backend.  
            ✅ <strong>PowerPoint Notes</strong> – Well-structured PPT notes for presentations.  
            ✅ <strong>Custom Thumbnails</strong> – High-quality thumbnail designs for projects.  
            ✅ <strong>Study PDFs & Guides</strong> – Detailed notes and reference materials.  
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 2,
              width: "100%",
              maxWidth: { xs: "100%", sm: "300px" },
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              py: { xs: 1.2, sm: 1.5 },
              bgcolor: theme === "dark" ? "#1E88E5" : "#1976d2",
              ":hover": {
                bgcolor: theme === "dark" ? "#1565C0" : "#115293",
              },
            }}
            component={Link}
            to="/service"
          >
            Buy Now For Free
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Services;
