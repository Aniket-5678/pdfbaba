import React, { useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import Layout from "../Layout/Layout";
import SpacebanneImage from "../images/space.png";
import PDFNotesImages from "../images/chakra1.png";
import TechprojectImage from "../images/techzone.png"
import { useTheme } from "../context/ThemeContext";

const services = [
  {
    id: 1,
    title: "Web Development Project Code",
    description: "A complete MERN stack project for students.",
    image: TechprojectImage ,
    whatsapp: "https://wa.me/918830730929",
  },
  {
    id: 2,
    title: "Thumbnail Design Pack",
    description: "High-quality thumbnails for student projects.",
    image: SpacebanneImage,
    whatsapp: "https://wa.me/918830730929",
  },
  {
    id: 3,
    title: "PPTX Notes PDF",
    description: "Handwritten notes available in PDF format.",
    image: PDFNotesImages,
    whatsapp: "https://wa.me/918830730929",
  },
];

const ServiceList = () => {
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 4 },
          pt: { xs: 2, sm: 4 },
          marginTop: "120px",
          bgcolor: theme === "dark" ? "#121212" : "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "white" : "black",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          📂 Available Services
        </Typography>

        <Grid container spacing={2} justifyContent="center" marginTop={"20px"}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{
                  maxWidth: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.02)" },
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "space-between", // ✅ Button bottom pe hamesha rahega
                    bgcolor: theme === "light" ? "white" : "#1e1e1e",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme === "dark" ? "#BDBDBD" : "text.secondary",
                      mb: 2,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                    }}
                  >
                    {service.description}
                  </Typography>

                 
                  <Button
  variant="contained"
  color="success"
  startIcon={<WhatsApp />}
  href={service.whatsapp}
  target="_blank"
  sx={{
    width: "100%",
    fontFamily: "Poppins, sans-serif",
    fontSize: { xs: "0.85rem", sm: "1rem" },
    bgcolor: theme === "dark" ? "#25D366" : "#4CAF50",
    "&:hover": {
      bgcolor: theme === "dark" ? "#1EBE5B" : "#388E3C",
    },
    color: "white", // ✅ Ensure text is visible
    py: { xs: 1, sm: 1.2 },
    marginTop: "auto",
    "@media (max-width: 600px)": {
      bgcolor: "#4CAF50 !important", // ✅ Ensure background on small screens
      color: "white !important",
    },
  }}
>
  Contact Us on WhatsApp
</Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default ServiceList;
