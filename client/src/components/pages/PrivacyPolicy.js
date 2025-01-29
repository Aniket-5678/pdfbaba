import React,{useEffect} from 'react';
import Layout from '../Layout/Layout';
import { Container, Typography, Box, Divider } from '@mui/material';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a theme context

const PrivacyPolicy = () => {
  const [theme] = useTheme(); // Use the theme context


    useEffect(() => {
      // Scroll to top when the component is mounted
      window.scrollTo(0, 0);
    }, []);
  

  

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 15, px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4 } }}>
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
          Privacy Policy
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
            1. Information We Collect
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
            We collect personal and non-personal information that helps us provide a better user experience.
            This includes information such as your name, email address, device information, and usage data.
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
            2. How We Use Your Information
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
            We use your information to personalize content, analyze usage patterns, and improve our website and services.
            We may also use your information to communicate with you regarding updates, offers, or promotions.
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
            3. Cookies
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
            Our website uses cookies to enhance user experience, analyze site usage, and for advertising purposes.
            You can control cookie settings through your browser settings.
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
            4. Third-Party Services
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
            We may use third-party services like Google Analytics and AdSense to collect and process information.
            These third parties have their own privacy policies, which we recommend reviewing.
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
            5. Your Consent
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
            By using our website, you consent to our privacy policy and agree to our terms and conditions.
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

export default PrivacyPolicy;
