import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";

const ServiceDetails = () => {
  const [theme] = useTheme();
  const [auth] = useAuth();
  const user = auth.user;
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/${id}`);
      const data = res.data.service ? res.data.service : res.data;
      setService(data);
      setMainImage(data.thumbnail || data.multipleImages?.[0] || "");
    } catch (err) {
      console.error("Error fetching service:", err);
    }
  };

  const handleBuyNow = () => {
    if (!user) return alert("Please login to buy this project.");
    navigate(`/sourcecode/buy/${service._id}`);
  };

  const handleViewSource = () => {
    if (!service?.viewLink) {
      alert("No live demo or source link available for this project.");
      return;
    }
    window.open(service.viewLink, "_blank");
  };

  if (!service) return <Typography>Loading...</Typography>;

  return (
    <Layout>
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          pt: { xs: 12, sm: 12 },
          minHeight: "100vh",
          bgcolor: theme === "dark" ? "#121212" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          mt: 6,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Left: Main Image + Thumbnails */}
          <Box sx={{ flex: 1 }}>
            {mainImage && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={mainImage}
                  alt="Main"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}

            {/* Thumbnails */}
            <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
              {service.thumbnail && service.thumbnail !== mainImage && (
                <img
                  src={service.thumbnail}
                  alt="thumbnail"
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                    border:
                      mainImage === service.thumbnail
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                  }}
                  onClick={() => setMainImage(service.thumbnail)}
                />
              )}

              {service.multipleImages?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`img-${idx}`}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                    border:
                      mainImage === img
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </Box>
          </Box>

          {/* Right: Details */}
          <Box sx={{ flex: 1, display: "flex",  flexDirection: "column", gap: 3 }}>
            <Typography
    variant="h4"
    fontWeight="700"
    sx={{
      fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.3rem" },
      lineHeight: 1.3,
    }}
  >
    {service.title}
  </Typography>

  <Typography
    sx={{
      lineHeight: 1.6,
      whiteSpace: "pre-line",
      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
      color: "#444",
    }}
  >
    {service.description}
  </Typography>

            <Typography fontWeight="bold">Price: ₹{service.price}</Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  py: 1.5,
                  px: 4,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                Buy Now
              </Button>

              <Button
                variant="outlined"
                onClick={handleViewSource}
                sx={{
                  py: 1.5,
                  px: 4,
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
                }}
              >
                View website link
              </Button>
            </Box>

            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#f1f1f1",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                What you'll get:
              </Typography>
              <Typography>
                ✅ Complete project source code in a zip file
                <br />
                ✅ All necessary files to run and practice the project
                <br />
                ✅ Ready-to-use project for learning, customization, or deployment
                <br />
                ✅ Perfect for students, developers, or anyone looking to explore the code
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ServiceDetails;
