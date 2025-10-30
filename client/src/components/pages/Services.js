import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const [theme] = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/sourcecode");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Responsive slider setup
  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    speed: 700,
    slidesToShow: 3, // desktop
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // tablet
      { breakpoint: 768, settings: { slidesToShow: 2 } },  // mobile (2 cards)
      { breakpoint: 480, settings: { slidesToShow: 2 } },  // small mobile
    ],
  };

  if (loading)
    return (
      <Typography textAlign="center" mt={5}>
        Loading...
      </Typography>
    );

  if (services.length === 0)
    return (
      <Typography textAlign="center" mt={5}>
        No projects available
      </Typography>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 6,
        bgcolor: theme === "dark" ? "#121212" : "#fafafa",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        fontSize="1.1rem"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
      >
        Website Projects
      </Typography>

      <Slider {...sliderSettings}>
        {services.map((service) => (
          <Box
            key={service._id}
            px={1}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              onClick={() => navigate(`/service/${service._id}`)}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: { xs: 230, sm: 260, md: 280 }, // consistent height
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow:
                    theme === "dark"
                      ? "0 8px 24px rgba(255,255,255,0.1)"
                      : "0 8px 24px rgba(0,0,0,0.15)",
                },
                bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
              }}
            >
              <Box
                component="img"
                src={service.thumbnail || "/default-thumbnail.png"}
                alt={service.title}
                sx={{
                  width: "100%",
                  height: { xs: 120, sm: 140, md: 160 },
                  objectFit: "cover",
                  flexShrink: 0,
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  color: theme === "dark" ? "#f5f5f5" : "#2c2c2c",
                  fontFamily: "Poppins, sans-serif",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 1.5,
                }}
              >
                {/* ✅ Compact title on mobile */}
                <Typography
                  variant="subtitle1"
                 
                  sx={{
                    mb: { xs: 0.1, sm: 0.2 },
                    fontSize: { xs: "0.8rem", sm: "0.9rem" }, // smaller on mobile
                    lineHeight: { xs: "1rem", sm: "1.2rem" },
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  fontWeight="bold"
                  color="primary"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    lineHeight: "1rem",
                  }}
                >
                  ₹{service.price}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Services;
