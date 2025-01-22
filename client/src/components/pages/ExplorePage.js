import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { Box, Typography, Button, Grid, Card, CardContent, Rating, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../Layout/Layout';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a context to manage theme

const StyledModalContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '500px',
  margin: 'auto',
  backgroundColor: theme === 'dark' ? '#121212' : '#fff', // Dark or light background
  borderRadius: theme.shape.borderRadius,
}));

const ExplorePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [theme] = useTheme(); // Use the theme context to get the current theme

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
    <Layout>
      <Box sx={{ padding: 3, backgroundColor: theme === 'dark' ? '#121212' : '#fff', color: theme === 'dark' ? '#f5f5f5' : '#333' }}>
        <Typography variant="h4" gutterBottom>
          Explore PDF Notes
        </Typography>
        <Grid container spacing={2}>
          {pdfs.slice(0, visibleCount).map((pdf) => (
            <Grid
              item
              xs={12}
              sm={6} // 2 items per row on small screens
              md={4} // 3 items per row on medium screens
              lg={3} // 4 items per row on large screens
              key={pdf._id}
            >
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: theme === 'dark' ? '#121212' : '#fff', // Set dark or light mode background
                  color: theme === 'dark' ? '#f5f5f5' : '#333', // Adjust text color for readability
                  boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.8)' : '0 4px 6px rgba(0,0,0,0.1)', // Optional shadow adjustment
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                <CardContent>
  <Typography variant="h6" gutterBottom>
    {pdf.name}
  </Typography>
  <Typography
    variant="body2"
    sx={{
      color: theme === 'dark' ? '#fff' : 'textSecondary', // White color in dark mode
    }}
    gutterBottom
  >
    {pdf.description}
  </Typography>
  <Rating
    value={Math.floor(Math.random() * 5) + 1} // Randomized rating
    readOnly
    size="small"
    sx={{ marginBottom: 1 }}
  />
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Button
      variant="outlined"
      onClick={() => openModal(pdf)}
      size="small"
      sx={{ marginRight: 1 }}
    >
      View PDFs
    </Button>
    <Button
      variant="contained"
      color="primary"
      href={pdf.pdfs[0]} // Assuming first PDF link for download
      target="_blank"
      size="small"
    >
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
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            inset: '10% auto auto auto',
            maxWidth: '500px',
            backgroundColor: theme === 'dark' ? '#121212' : '#fff', // Dark or light background
            color: theme === 'dark' ? '#f5f5f5' : '#333',
          },
        }}
      >
        <StyledModalContent>
          <Box display="flex" justifyContent="flex-end">
            <IoClose size={24} style={{ cursor: 'pointer' }} onClick={closeModal} />
          </Box>
          {selectedPdf && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedPdf.name}
              </Typography>
              <ul>
                {selectedPdf.pdfs.map((pdfUrl, index) => (
                  <li key={index}>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      {decodeURIComponent(pdfUrl.split('/').pop())}
                    </a>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </StyledModalContent>
      </Modal>
    </Layout>
  );
};

export default ExplorePage;
