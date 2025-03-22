import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context ✅


const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme] = useTheme(); // Get current theme ✅

  useEffect(() => {
    axios.get(`/api/v1/roadmaps/${id}`)
      .then((res) => {
        setRoadmap(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching roadmap:", err.response ? err.response.data : err.message);
        setError("Failed to fetch roadmap. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>Loading...</Typography>;
  if (error) return <Typography variant="h4" textAlign="center" color="error" sx={{ mt: 5 }}>{error}</Typography>;
  if (!roadmap) return <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>No roadmap found!</Typography>;

  return (
   
      <Container maxWidth="md" sx={{ py: 5 }}>
        {/* Roadmap Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ 
            fontFamily: "'Poppins', sans-serif", 
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c" ,
            fontSize: { xs: "1.2rem", sm: "2rem" } 
          }}
        >
          {roadmap.category} Roadmap 🚀
        </Typography>

        {/* Roadmap Chart */}
        <Paper
          elevation={theme === "dark" ? 5 : 6}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: theme === "dark" ? "#1E1E1E" : "#fff", // Dark mode fix ✅
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <List>
            {roadmap.steps.map((step, index) => (
              <Box key={index} sx={{ 
                bgcolor: theme === "dark" ? "#252525" : "#f9f9f9", // Step background color ✅
                borderRadius: 2,
                mb: 1,
              }}>
                <ListItem>
                  <ListItemText
                    primary={`${index + 1}. ${step}`}
                    primaryTypographyProps={{
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                      color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
                    }}
                  />
                </ListItem>
                {index !== roadmap.steps.length - 1 && <Divider sx={{ bgcolor: theme === "dark" ? "#444" : "#ddd" }} />}
              </Box>
            ))}
          </List>
        </Paper>
      </Container>
   
  );
};

export default RoadmapDetail;
