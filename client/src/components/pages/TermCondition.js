import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Container, Typography, Box, Divider } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const TermCondition = () => {
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{ mt: 15, px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4 } }}
      >
        {/* HEADER */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
            color: theme === "dark" ? "white" : "black",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Terms and Conditions
        </Typography>

        <Typography
          variant="body1"
          paragraph
          align="center"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            color: theme === "dark" ? "white" : "black",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Last updated: October 2025
        </Typography>

        {/* 1. Acceptance */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            By accessing or using the PDF Baba website (https://pdf-baba.com),
            you agree to comply with and be bound by these Terms and Conditions.
            If you do not agree, please discontinue the use of this website.
          </Typography>
        </Box>

        {/* 2. Use of Website */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            2. Use of the Website
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            You may use our website solely for lawful purposes. You agree not to
            misuse our services or engage in activities that harm or disrupt our
            systems or other users.
          </Typography>
        </Box>

        {/* 3. Digital Products and Source Code Sales */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            3. Digital Products and Source Code Sales
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            PDF Baba provides digital educational materials and source codes for
            developers. Once payment is successful, users receive immediate
            access to download the purchased digital product.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            All digital product sales, including source codes, are final.
            <strong> No refunds, cancellations, or exchanges </strong> will be
            issued once access to the digital content has been granted.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            By purchasing source codes or digital materials, the user agrees not
            to resell, redistribute, or share the purchased content without
            written permission from PDF Baba.
          </Typography>
        </Box>

        {/* 4. Pricing and Payment */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            4. Pricing and Payment
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            All prices listed on PDF Baba are in Indian Rupees (INR) and include
            applicable taxes. Payments are processed securely through our
            payment partner, Razorpay. You must ensure that all information
            provided for payment is accurate and complete.
          </Typography>
        </Box>

        {/* 5. Refund and Cancellation Policy */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            5. Refund and Cancellation Policy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Since all our products are digital and accessible immediately upon
            payment, we do not offer refunds or cancellations under any
            circumstances. Please review product details carefully before
            purchasing.
          </Typography>
        </Box>

        {/* 6. Modifications */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            6. Modifications to the Service
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            PDF Baba reserves the right to modify, suspend, or discontinue any
            part of its services or policies at any time without prior notice.
            Users are encouraged to review these terms periodically.
          </Typography>
        </Box>

        {/* 7. Contact */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            7. Contact Information
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            For any questions regarding these Terms, please contact us at:
            <br />
            📧 pdfbaba07@gmail.com <br />
            📞 +91 8830730929<br />
            📍 Mumbai, Maharashtra, India
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Footer */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              color: theme === "dark" ? "white" : "black",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            © 2025 PDF Baba. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default TermCondition;
