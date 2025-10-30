import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import SmallBannerAd from "./SmallBannerAd";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 6;

const ServiceList = () => {
  const [theme] = useTheme();
  const [page, setPage] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const gridRef = useRef(null);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
          pt: 6,
          minHeight: "100vh",
          bgcolor: theme === "dark" ? "#0f0f0f" : "#f9f9f9",
          mt: 10,
        }}
      >
        {/* Header Section */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          fontSize={"1.1rem"}
          mb={1.5}
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: theme === "dark" ? "#fff" : "#222",
          }}
        >
          📂 Professional Source Code Projects
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{
            mb: 4,
            color: theme === "dark" ? "#bbb" : "#555",
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.9rem",
          }}
        >
          Explore high-quality, ready-to-use website and app source codes.
        </Typography>

        {/* Banner Ad */}
        <Box display="flex" justifyContent="center" mb={3}>
          <SmallBannerAd />
        </Box>

        {/* Cards Grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          ref={gridRef}
          sx={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : paginatedServices.length === 0 ? (
            <Typography
              textAlign="center"
              sx={{
                mt: 8,
                fontSize: "1.2rem",
                color: theme === "dark" ? "#aaa" : "#444",
              }}
            >
              No source code projects available right now.
            </Typography>
          ) : (
            paginatedServices.map((service) => (
              <Grid item xs={6} sm={6} md={4} key={service._id}>
                <Card
                  onClick={() => navigate(`/service/${service._id}`)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    background:
                      theme === "dark"
                        ? "linear-gradient(145deg, #1a1a1a, #222)"
                        : "#fff",
                    boxShadow:
                      theme === "dark"
                        ? "0 6px 18px rgba(255,255,255,0.08)"
                        : "0 6px 18px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow:
                        theme === "dark"
                          ? "0 10px 25px rgba(255,255,255,0.15)"
                          : "0 10px 25px rgba(0,0,0,0.15)",
                    },
                    cursor: "pointer",
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={
                      service.thumbnail
                        ? service.thumbnail
                        : "/default-thumbnail.png"
                    }
                    alt={service.title}
                    sx={{
                      width: "100%",
                      height: { xs: 140, sm: 160, md: 180 },
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  {/* Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      fontFamily: "Poppins, sans-serif",
                      color: theme === "dark" ? "#eee" : "#2c2c2c",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: { xs: 1.5, sm: 2 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="200"
                      sx={{
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        lineHeight: 1.2,
                        textAlign: "center",
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: theme === "dark" ? "#00e676" : "#007bff",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        textAlign: "center",
                      }}
                    >
                      ₹{service.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={5} mb={6}>
          <Pagination
            count={Math.ceil(services.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default ServiceList;
