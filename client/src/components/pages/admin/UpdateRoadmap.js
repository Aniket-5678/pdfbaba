import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import Layout from "../../Layout/Layout";

const UpdateRoadmap = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/v1/roadmaps/${id}`)
      .then((res) => {
        setCategory(res.data.category);
        setSteps(res.data.steps);
      })
      .catch((err) => console.error("Error fetching roadmap:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/roadmaps/${id}`, { category, steps })
      .then(() => navigate("/roadmaplist"))
      .catch((err) => console.error("Error updating roadmap:", err));
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, mt: 20 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Update Roadmap
          </Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <TextField
              label="Steps (comma separated)"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={steps.join(",")}
              onChange={(e) => setSteps(e.target.value.split(","))}
              required
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Update Roadmap
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default UpdateRoadmap;
