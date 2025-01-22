import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { Box, Typography, Button, Grid, Card, CardContent, Rating, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../Layout/Layout';
import { useTheme } from '../context/ThemeContext';



const ExplorePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [theme] = useTheme(); // Use the theme context

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('/api/v1/questionpaper/all-questions');
        if (response.data.success) {
          setPdfs(response.data.data);
        } else {
          setError('Unable to fetch PDF notes. Please try again later.');
        }
      } catch (err) {
        setError('An error occurred while fetching PDFs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPdf(null);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 6);
      setLoadingMore(false);
    }, 1000);
  };

  const themeStyles = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      background: {
        default: theme === 'dark' ? '#121212' : '#fff',
      },
      text: {
        primary: theme === 'dark' ? '#fff' : '#333',
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <ClipLoader color="#007bff" size={50} />
        <Typography sx={{ marginLeft: 2 }}>Loading PDF notes...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ marginTop: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={themeStyles}>
      <Layout>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Explore PDF Notes
          </Typography>
          <Grid container spacing={2}>
            {pdfs.slice(0, visibleCount).map((pdf) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pdf._id}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: themeStyles.palette.background.default, // Dynamic background color
                    color: themeStyles.palette.text.primary, // Dynamic text color
                    boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.8)' : '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.3s, color 0.3s',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {pdf.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {pdf.description}
                    </Typography>
                    <Rating value={Math.floor(Math.random() * 5) + 1} readOnly size="small" sx={{ marginBottom: 1 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Button variant="outlined" onClick={() => openModal(pdf)} size="small">
                        View PDFs
                      </Button>
                      <Button variant="contained" color="primary" href={pdf.pdfs[0]} target="_blank" size="small">
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {visibleCount < pdfs.length && (
            <Box display="flex" justifyContent="center" marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? <ClipLoader color="#fff" size={20} /> : 'Load More'}
              </Button>
            </Box>
          )}
        </Box>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="PDF Details"
          ariaHideApp={false}
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            content: {
              border: 'none',
              inset: '10% auto auto auto',
              maxWidth: '500px',
              backgroundColor: themeStyles.palette.background.default,
              color: themeStyles.palette.text.primary,
            },
          }}
        >
        
        </Modal>
      </Layout>
    </ThemeProvider>
  );
};

export default ExplorePage;
