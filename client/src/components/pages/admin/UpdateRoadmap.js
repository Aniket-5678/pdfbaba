import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  MenuItem
} from "@mui/material";
import Layout from "../../Layout/Layout";

const UpdateRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Basic info
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [level, setLevel] = useState("beginner");
  const [description, setDescription] = useState("");

  // Nodes & edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Node connection
  const [connection, setConnection] = useState({ source: "", target: "" });

  /* -------- FETCH ROADMAP -------- */
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get(`/api/v1/roadmaps/${id}`);
        const data = res.data;

        setCategory(data.category || "");
        setSlug(data.slug || "");
        setLevel(data.level || "beginner");
        setDescription(data.description || "");

        // Ensure nodes have positions
        const fixedNodes = (data.nodes || []).map((n, i) => ({
          ...n,
          position: n.position || { x: i * 250, y: 0 }
        }));

        setNodes(fixedNodes);
        setEdges(data.edges || []);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        alert("Failed to fetch roadmap.");
      }
    };

    fetchRoadmap();
  }, [id]);

  /* -------- ADD NODE -------- */
  const addNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      title: "",
      description: "",
      type: "normal",
      position: { x: nodes.length * 220, y: 0 }
    };
    setNodes([...nodes, newNode]);
  };

  /* -------- UPDATE NODE -------- */
  const updateNode = (index, field, value) => {
    const updated = [...nodes];
    updated[index][field] = value;
    setNodes(updated);
  };

  /* -------- CONNECT NODES -------- */
  const connectNodes = () => {
    if (!connection.source || !connection.target) return;
    setEdges([...edges, { source: connection.source, target: connection.target }]);
    setConnection({ source: "", target: "" });
  };

  /* -------- SUBMIT UPDATE -------- */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (nodes.length === 0) return alert("Add at least one node");

    try {
      await axios.put(`/api/v1/roadmaps/${id}`, {
        category,
        slug,
        level,
        description,
        nodes,
        edges
      });
      alert("Roadmap updated successfully!");
      navigate("/dashboard/admin/roadmaplist");
    } catch (err) {
      console.error("Error updating roadmap:", err);
      alert("Failed to update roadmap.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, mt: 12 }}>
          <Typography variant="h4" align="center" mb={3}>
            🚀 Update Roadmap
          </Typography>

          <Box component="form" onSubmit={handleUpdate}>

            {/* BASIC INFO */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Slug (web-development)"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* NODES */}
            <Typography variant="h5" mt={4}>Nodes</Typography>
            {nodes.map((node, i) => (
              <Paper key={node.id} sx={{ p: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={node.title}
                  onChange={(e) => updateNode(i, "title", e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={node.description}
                  onChange={(e) => updateNode(i, "description", e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Type"
                  value={node.type}
                  onChange={(e) => updateNode(i, "type", e.target.value)}
                >
                  <MenuItem value="start">Start</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="optional">Optional</MenuItem>
                </TextField>
              </Paper>
            ))}

            <Button variant="outlined" sx={{ mt: 2 }} onClick={addNode}>
              + Add Node
            </Button>

            {/* CONNECT NODES */}
            <Typography variant="h5" mt={5}>Connect Nodes</Typography>
            <Box display="flex" gap={2} mt={2}>
              <TextField
                select
                label="Source"
                fullWidth
                value={connection.source}
                onChange={(e) => setConnection({ ...connection, source: e.target.value })}
              >
                {nodes.map(n => (
                  <MenuItem key={n.id} value={n.id}>
                    {n.title || n.id}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Target"
                fullWidth
                value={connection.target}
                onChange={(e) => setConnection({ ...connection, target: e.target.value })}
              >
                {nodes.map(n => (
                  <MenuItem key={n.id} value={n.id}>
                    {n.title || n.id}
                  </MenuItem>
                ))}
              </TextField>

              <Button variant="contained" onClick={connectNodes}>
                Connect
              </Button>
            </Box>

            {/* CONNECTIONS DISPLAY */}
            {edges.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle1">Connections:</Typography>
                {edges.map((e, i) => (
                  <Typography key={i}>
                    {e.source} → {e.target}
                  </Typography>
                ))}
              </Box>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 5 }}
              fullWidth
            >
              Update Roadmap
            </Button>

          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default UpdateRoadmap;