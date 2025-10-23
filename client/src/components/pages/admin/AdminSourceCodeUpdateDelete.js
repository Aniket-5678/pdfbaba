import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const AdminSourceCodeUpdateDelete = () => {
  const [theme] = useTheme();
  const [sourceCodes, setSourceCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [viewLink, setViewLink] = useState(""); // ✅ added viewLink
  const [zipFile, setZipFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);

  useEffect(() => {
    fetchSourceCodes();
  }, []);

  const fetchSourceCodes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/sourcecode");
      setSourceCodes(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch source codes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this source code?")) return;
    try {
      await axios.delete(`/api/v1/sourcecode/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      toast.success("Deleted successfully!");
      fetchSourceCodes();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete source code");
    }
  };

  const handleEditOpen = (code) => {
    setSelectedCode(code);
    setTitle(code.title);
    setDescription(code.description);
    setPrice(code.price);
    setViewLink(code.viewLink || ""); // ✅ populate view link
    setOpenEdit(true);
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("viewLink", viewLink); // ✅ include viewLink
    if (zipFile) formData.append("zipFile", zipFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    multipleImages.forEach((file) => formData.append("multipleImages", file));

    try {
      await axios.put(`/api/v1/sourcecode/update/${selectedCode._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token") || "",
        },
      });
      toast.success("Updated successfully!");
      setOpenEdit(false);
      fetchSourceCodes();
      setSelectedCode(null);
      setZipFile(null);
      setThumbnail(null);
      setMultipleImages([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update source code");
    }
  };

  if (loading)
    return <Typography textAlign="center" mt={5}>Loading...</Typography>;

  if (sourceCodes.length === 0)
    return <Typography textAlign="center" mt={5}>No source codes found</Typography>;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 6,
        minHeight: "100vh",
        bgcolor: theme === "dark" ? "#121212" : "#fff",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Manage Source Codes
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
        }}
      >
        {sourceCodes.map((code) => (
          <Card
            key={code._id}
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <img
              src={code.thumbnail || "/default-thumbnail.png"}
              alt={code.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <CardContent
              sx={{
                color: theme === "dark" ? "#f5f5f5" : "#2c2c2c",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {code.title}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                {code.description}
              </Typography>
              <Typography fontWeight="bold">Price: ₹{code.price}</Typography>

              {code.viewLink && (
                <Typography
                  component="a"
                  href={code.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: "primary.main",
                    textDecoration: "underline",
                  }}
                >
                  View Project
                </Typography>
              )}

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditOpen(code)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(code._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ✅ Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Source Code</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
          <TextField
            label="View Link (Demo/GitHub URL)"
            value={viewLink}
            onChange={(e) => setViewLink(e.target.value)}
            fullWidth
          />
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setZipFile(e.target.files[0])}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setMultipleImages(Array.from(e.target.files))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSourceCodeUpdateDelete;
