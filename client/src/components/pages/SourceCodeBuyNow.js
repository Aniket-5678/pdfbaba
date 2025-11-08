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
import toast from "react-hot-toast";

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
        theme: {
          color: "#1976d2",
        },


  redirect: true, // ✅ Fix redirect glitch

  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: false,
  },

  config: {
    display: {
      sequence: ["upi", "card", "netbanking"],
      blocks: {
        upi: {
          name: "Pay Using UPI",
          instruments: [
            {
              method: "upi",
              flows: ["intent"], // ✅ No permission popup → smooth redirect
            },
          ],
        },
      },
    },
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

            const downloadToken = verifyRes.data.orderId; 
           toast.success("✅ Payment successful! Redirecting to download...");

            window.location.href = `/success/${downloadToken}`;
          } catch (verifyErr) {
            console.error(
              "Verification failed:",
              verifyErr.response?.data || verifyErr.message
            );
            toast.error("❌ Payment verification failed. Please contact support.");
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
          backgroundColor: "#f5f7fa",
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
            maxWidth: 1100,
            width: "100%",
            borderRadius: 4,
            boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            bgcolor: "#fff",
          }}
        >
          {/* Left Side - Image Gallery */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fafafa",
            }}
          >
            <CardMedia
              component="img"
              image={service.thumbnail || "/placeholder.png"}
              alt={service.title}
              sx={{
                width: "100%",
                height: { xs: 250, sm: 300, md: 400 },
                objectFit: "cover",
                borderBottom: { xs: "1px solid #eee", md: "none" },
              }}
            />

            {service.multipleImages?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  p: 2,
                  overflowX: "auto",
                  justifyContent: { xs: "flex-start", md: "center" },
                  bgcolor: "#f9f9f9",
                }}
              >
                {service.multipleImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Screenshot ${i}`}
                    style={{
                      width: "90px",
                      height: "70px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Right Side - Details */}
          <CardContent
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  fontFamily: "Poppins, sans-serif",
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
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {service.description}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  mb: 1,
                  fontFamily: "Poppins, sans-serif",
                }}
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
                  py: 1.4,
                  fontSize: "0.95rem",
                  background: "#1976d2",
                  borderRadius: 2,
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": { background: "#0d47a1" },
                }}
                fullWidth
              >
                💳 Pay Now & Get Source Code
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#555",
                  fontWeight: 600,
                  mb: 1,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                What You’ll Get:
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.9rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                ✅ Complete source code (.zip) <br />
                ✅ Setup instructions <br />
                ✅ Ready-to-use project files <br />
                ✅ Lifetime access after purchase<br />
                🚫 No refunds after purchase (digital product)
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default SourceCodeBuyNow;
