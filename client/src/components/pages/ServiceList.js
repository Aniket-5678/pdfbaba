import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Modal,
  Pagination,
} from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { AiOutlineClose } from "react-icons/ai";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";

// Import your images
import portfolioImage from "../images/Portfolio.png";
import reactanimationImage from "../images/Reactjsthumbnail.png";
import youtubeImage from "../images/youtube.png";
import clothesImage from "../images/clothes.png";
import jordanImage from "../images/Jordan.png";
import promotionBannerImage from "../images/promotionbanner.png";
import iphoneBannerImage from "../images/iphone.png";
import PDFNotesImages from "../images/chakra1.png";


const services = [
  { id: 1, title: "Portfolio Project Code", description: "A complete MERN stack project for students.", image: portfolioImage, link: "https://portfolio-4-8gnu.onrender.com", price: "$5" },
  { id: 2, title: "React Animation Project Code", description: "React animation using tsparticles.", image: reactanimationImage, link: "https://aniketsinghproject.netlify.app/", price: "$3" },
  { id: 3, title: "YouTube Thumbnail Design", description: "Boost your video CTR with a custom thumbnail!", image: youtubeImage, price: "Free" },
  { id: 4, title: "E-commerce Banner Design", description: "High-quality banners to increase visibility.", image: clothesImage, price: "$1" },
  { id: 5, title: "E-commerce Product Banner", description: "Visually appealing banners for your products.", image: jordanImage, price: "$1" },
  { id: 6, title: "PPTX Notes PDF", description: "Structured notes in PDF format.", image: PDFNotesImages, price: "$1" },
  { id: 7, title: "Custom Promotion Banner", description: "Effective banners for promotions.", image: promotionBannerImage, price: "$1" },
  { id: 8, title: "iPhone Style Banner", description: "Modern banner for tech products.", image: iphoneBannerImage, price: "$1" },
];

const itemsPerPage = 6;

const ServiceList = () => {
  const [theme] = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const paginatedServices = services.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Layout>
      <Box
        sx={{
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
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "white" : "black",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            mb: 2,
          }}
        >
          📂 Available Services
        </Typography>

        <Grid container spacing={3} justifyContent="center" ref={gridRef}>
          {paginatedServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background: theme === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
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
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent
                  sx={{
                    color: theme === "dark" ? "#f5f5f5" : "#2c2c2c",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {service.description}
                  </Typography>
                  <Typography fontWeight="bold">Price: {service.price}</Typography>
                  {service.link && (
                    <Button
                      href={service.link}
                      target="_blank"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: theme === "dark" ? "#2196f3" : "#1976d2",
                        fontFamily: "Poppins, sans-serif",
                        "&:hover": {
                          backgroundColor: theme === "dark" ? "#1565c0" : "#0d47a1",
                        },
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

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(services.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>

        {/* Floating WhatsApp Icon */}
        <Box
          sx={{
            position: "fixed",
            bottom: 95,
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
            zIndex: 1300,
          }}
          onClick={() => setOpen(true)}
        >
          <WhatsApp sx={{ color: "white", fontSize: 30 }} />
        </Box>

        {/* WhatsApp Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: theme === "dark" ? "#1e1e1e" : "white",
              color: theme === "dark" ? "white" : "black",
              boxShadow: 5,
              p: 4,
              borderRadius: "12px",
              width: { xs: "90%", sm: "400px" },
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
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
              <Typography variant="h6">Contact Us</Typography>
              <AiOutlineClose
                size={22}
                onClick={() => setOpen(false)}
                style={{
                  cursor: "pointer",
                  color: theme === "dark" ? "#bbb" : "#333",
                }}
              />
            </Box>
            <Button
              variant="contained"
              fullWidth
              href="https://wa.me/918830730929"
              target="_blank"
              sx={{
                bgcolor: "#25D366 !important",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "#1DA851 !important",
                  transform: "scale(1.05)",
                },
              }}
            >
              Open WhatsApp
            </Button>
          </Box>
        </Modal>
      </Box>
 
    </Layout>
  );
};

export default ServiceList;
