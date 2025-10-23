import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AdminCreateSourceCode = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [viewLink, setViewLink] = useState(""); 
  const [zipFile, setZipFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !zipFile) {
      return toast.error("Please fill all required fields and upload zip file");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
      formData.append("viewLink", viewLink); 
    formData.append("zipFile", zipFile, zipFile.name);
    if (thumbnail) formData.append("thumbnail", thumbnail, thumbnail.name);
    multipleImages.forEach((file) => formData.append("multipleImages", file, file.name));

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.post("/api/v1/sourcecode/create", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: token || "" },
      });

      toast.success("Source code created successfully!");
      setTitle(""); setDescription(""); setPrice(""); setZipFile(null);
      setThumbnail(null); setMultipleImages([]);
      setViewLink(""); 
    } catch (error) {
      console.error(error);
      toast.error("Error creating source code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 6,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Create Source Code
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title *"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price (INR) *"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
              required
            />
          </Grid>
 <Grid item xs={12} sm={6}>
            <TextField
              label="View Link (Demo/GitHub URL)"
              type="url"
              fullWidth
              value={viewLink}
              onChange={(e) => setViewLink(e.target.value)}
              variant="outlined"
              placeholder="https://example.com"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ height: "100%" }}
            >
              Upload ZIP File *
              <input
                type="file"
                accept=".zip"
                hidden
                onChange={(e) => setZipFile(e.target.files[0])}
                required
              />
            </Button>
            {zipFile && <Typography mt={1}>{zipFile.name}</Typography>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </Button>
            {thumbnail && <Typography mt={1}>{thumbnail.name}</Typography>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Multiple Images
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => setMultipleImages(Array.from(e.target.files))}
              />
            </Button>
            {multipleImages.length > 0 && (
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {multipleImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                  />
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ py: 1.8 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Source Code"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AdminCreateSourceCode;
