import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../context/ThemeContext'; // Assuming theme context is available

const TopContentSlider = () => {
  const contentList = [
 'Explore Space Studies with Free Resources!',
    'Dive into Spiritual Insights with Free PDFs!',
    '🔥 Try our new Domain Name Suggestor – get smart ideas instantly!',
    'Get Free Notes of JavaScript!',
    'Master Python with Free PDFs!',
    'Learn ReactJS with Step-by-Step Guides!',
    'Download 100+ Question Papers for FREE!',
    'Exclusive Tips for Frontend Development!',
    'Get NodeJS and ExpressJS Resources!',
    'Learn HTML and CSS with Practical Examples!',
    'Free JavaScript Interview Preparation Notes!',
    'Download Latest JavaScript Frameworks Guides',
     ' Get Full Project Code for Just $1! (Limited Offer) '
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme] = useTheme();  // Get the current theme (dark or light)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    }, 3000); // Change content every 3 seconds

    return () => clearInterval(interval);
  }, [contentList.length]);

  return (
    <Box
      sx={{
        backgroundColor: theme === 'dark' ? 'black' : '#1E88E5',  // Dark mode uses black, light mode uses the original blue
        color: theme === 'dark' ? 'white' : 'white',  // Text remains white in both modes
        height: '40px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: theme === 'dark' ? '3px solid #333' : '3px solid #1E88E5', // Dark mode has a darker border
        width: '100vw',
        boxShadow: theme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        transition: 'all 0.3s ease',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '0.9rem', // Default size for larger screens
          fontWeight: 700,
          fontFamily: '"Poppins", sans-serif',  // Ensuring Poppins font family is applied
          textTransform: 'uppercase',
          letterSpacing: '1px',
          opacity: 0.9,
          transition: 'opacity 0.3s ease-in-out',
          textShadow: theme === 'dark' ? '0px 2px 5px rgba(255, 255, 255, 0.5)' : '0px 2px 5px rgba(0, 0, 0, 0.2)', // Light text shadow for dark mode

          // Media query for smaller screens (mobile devices)
          '@media (max-width: 600px)': {
            fontSize: '0.75rem', // Smaller font size for mobile devices
          },
        }}
      >
        {contentList[currentIndex]}
      </Typography>
    </Box>
  );
};

export default TopContentSlider;
