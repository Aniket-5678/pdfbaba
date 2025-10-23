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
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { useAuth } from "../context/auth";

const SuccessPayment = () => {
  const { id } = useParams(); // order id
  const [fileReady, setFileReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) checkFileAvailability();
    else setLoading(false);
    // eslint-disable-next-line
  }, [auth]);

  const checkFileAvailability = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/sourcecode/download/check/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      if (res.data.allowed) setFileReady(true);
      else setFileReady(false);
    } catch (err) {
      console.error("🚫 Error checking file:", err.response?.data || err.message);
      setFileReady(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/sourcecode/download/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `sourcecode-${id}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("🚫 Download failed:", err.response?.data || err.message);
      alert("Download failed. File may have expired or you do not have access.");
    } finally {
      setLoading(false);
    }
  };

  if (!auth?.token) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h6" color="error" mt={2}>
          Please login first to access this download.
        </Typography>
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
        backgroundColor: "#f4f6f8",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress color="primary" size={50} />
          <Typography variant="body1" color="textSecondary">
            Checking your download status...
          </Typography>
        </Box>
      ) : (
        <Card
          elevation={4}
          sx={{
            width: 400,
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 60, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Thank you for your purchase. Your source code is ready to download.
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {fileReady ? (
            <>
              <CardContent
                sx={{
                  backgroundColor: "#f1f5ff",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="500"
                  color="primary.main"
                >
                  sourcecode-{id}.zip
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudDownloadIcon />}
                  onClick={handleDownload}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  Download Now
                </Button>
              </CardActions>
            </>
          ) : (
            <Typography color="error" mt={1}>
              ❌ File not available or expired.
            </Typography>
          )}
        </Card>
      )}
    </Box>
  );
};

export default SuccessPayment;
