import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FeatureImage from '../images/featuresbanner.png';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a theme context

const Featureimage = () => {
  const [theme] = useTheme(); // Get the current theme

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },  // Ensure column-reverse on mobile devices
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        maxWidth: '1200px',
        margin: '50px auto',
        backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9', // Dark mode background color
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif', // Apply Poppins font globally
      }}
    >
      {/* Left Content Section */}
      <Box
        sx={{
          flex: 1,
          padding: '40px',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: theme === 'dark' ? 'white' : '#333', // Dark mode text color
            marginBottom: '20px',
            fontSize: { xs: '0.9rem', sm: '2rem' },
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Your Gateway to Smart Learning
        </Typography>

        {/* Content Section */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1.2rem' },
            color: theme === 'dark' ? 'white' : '#555', // Dark mode text color
            lineHeight: 1.6,
            marginBottom: '30px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          At PDF Baba, we provide a one-stop solution for students and learners. Explore an extensive collection of educational resources across various categories, all tailored for your learning needs.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            color: theme === 'dark' ? 'white' : '#555', // Dark mode text color
            lineHeight: 1.6,
            marginBottom: '20px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Our platform includes:
        </Typography>

        <Typography
          component="ul"
          sx={{
            fontSize: { xs: '0.8rem', sm: '1.1rem' },
            color: theme === 'dark' ? 'white' : '#555', // Dark mode text color
            lineHeight: 1.6,
            paddingLeft: '20px',
            marginBottom: '20px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <li>Space Notes and Exploration</li>
          <li>Spiritual Insights and Guidance</li>
          <li>Tech Notes and Latest Innovations</li>
          <li>Health Education and Wellness Resources</li>
          <li>Personal Development and Motivational PDFs</li>
        </Typography>

        {/* Link wrapped around the Button */}
        <Link to="/discover-more" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '30px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Discover More
          </Button>
        </Link>
      </Box>

      {/* Right Image Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={FeatureImage}
          alt="PDF Baba"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default Featureimage;
