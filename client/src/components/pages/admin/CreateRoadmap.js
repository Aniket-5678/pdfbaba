import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography, Container } from "@mui/material";
import Layout from "../../Layout/Layout";

const CreateRoadmap = () => {
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/v1/roadmaps", { category, steps })
      .then(() => navigate("/dashboard/admin/roadmaplist"))
      .catch((err) => console.error("Error creating roadmap:", err));
  };

  return (
    <Layout>
      <Container maxWidth="sm"  >
        <Paper elevation={3} sx={{ padding: 3, marginTop: 20 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            🚀 Create Roadmap
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <TextField
              label="Steps (comma separated)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onChange={(e) => setSteps(e.target.value.split(","))}
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large">
              Create Roadmap
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateRoadmap;
