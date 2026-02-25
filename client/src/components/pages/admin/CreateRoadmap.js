import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
  Grid,
  MenuItem
} from "@mui/material";
import Layout from "../../Layout/Layout";

const CreateRoadmap = () => {

  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [level, setLevel] = useState("beginner");
  const [description, setDescription] = useState("");

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [jsonInput, setJsonInput] = useState("");

  const [connection, setConnection] = useState({
    source: "",
    target: ""
  });

  /* -------- Parse JSON from textbox -------- */
  const handleParseJson = () => {
    try {
      const data = JSON.parse(jsonInput);

      setCategory(data.category || "");
      setSlug(data.slug || "");
      setLevel(data.level || "beginner");
      setDescription(data.description || "");

      const fixedNodes = (data.nodes || []).map((n, i) => ({
        ...n,
        position: n.position || { x: i * 250, y: 0 }
      }));

      setNodes(fixedNodes);
      setEdges(data.edges || []);

      alert("JSON Applied Successfully 🚀");
    } catch (error) {
      alert("Invalid JSON ❌");
    }
  };

  /* -------- Add Node -------- */
  const addNode = () => {
    const id = `node-${Date.now()}`;

    setNodes(prev => [
      ...prev,
      {
        id,
        title: "",
        description: "",
        type: "normal",
        position: { x: prev.length * 220, y: 0 }
      }
    ]);
  };

  /* -------- Update Node -------- */
  const updateNode = (index, field, value) => {
    const updated = [...nodes];
    updated[index][field] = value;
    setNodes(updated);
  };

  /* -------- Connect Nodes -------- */
  const connectNodes = () => {
    if (!connection.source || !connection.target) return;

    setEdges(prev => [...prev, { source: connection.source, target: connection.target }]);
    setConnection({ source: "", target: "" });
  };

  /* -------- Submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(nodes.length === 0) return alert("Add at least 1 node");

    try {
      await axios.post("/api/v1/roadmaps", {
        category,
        slug,
        level,
        description,
        nodes,
        edges
      });

      navigate("/dashboard/admin/roadmaplist");

    } catch (err) {
      console.error(err);
      alert("Error saving roadmap");
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 12 }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            🚀 Create Professional Roadmap
          </Typography>

          {/* JSON PASTE BOX */}
          <Box mb={4}>
            <Typography variant="h6" mb={1}>Paste Roadmap JSON</Typography>
            <TextField
              fullWidth
              multiline
              minRows={8}
              placeholder="Paste JSON here..."
              value={jsonInput}
              onChange={(e)=>setJsonInput(e.target.value)}
            />
            <Button variant="contained" sx={{mt:2}} onClick={handleParseJson}>
              Apply JSON
            </Button>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>

            {/* BASIC INFO */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Category" value={category} onChange={(e)=>setCategory(e.target.value)} required/>
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Slug (web-development)" value={slug} onChange={(e)=>setSlug(e.target.value)} required/>
              </Grid>

              <Grid item xs={12}>
                <TextField select fullWidth label="Level" value={level} onChange={(e)=>setLevel(e.target.value)}>
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
              </Grid>
            </Grid>

            {/* NODES */}
            <Typography variant="h5" mt={4}>Nodes</Typography>

            {nodes.map((node, i)=>(
              <Paper key={node.id} sx={{p:2, mt:2}}>
                <TextField
                  fullWidth
                  label="Title"
                  value={node.title}
                  onChange={(e)=>updateNode(i,"title",e.target.value)}
                  sx={{mb:2}}
                />

                <TextField
                  fullWidth
                  label="Description"
                  value={node.description}
                  onChange={(e)=>updateNode(i,"description",e.target.value)}
                  sx={{mb:2}}
                />

                <TextField
                  select
                  fullWidth
                  label="Type"
                  value={node.type}
                  onChange={(e)=>updateNode(i,"type",e.target.value)}
                >
                  <MenuItem value="start">Start</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="optional">Optional</MenuItem>
                </TextField>
              </Paper>
            ))}

            <Button variant="outlined" sx={{mt:2}} onClick={addNode}>
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
                onChange={(e)=>setConnection({...connection, source:e.target.value})}
              >
                {nodes.map(n=>(
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
                onChange={(e)=>setConnection({...connection, target:e.target.value})}
              >
                {nodes.map(n=>(
                  <MenuItem key={n.id} value={n.id}>
                    {n.title || n.id}
                  </MenuItem>
                ))}
              </TextField>

              <Button variant="contained" onClick={connectNodes}>
                Connect
              </Button>
            </Box>

            {edges.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle1">Connections:</Typography>
                {edges.map((e,i)=>(
                  <Typography key={i}>
                    {e.source} → {e.target}
                  </Typography>
                ))}
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{mt:5}}
              fullWidth
            >
              Save Roadmap
            </Button>

          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateRoadmap;