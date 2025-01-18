import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import arrows from react-icons

import earthImagefirst from "../images/earth1.png"
import earthImagetwo from "../images/earth2.png"
import earthImagethird from "../images/earth3.png"
import earthImagefourth from "../images/earth4.png"
import earthImagefifth from "../images/earth5.png"
import earthImagesixth from "../images/earth6.png"
import earthImageseven from "../images/earth7.png"
import { useTheme } from '../context/ThemeContext'; // Assuming you have a context to manage theme

const PdfFormat = () => {
  const images = [
    earthImagefirst,
    earthImagetwo,
    earthImagethird,
    earthImagefourth,
    earthImagefifth,
    earthImagesixth,
    earthImageseven,
 
  ];
  
  const [theme] = useTheme(); // Use the theme context to get the current theme

  // Custom Arrows
  const CustomPrevArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '-40px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': { backgroundColor: '#e0e0e0' },
        fontSize: '24px', // Arrow size
      }}
    >
      <AiOutlineLeft />
    </IconButton>
  );

  const CustomNextArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '-40px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': { backgroundColor: '#e0e0e0' },
        fontSize: '24px', // Arrow size
      }}
    >
      <AiOutlineRight />
    </IconButton>
  );

  const sliderSettings = {
    dots: false, // Remove dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: theme === 'dark' ? '#121212' : '#ffffff', // Dark or light background
        color: theme === 'dark' ? '#f5f5f5' : '#333', // Adjust text color
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Responsive for small screens
        alignItems: 'center',
        position: 'relative', // Ensure arrows stay on top of the content
        fontFamily: "'Poppins', sans-serif", // Poppins font-family
      }}
    >
      {/* Slider Section */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', sm: '50%' },
          width: { xs: '300px', sm: 'auto' },
          position: 'relative',
          marginBottom: { xs: '1rem', sm: '0' },
          '.slick-dots': {
            bottom: '-20px', // Ensure dots stay below the slider
            position: 'absolute',
          },
          '.slick-dots li button:before': {
            fontSize: '12px', // Adjust dot size
            color: theme === 'dark' ? '#f5f5f5' : '#555', // Dot color
          },
          '.slick-dots li.slick-active button:before': {
            color: theme === 'dark' ? '#fff' : '#000', // Active dot color
          },
        }}
      >
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={image}
                alt={`PDF sample ${index + 1}`}
                style={{
                  width: '80%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', sm: '50%' },
          textAlign: { xs: 'center', sm: 'left' },
          marginTop: { xs: '1rem', sm: '0' },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.8rem' },
            fontWeight: '600',
            color: theme === 'dark' ? '#f5f5f5' : '#333',
            marginBottom: '1rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Elevate Your Learning with PDF Notes
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            color: theme === 'dark' ? '#e0e0e0' : '#555',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Enhance your learning experience with PDF notes—structured for clarity and easy navigation. Whether you're reviewing course materials or accessing practice papers, PDFs provide a versatile and efficient format. Browse through the slider to explore different formats and how they can help organize your study sessions.
        </Typography>
      </Box>
    </Box>
  );
};

export default PdfFormat;
