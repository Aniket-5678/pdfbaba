import React, { useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../context/ThemeContext'; // Import theme context for dark mode
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PeopleIcon from '@mui/icons-material/People';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Layout from "../Layout/Layout";
import { Link } from 'react-router-dom';
import SmallBannerAd from "../pages/SmallBannerAd"
import NativeAd from "../pages/NativeAd"
import SocialBarAd from "./SocialBarAd"
import PopunderAd from './PopunderAd';

const Discovermore = () => {
  const [theme] = useCustomTheme(); // Get theme from context
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <Layout>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 4, mt: 15 }}>
        <Box marginBottom={'30px'} >
          <SmallBannerAd/>
        </Box>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          fontWeight="bold"
          sx={{ color: theme === 'dark' ? 'white' : 'black' }} // Apply conditional text color based on theme
        >
          Smart Learning Starts Here!
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          fontSize={isMobile ? "0.9rem" : "1rem"}
          sx={{ color: theme === 'dark' ? 'white' : 'black' }} // Apply conditional text color based on theme
        >
          Explore the best resources to enhance your learning experience with PDF Baba.
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={2}>
          {/* Learning Strategy */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <SchoolIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Effective Study Tips
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Learn smart techniques to manage time and retain concepts better.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recommended PDFs */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <LibraryBooksIcon fontSize="large" color="secondary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Best Learning PDFs
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Get access to top-rated PDFs for space studies, spiritual insights, techzone, and mysteries.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Time Management */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <AccessTimeIcon fontSize="large" color="success" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Smart Time Management
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Master the art of scheduling for better productivity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Growth & Learning Hacks */}
        <Typography variant="h5" fontWeight="bold" mt={5} fontSize={isMobile ? "1.1rem" : "1.5rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
          Enhance Your Learning Journey
        </Typography>
        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <TrendingUpIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Growth Mindset
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Develop a growth mindset and unlock your full learning potential.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <TipsAndUpdatesIcon fontSize="large" color="secondary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Learning Hacks
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Discover powerful tips to enhance comprehension and retention.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Explore Button */}
        <Button 
          component={Link}
          to="/explore"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, fontSize: isMobile ? "0.9rem" : "1rem", px: 3 }}
        >
          Explore More Notes
        </Button>

        {/* Exclusive Learning Insights */}
        <Typography variant="h5" fontWeight="bold" mt={5} fontSize={isMobile ? "1.1rem" : "1.5rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
          Exclusive Learning Insights
        </Typography>
        <Typography variant="body1" paragraph fontSize={isMobile ? "0.9rem" : "1rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
          Gain deeper knowledge from expert guides and join discussions with a vibrant community.
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={2}>
          {/* Expert Guides */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <ImportContactsIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Expert Guides
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Read high-quality guides curated by professionals to enhance your skills.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Community Discussions */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
              <CardContent>
                <PeopleIcon fontSize="large" color="secondary" />
                <Typography variant="h6" fontSize={isMobile ? "1rem" : "1.2rem"} gutterBottom sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Community Discussions
                </Typography>
                <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.9rem"} sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
                  Connect with fellow learners and discuss key topics that interest you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <NativeAd/>
      </Box>
      <Box>
        <SocialBarAd/>
      </Box>
      <Box>
        <PopunderAd/>
      </Box>
    </Layout>
  );
};

export default Discovermore;
