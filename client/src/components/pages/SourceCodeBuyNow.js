import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/auth";

const SourceCodeBuyNow = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/${id}`);
      setService(res.data.service || res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!auth.user) {
      alert("Please login first.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/v1/sourcecode/buy",
        { sourceCodeId: id },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }

      const options = {
        key: "rzp_live_RZGTtRmXVsMddp",
        amount: data.amount,
        currency: data.currency,
        name: service.title,
        // ✅ FIX: Use only title (or short text) to avoid 255-char limit
        description:
          service.title.length > 100
            ? service.title.slice(0, 100) + "..."
            : service.title,
        image: service.thumbnail,
        order_id: data.orderId,
        prefill: {
          name: auth.user?.name,
          email: auth.user?.email,
        },
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "/api/v1/sourcecode/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                sourceCodeId: id,
                amount: data.amount / 100,
              },
              { headers: { Authorization: `Bearer ${auth.token}` } }
            );

            const downloadToken = verifyRes.data.order._id;
            alert("✅ Payment successful! Redirecting to download page...");
            window.location.href = `/success/${downloadToken}`;
          } catch (verifyErr) {
            console.error(
              "Verification failed:",
              verifyErr.response?.data || verifyErr.message
            );
            alert("Payment verification failed. Please contact support.");
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Buy request failed:", err.response?.data || err.message);
      alert("Payment failed. Check console for details.");
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!service)
    return (
      <Typography variant="h6" align="center" mt={10}>
        Source code not found.
      </Typography>
    );

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#f9fafc",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          px: 2,
          mt: 10,
        }}
      >
        <Card
          sx={{
            maxWidth: 1000,
            width: "100%",
            borderRadius: 4,
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Side: Preview Images */}
          <Box sx={{ flex: 1, bgcolor: "#fff" }}>
            <CardMedia
              component="img"
              image={service.thumbnail || "/placeholder.png"}
              alt={service.title}
              sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderBottom: { xs: "1px solid #eee", md: "none" },
              }}
            />
            {service.multipleImages?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  p: 2,
                  overflowX: "auto",
                  bgcolor: "#fafafa",
                }}
              >
                {service.multipleImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Screenshot ${i}`}
                    style={{
                      width: "80px",
                      height: "60px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Right Side: Purchase Info */}
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 4,
              bgcolor: "#fff",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#111",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  lineHeight: 1.3,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  lineHeight: 1.6,
                  mb: 3,
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                }}
              >
                {service.description}
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
              >
                ₹{service.price}
              </Typography>
              <Typography sx={{ color: "#777", mb: 3 }}>
                One-time payment • Instant download access
              </Typography>

              <Button
                variant="contained"
                onClick={handlePayment}
                sx={{
                  py: 1.5,
                  fontSize: "0.9rem",
                  background: "#1976d2",
                  borderRadius: 2,
                  "&:hover": { background: "#0d47a1" },
                }}
                fullWidth
              >
                Pay Now & Get Source Code
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{ color: "#555", fontWeight: 600, mb: 1 }}
              >
                What You’ll Get:
              </Typography>
              <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                ✅ Complete source code (.zip) <br />
                ✅ Setup instructions <br />
                ✅ Ready-to-use project files <br />✅ Lifetime access after
                purchase
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default SourceCodeBuyNow;
