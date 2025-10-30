import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress, Paper } from "@mui/material";
import { useAuth } from "../context/auth";
import Layout from "../Layout/Layout";

const SourceCodeOrder = () => {
  const [auth] = useAuth(); // Auth context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const [downloadingId, setDownloadingId] = useState(null);
  // Fetch user orders

     useEffect(() => {
          // Scroll to top when the component is mounted
          window.scrollTo(0, 0);
        }, []);
  
 useEffect(() => {
  const fetchOrders = async () => {
    console.log("🔍 Checking auth context:", auth);

    if (!auth?.token) {
      console.warn("⛔ No token available — skipping fetchOrders()");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("📡 Fetching orders with token:", auth.token);

      const res = await axios.get(`/api/v1/sourcecode/my-orders`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      console.log("✅ API Response:", res.data);

      if (res.data.success) {
        const now = new Date();
        const updatedOrders = res.data.orders.map((order) => {
          const createdAt = new Date(order.createdAt);
          const diffHours = (now - createdAt) / (1000 * 60 * 60);
          return { ...order, isExpired: diffHours > 24 };
        });

        console.log("📦 Updated orders:", updatedOrders);
        setOrders(updatedOrders);
      } else {
        console.warn("⚠️ Orders fetch unsuccessful:", res.data.message);
      }
    } catch (err) {
      console.error("❌ Error fetching orders:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [auth?.token]);

  // Download ZIP file (only if not expired)
 const handleDownload = async (orderId) => {
  setDownloadingId(orderId); // start spinner
  try {
    const res = await axios.get(`/api/v1/sourcecode/download/${orderId}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sourcecode-${orderId}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err.response?.data || err.message);
    alert("File not available or expired.");
  } finally {
    setDownloadingId(null); // stop spinner
  }
};


  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  const activeOrders = orders.filter((o) => !o.isExpired);
  const expiredOrders = orders.filter((o) => o.isExpired);

  return (
    <Layout>
      <Box sx={{ padding: "30px", maxWidth: "900px",margin: "auto", mt: 15}}>
        <Typography variant="h4" gutterBottom fontSize={"1.1rem"}>
          Your Purchased Source Codes
        </Typography>

        {orders.length === 0 && (
          <Typography sx={{ marginBottom: "20px"}  }>
            No purchases found.
          </Typography>
        )}

        {/* Active orders */}
        {activeOrders.map((order) => (
          <Paper
            key={order._id}
            sx={{
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              boxShadow: 2,
            }}
          >
            <Typography variant="h6">{order.title}</Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              Price: ₹{order.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Purchased: {new Date(order.createdAt).toLocaleString()}
            </Typography>

         <Button
  variant="contained"
  color="primary"
  sx={{ marginTop: "10px", minWidth: "130px" }}
  onClick={() => handleDownload(order._id)}
  disabled={downloadingId === order._id}
>
  {downloadingId === order._id ? (
    <>
      <CircularProgress
        size={22}
        sx={{ color: "white", marginRight: "8px" }}
      />
      Downloading...
    </>
  ) : (
    "Download ZIP"
  )}
</Button>

          </Paper>
        ))}

        {/* Expired orders */}
        {expiredOrders.length > 0 && (
          <Box sx={{ marginTop: "30px" }}>
            <Typography variant="h6" color="error" gutterBottom>
              Expired Downloads (older than 24 hours)
            </Typography>
            {expiredOrders.map((order) => (
              <Paper
                key={order._id}
                sx={{
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#fce4e4",
                }}
              >
                <Typography variant="h6">{order.title}</Typography>
                <Typography variant="body2" color="error" sx={{ marginTop: "5px" }}>
                  ❌ File expired — available only within 24 hours after purchase.
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default SourceCodeOrder;
