import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  LinearProgress,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { useAuth } from "../context/auth";

const SuccessPayment = () => {
  const { id } = useParams();
  const [fileReady, setFileReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
      console.log("🔐 AUTH =>", auth); // <-- CHECK TOKEN + USER ID
  console.log("🆔 ORDER ID FROM URL =>", id);
    if (auth?.token) {
      checkFileAvailability();
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [auth]);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/my-orders`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const order = res.data.orders.find((o) => o._id === id);
      setOrderDetails(order || null);
    } catch (err) {
      console.error("❌ Could not fetch order details:", err);
    }
  };

  const checkFileAvailability = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/download/check/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setFileReady(res.data.allowed);
    } catch {
      setFileReady(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await axios.get(`/api/v1/sourcecode/download/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
        responseType: "blob",
        onDownloadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setDownloadProgress(percent);
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${orderDetails?.title || "sourcecode"}-${id}.zip`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (!auth?.token) {
    return (
      <Box textAlign="center" mt={10}>
        <ErrorIcon color="error" sx={{ fontSize: 60 }} />
        <Typography>Please login first.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {loading ? (
        <Box textAlign="center">
          <CircularProgress size={50} />
          <Typography mt={2} fontWeight={500} color="text.secondary">
            Verifying your payment...
          </Typography>
        </Box>
      ) : (
        <Card
          sx={{
            width: 440,
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 65, mb: 1 }} />

          <Typography variant="h5" fontWeight="700" gutterBottom>
            Payment Successful 🎉
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={2}>
            Your file is ready for download.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {fileReady ? (
            <>
              <CardContent
                sx={{
                  backgroundColor: "#e9f3ff",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  border: "1px solid #d0e4ff",
                }}
              >
                <Typography variant="body1" fontWeight="600" color="primary.main">
                  {orderDetails?.title || "sourcecode"}-{id}.zip
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ~ 1–50 MB File • ZIP Format
                </Typography>
              </CardContent>

              {downloading ? (
                <Box sx={{ width: "100%", textAlign: "center", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Downloading... <strong>{downloadProgress}%</strong>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={downloadProgress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                </Box>
              ) : (
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleDownload}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                    }}
                  >
                    Download File
                  </Button>
                </CardActions>
              )}
            </>
          ) : (
            <Typography color="error" mt={1} fontWeight={600}>
              ❌ Download link expired or unavailable.
            </Typography>
          )}
        </Card>
      )}
    </Box>
  );
};

export default SuccessPayment;
