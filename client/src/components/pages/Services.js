import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "45%",
          zIndex: 10,
          bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          "&:hover": { bgcolor: theme === "dark" ? "#333" : "#e0e0e0" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          left: 0,
          top: "45%",
          zIndex: 10,
          bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          "&:hover": { bgcolor: theme === "dark" ? "#333" : "#e0e0e0" },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
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

  // ✅ Helper for short description
  const getShortDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 6,
        bgcolor: theme === "dark" ? "#121212" : "#fff",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        fontSize="1.1rem"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Website Projects
      </Typography>

      {services.length > 1 ? (
        <Slider {...sliderSettings}>
          {services.map((service) => (
            <Box key={service._id} px={1}>
              <Card
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                onClick={() => navigate(`/service/${service._id}`)}
              >
                <img
                  src={service.thumbnail || "/default-thumbnail.png"}
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
                  <Typography variant="subtitle1"  fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {getShortDescription(service.description, 90)}
                  </Typography>
                  <Typography fontWeight="bold">
                    Price: ₹{service.price}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      ) : (
        <Box display="flex" justifyContent="center">
          {services.map((service) => (
            <Card
              key={service._id}
              sx={{
                maxWidth: 300,
                cursor: "pointer",
                borderRadius: 3,
                backdropFilter: "blur(10px)",
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => navigate(`/service/${service._id}`)}
            >
              <img
                src={service.thumbnail || "/default-thumbnail.png"}
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
                <Typography variant="subtitle1" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {getShortDescription(service.description, 90)}
                </Typography>
                <Typography fontWeight="bold">
                  Price: ₹{service.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Services;
