import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  CircularProgress
} from "@mui/material";
import Layout from "../../Layout/Layout";

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);

  /* -------- FETCH ROADMAPS -------- */
  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/roadmaps");
      setRoadmaps(res.data);
    } catch (err) {
      console.error("Error fetching roadmaps:", err);
      alert("Failed to fetch roadmaps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  /* -------- DELETE ROADMAP -------- */
  const deleteRoadmap = async (id) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?")) return;

    try {
      await axios.delete(`/api/v1/roadmaps/${id}`);
      setRoadmaps(prev => prev.filter(r => r._id !== id));
      alert("Roadmap deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete roadmap.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 18, mb: 6 }}>

        {/* PAGE TITLE */}
        <Typography variant="h4" align="center" gutterBottom>
          📊 Roadmap Manager
        </Typography>

        {/* CREATE BUTTON */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard/admin/createroadmap"
          >
            + Create New Roadmap
          </Button>
        </Box>

        {/* LOADING */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {/* NO ROADMAPS */}
        {!loading && roadmaps.length === 0 && (
          <Typography variant="h6" align="center" color="text.secondary" mt={4}>
            No roadmaps found. Create your first roadmap!
          </Typography>
        )}

        {/* ROADMAP CARDS */}
        <Grid container spacing={3}>
          {roadmaps.map((roadmap) => (
            <Grid item xs={12} sm={6} md={4} key={roadmap._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                
                <CardContent>

                  {/* CATEGORY */}
                  <Typography variant="h6" gutterBottom>
                    {roadmap.category}
                  </Typography>

                  {/* LEVEL */}
                  <Chip
                    label={roadmap.level}
                    color={
                      roadmap.level === "beginner"
                        ? "success"
                        : roadmap.level === "intermediate"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  {/* DESCRIPTION */}
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
                    {roadmap.description || "No description available."}
                  </Typography>

                  {/* STATS */}
                  <Box mt={2}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label={`Topics: ${roadmap.nodes?.length || 0}`} />
                      <Chip label={`Connections: ${roadmap.edges?.length || 0}`} />
                    </Stack>
                  </Box>

                </CardContent>

                {/* ACTION BUTTONS */}
                <Box p={2} display="flex" justifyContent="space-between">

                  <Button
                    variant="contained"
                    color="info"
                    component={Link}
                    to={`/roadmap/${roadmap.slug}`}
                  >
                    Open
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/dashboard/admin/update/${roadmap._id}`}
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteRoadmap(roadmap._id)}
                  >
                    Delete
                  </Button>

                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default RoadmapList;