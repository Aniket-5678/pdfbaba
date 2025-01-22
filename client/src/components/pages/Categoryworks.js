import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Categoryworks = () => {
  const [categories, setCategories] = useState([]);
  const [theme] = useTheme();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/get-category');
        console.log("Category Data: ", data); // Debugging
        setCategories(data.category); // Correctly set category array
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <Box 
      sx={{
        padding: { xs: '10px', sm: '20px' },
        background: theme === 'dark' ? '#1a1a1a' : '#f9fcfc', 
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
       
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ marginBottom: '20px',  color: theme === 'dark' ? '#fff' : '#333', fontSize: {xs: '1.1rem'} }}
      >
        Explore Categories
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={6} sm={6} md={4} key={category._id}>
            <Link to={`/category/${category.slug}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: theme === 'dark' ? '0px 4px 10px rgba(255, 255, 255, 0.1)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  height: 'auto',  // Allow content to flow normally
                  maxHeight: '350px', // Limit card height
                  overflow: 'hidden', // Hide overflow content to prevent expansion
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between', // Ensures button stays at the bottom
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: theme === 'dark' ? '0px 8px 20px rgba(255, 255, 255, 0.15)' : '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{
                    color: theme === 'dark' ? '#fff' : '#333', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1.5rem' }, 
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme === 'dark' ? '#bbb' : '#777', 
                    marginTop: '8px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', // Prevent overflow
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2 // Limit text lines to 2
                  }}
                >
                  {category.description || 'Explore this category for more information.'}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ marginTop: '16px', backgroundColor: theme === 'dark' ? '#007bff' : '#0056b3', fontFamily: 'Poppins, sans-serif' }}
                >
                  View Details
                </Button>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: '40px' }}>
        <Typography 
          variant="h6" 
          sx={{ color: theme === 'dark' ? '#fff' : '#333' }}
        >
          Why Choose Us?
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: theme === 'dark' ? '#bbb' : '#555', marginTop: '8px', fontFamily: 'Poppins, sans-serif' }}
        >
          We offer a wide variety of categories to help you with your studies. Browse through our platform to find educational content that suits your learning needs.
        </Typography>
      </Box>

      {/* Add more sections, for example, FAQ or Features */}
      <Box sx={{ marginTop: '60px', backgroundColor: theme === 'dark' ? '#333' : '#fff', padding: '20px' }}>
        <Typography 
          variant="h6" 
          sx={{ color: theme === 'dark' ? '#fff' : '#333' ,fontFamily: 'Poppins, sans-serif' }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: theme === 'dark' ? '#bbb' : '#555', marginTop: '8px' ,fontFamily: 'Poppins, sans-serif' }}
        >
          Here, we address common questions related to our categories and platform usage. If you have more queries, feel free to reach out to our support team.
        </Typography>
      </Box>
    </Box>
  );
};

export default Categoryworks;
