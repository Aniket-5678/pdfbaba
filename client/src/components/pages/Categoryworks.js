import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import Layout from "../Layout/Layout";
import BannerAd from './BannerAd';
import SmallBannerAd from './SmallBannerAd';


const Categoryworks = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner state
  const [theme] = useTheme();

  useEffect(() => {
    // Scroll to top when the component is mounted
    window.scrollTo(0, 0);

    // Fetch categories
    const getAllCategories = async () => {
      try {
        setLoading(true); // Show spinner
        const { data } = await axios.get('/api/v1/category/get-category');
        console.log("Category Data: ", data); // Debugging
        setCategories(data.category); // Set category data
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Hide spinner after 2 seconds
      }
    };

    getAllCategories();
  }, []);

  return (
    <Layout>
      {/* Full Page Spinner */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ClipLoader color="#007bff" size={80} />
        </Box>
      )}

<Box marginBottom={'5px'} >
          <SmallBannerAd/>
        </Box>
      {/* Main Content */}
      <Box 
        sx={{
          padding: { xs: '10px', sm: '20px' },
          background: theme === 'dark' ? '#1a1a1a' : '#f9fcfc',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          margin: '135px 0px',
        }}
      >
     
        <Typography 
          variant="h4" 
          sx={{ marginBottom: '20px', color: theme === 'dark' ? '#fff' : '#333', fontSize: { xs: '1.1rem' } }}
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
                    boxShadow: theme === 'dark' 
                      ? '0px 4px 10px rgba(255, 255, 255, 0.1)' 
                      : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    height: 'auto',
                    maxHeight: '350px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ':hover': {
                      transform: 'scale(1.05)',
                      boxShadow: theme === 'dark' 
                        ? '0px 8px 20px rgba(255, 255, 255, 0.15)' 
                        : '0px 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{
                      color: theme === 'dark' ? '#fff' : '#333',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', sm: '1.5rem' },
                      fontFamily: 'Poppins, sans-serif',
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
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {category.description || 'Explore this category for more information.'}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      marginTop: '16px', 
                      backgroundColor: theme === 'dark' ? '#007bff' : '#0056b3', 
                      fontFamily: 'Poppins, sans-serif' 
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Additional Content After Categories */}
        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
          <Typography 
            variant="h5" 
            sx={{ color: theme === 'dark' ? '#fff' : '#333', marginBottom: '20px' }}
          >
            Why Choose Us?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: theme === 'dark' ? '#ccc' : '#555', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}
          >
            We provide the most comprehensive and up-to-date information in each category to help you achieve your goals. Our platform is designed with user experience in mind and tailored to suit your needs.
          </Typography>
        </Box>
        <Box marginTop={'40px'} >
          <BannerAd/>
        </Box>
      </Box>
    </Layout>
  );
};

export default Categoryworks;
