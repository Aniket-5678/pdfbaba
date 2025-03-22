import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button, Box, List, ListItem } from "@mui/material";
import Layout from "../../Layout/Layout";

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const deleteRoadmap = (id) => {
    axios.delete(`/api/v1/roadmaps/${id}`)
      .then(() => setRoadmaps(roadmaps.filter((roadmap) => roadmap._id !== id)))
      .catch((err) => console.error("Error deleting:", err));
  };

  return (
    <Layout>
    <Container maxWidth="md" sx={{ mt: 20}}>
      <Typography variant="h4" align="center" gutterBottom>
        Roadmaps
      </Typography>
      
      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" color="primary" component={Link} to="/dashboard/admin/createroadmap">
          Create Roadmap
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roadmaps.map((roadmap) => (
          <Grid item xs={12} sm={6} md={4} key={roadmap._id}>
            <Card sx={{ minHeight: 300, display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {roadmap.category}
                </Typography>
                
                {/* Scrollable List for Steps */}
                <Box sx={{ maxHeight: 150, overflowY: "auto", bgcolor: "#f9f9f9", p: 1, borderRadius: 1 }}>
                  <List dense>
                    {roadmap.steps.map((step, i) => (
                      <ListItem key={i} sx={{ fontSize: "14px", lineHeight: "1.5" }}>
                        {i + 1}. {step}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Buttons Section */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => deleteRoadmap(roadmap._id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    component={Link} 
                    to={`/dashboard/admin/update/${roadmap._id}`}
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Layout>
  );
};

export default RoadmapList;
