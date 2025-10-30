import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
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
          pt: { xs: 10, sm: 12 },
          minHeight: "100vh",
          bgcolor: theme === "dark" ? "#121212" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          mt: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
            alignItems: "flex-start",
          }}
        >
          {/* Left: Image Section */}
          <Box sx={{ flex: 1 }}>
            {mainImage && (
              <Box
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow:
                    theme === "dark"
                      ? "0 0 10px rgba(255,255,255,0.1)"
                      : "0 2px 12px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={mainImage}
                  alt="Main"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            )}

            {/* Thumbnails */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                pb: 1,
              }}
            >
              {[
                service.thumbnail,
                ...(service.multipleImages || []),
              ]
                .filter(Boolean)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    style={{
                      width: "90px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: 6,
                      cursor: "pointer",
                      border:
                        mainImage === img
                          ? "2px solid #1976d2"
                          : "2px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
            </Box>
          </Box>

          {/* Right: Project Details */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
                lineHeight: 1.3,
              }}
            >
              {service.title}
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.7,
                whiteSpace: "pre-line",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                color: theme === "dark" ? "#ccc" : "#444",
              }}
            >
              {service.description}
            </Typography>

            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: "#1976d2",
              }}
            >
              Price: ₹{service.price}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  py: 1.3,
                  px: 4,
                  backgroundColor: "#1976d2",
                  fontWeight: "600",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                Buy Now
              </Button>

              <Button
                variant="outlined"
                onClick={handleViewSource}
                sx={{
                  py: 1.3,
                  px: 4,
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  fontWeight: "600",
                  borderRadius: 2,
                  "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
                }}
              >
                View Website Link
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* What You'll Get Section */}
            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 2,
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#f8f9fa",
                boxShadow:
                  theme === "dark"
                    ? "0 0 10px rgba(255,255,255,0.05)"
                    : "0 1px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
              >
                What you'll get:
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  lineHeight: 1.8,
                }}
              >
                ✅ Complete source code (.zip) <br />
                ✅ Setup instructions <br />
                ✅ Ready-to-use project files <br />
                ✅ Lifetime access after purchase <br />
                🚫 No refunds after purchase (digital product)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ServiceDetails;
