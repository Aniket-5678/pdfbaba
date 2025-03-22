import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context ✅

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();
  const [theme] = useTheme(); // Get current theme ✅


    useEffect(() => {
          // Scroll to top when the component is mounted
          window.scrollTo(0, 0);
        }, []);

  useEffect(() => {
    axios.get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error("Error fetching roadmaps:", err));
  }, []);

  return (
    <Layout>
      <Container sx={{ py: 4, mt: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c", // Theme-based color ✅
            fontFamily: "'Poppins', sans-serif", // ✅ Poppins font applied
            fontSize: "1.4rem",
            marginTop: "10px"
          }}
        >
          📌 Roadmaps
        </Typography>
        <Grid container spacing={3}>
          {roadmaps.map((roadmap) => (
            <Grid 
              item 
              xs={6} sm={6} md={4} // 2 cards in mobile, 3 in desktop
              key={roadmap._id}
              onClick={() => navigate(`/roadmap/${roadmap._id}`)}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "0.3s",
                  boxShadow: theme === "dark" ? 5 : 3, // Theme-based shadow ✅
                  borderRadius: 2,
                  height: "150px", // Fixed height ✅
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: theme === "dark" ? "#1E1E1E" : "white", // Dark mode background ✅
                  color: theme === "dark" ? "#E0E0E0" : "#2c2c2c", // Text color
                  "&:hover": { 
                    transform: "scale(1.05)", 
                    boxShadow: theme === "dark" ? 8 : 6 
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center", 
                    height: "100%",
                  }}
                >
                  <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    sx={{ 
                        fontFamily: "'Poppins', sans-serif", 
                        fontSize: { xs: "1rem", sm: "1.2rem" } // ✅ 1rem for mobile, 1.25rem for larger screens
                      }}
                  >
                    {roadmap.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Roadmap;
