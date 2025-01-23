import React,{useEffect} from 'react';
import Layout from '../Layout/Layout';
import { Container, Typography, Box, Divider } from '@mui/material';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a theme context

const TermCondition = () => {
  const [theme] = useTheme(); // Use the theme context


    useEffect(() => {
        // Scroll to top when the component is mounted
        window.scrollTo(0, 0);
      }, []);

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 10, px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            color: theme === 'dark' ? 'white' : 'black', // Conditional text color
            fontFamily: 'Poppins, sans-serif', // Apply Poppins font
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          variant="body1"
          paragraph
          align="center"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            color: theme === 'dark' ? 'white' : 'black', // Conditional text color
            fontFamily: 'Poppins, sans-serif', // Apply Poppins font
          }}
        >
          Last updated: January 2025
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            By accessing or using the PDF-Baba website, you agree to comply with and be bound by these Terms and Conditions.
            If you do not agree to these terms, you must not use the website.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            2. Use of the Website
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            You may use our website solely for lawful purposes. You may not use our website for any illegal activity or to violate
            the rights of others.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            3. Content Ownership
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            All content on the PDF-Baba website, including but not limited to text, images, logos, and documents, is the property of PDF-Baba
            or its respective owners and is protected by copyright law.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            4. Liability Disclaimer
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            PDF-Baba is not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of our website
            or the content available on it.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            5. Modifications
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            PDF-Baba reserves the right to modify or update these Terms and Conditions at any time. Please review this page periodically
            for changes.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' },
              color: theme === 'dark' ? 'white' : 'black', // Conditional text color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
          >
            © 2025 PDF-Baba. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default TermCondition;
