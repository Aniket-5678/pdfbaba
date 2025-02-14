import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Box, Modal } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";
import Layout from "../Layout/Layout";
import PDFNotesImages from "../images/chakra1.png";
import { useTheme } from "../context/ThemeContext";
import portfolioImage from "../images/Portfolio.png";
import reactanimationImage from "../images/Reactjsthumbnail.png";
import youtubeImage from "../images/youtube.png"
import clothesImage from "../images/clothes.png"
import jordanImage from "../images/Jordan.png"
import promotionBannerImage from "../images/promotionbanner.png"

const services = [
  {
    id: 1,
    title: "Portfolio Project Code",
    description: "A complete MERN stack project for students.",
    image: portfolioImage,
    link: "https://portfolio-4-8gnu.onrender.com",
    price: "$5",  
  },
  {
    id: 2,
    title: "React Animation Project Code",
    description: "React animation using tsparticles.",
    image: reactanimationImage,
    link: "https://aniketsinghproject.netlify.app/",
    price: "$3",  
  },
  {
    id: 3,
    title: "YouTube Thumbnail Design",
    description: "Want to boost your video’s click-through rate with an eye-catching thumbnail? We create custom-designed YouTube thumbnails that stand out. Whether it's for your channel or a single video, we’re here to help. Contact us on WhatsApp to get started—it's free for the first design!",
    image: youtubeImage,
    price: "Free",  
  },
  {
    id: 4,
    title: "E-commerce Banner Design",
    description: "Professional, high-quality e-commerce banners designed to increase product visibility and attract more customers. We provide personalized designs that align with your brand's vision. For just $1, we'll create a banner that matches your style and goals. Contact us on WhatsApp to get started!",
    image: clothesImage,
    price: "$1",  
  },
  {
    id: 5,
    title: "E-commerce Product Banner",
    description: "Custom product banners designed specifically for your e-commerce store. We ensure the banners are visually appealing, engaging, and optimized to drive sales. For just $1, you’ll receive a custom design that enhances your product visibility. Get in touch via WhatsApp for a personalized banner!",
    image: jordanImage,
    price: "$1",  
  },
  {
    id: 6,
    title: "PPTX Notes PDF",
    description: "We offer well-structured PPT notes in PDF format for any subject, designed to make learning easier. If you need similar notes tailored to your specific requirements, we’re happy to help. For just $1, we will create notes in PDF format that suit your study needs. Contact us on WhatsApp for more information!",
    image: PDFNotesImages,
    price: "$1",  
  },
  {
    id: 7,
    title: "Custom Promotion Banner",
    description: "Need a custom promotion banner for your brand or product? We design banners that effectively promote your offerings, increasing visibility and engagement. For just $1, we’ll create a banner that matches your campaign's goals and style. Contact us on WhatsApp to get started!",
    image: promotionBannerImage, 
    price: "$1",  
  },
];

const ServiceList = () => {
  const [theme] = useTheme();
  const [open, setOpen] = useState(false);

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

        <Typography
          textAlign="center"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "#BDBDBD" : "#555",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            marginBottom: "20px",
          }}
        >
          Need a custom YouTube thumbnail or banner design? Contact us on WhatsApp for professional and eye-catching designs!
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
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
               <CardContent
  sx={{
    p: { xs: 2, sm: 3 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    bgcolor: theme === "light" ? "white" : "#1e1e1e",
    flexGrow: 1,
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

  {/* Display Price */}
  <Typography
    variant="body2"
    sx={{
      color: theme === "dark" ? "#BDBDBD" : "text.secondary",
      fontFamily: "Poppins, sans-serif",
      fontSize: { xs: "0.85rem", sm: "1rem" },
      fontWeight: "bold",
    }}
  >
    Price: {service.price}
  </Typography>

  {service.link && (
    <Button
      variant="contained"
      color="primary"
      href={service.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: "100%",
        fontFamily: "Poppins, sans-serif",
        fontSize: { xs: "0.85rem", sm: "1rem" },
        bgcolor: theme === "dark" ? "#3B82F6" : "#1976D2",
        "&:hover": { bgcolor: theme === "dark" ? "#2563EB" : "#1565C0" },
        color: "white",
        py: { xs: 1, sm: 1.2 },
      }}
    >
      View Project
    </Button>
  )}
</CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating WhatsApp Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#25D366",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: 3,
        }}
        onClick={() => setOpen(true)}
      >
        <WhatsApp sx={{ color: "white", fontSize: 30 }} />
      </Box>

   
{/* Modal */}
<Modal open={open} onClose={() => setOpen(false)}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: theme === "dark" ? "#1e1e1e" : "white",
      color: theme === "dark" ? "white" : "black",
      boxShadow: 5, // Enhanced shadow for a premium look
      p: 4,
      borderRadius: "12px", // More rounded for modern feel
      width: { xs: "90%", sm: "400px" }, // Mobile-friendly width
      maxWidth: "90vw",
      maxHeight: "85vh",
      overflowY: "auto",
    }}
  >
    {/* Header with Close Button */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: theme === "dark" ? "#333" : "#ddd",
        pb: 2,
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1.1rem", sm: "1.4rem" },
          fontWeight: "bold",
        }}
      >
        Contact Us
      </Typography>

      {/* Close Button */}
      <AiOutlineClose
        size={22}
        onClick={() => setOpen(false)}
        style={{
          cursor: "pointer",
          color: theme === "dark" ? "#bbb" : "#333",
          transition: "color 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = theme === "dark" ? "#bbb" : "#333")}
      />
    </Box>

    {/* WhatsApp Button */}
    <Button
      variant="contained"
      component="a"
      href="https://wa.me/918830730929"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "250px",
        margin: "auto",
        padding: "12px",
        bgcolor: "#25D366 !important",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease-in-out",
        "&:hover": { bgcolor: "#1DA851 !important", transform: "scale(1.05)" }, // Smooth hover effect
      }}
    >
      Open WhatsApp
    </Button>
  </Box>
</Modal>

    </Layout>
  );
};

export default ServiceList;
