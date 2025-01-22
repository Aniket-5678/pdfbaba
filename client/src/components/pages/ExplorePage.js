import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { Box, Typography, Button, Grid, Card, CardContent, Rating, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from '../Layout/Layout';
import { useTheme } from '../context/ThemeContext';
import { IoClose } from "react-icons/io5";

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

  // Theme setup with Poppins font
  const themeStyles = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      background: {
        default: theme === 'dark' ? '#121212' : '#fff',
      },
      text: {
        primary: theme === 'dark' ? '#fff' : '#333',
        fontFamily: '"Poppins", sans-serif', 
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif', // Apply Poppins font globally
    },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh" fontFamily= '"Poppins", sans-serif'>
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
                  fontFamily: '"Poppins", sans-serif', // Ensure Poppins is applied to card content
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pdf.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme === 'dark' ? 'white' : 'textSecondary'} // Set description color based on theme
                    gutterBottom
                  >
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
        contentLabel="PDF Links"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="modal-close-button"><IoClose size={20} /></button>
        
        {selectedPdf && (
          <div className="modal-body">
            <h3>{selectedPdf.name} - PDFs</h3>
            <ul>
              {selectedPdf.pdfs.map((pdfUrl, pdfIndex) => {
                const filename = pdfUrl.split('/').pop();  // Extract file name from URL
                return (
                  <li key={pdfIndex}>
                    <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                      {filename}  {/* Display the file name */}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Instructions for Android users */}
            <div className="android-instructions">
              <h4>Instructions for Android Users:</h4>
              <p>To download the PDF on your Android device:</p>
              <ol>
                <li>Hold the link of the PDF you want to download.</li>
                <li>An options menu will appear.</li>
                <li>Select "Download link" from the options.</li>
                <li>After the download is complete, you can access the PDF from your device's file manager.</li>
              </ol>
              <p>For PC and iOS users, simply click on the link to access the PDF directly.</p>
            </div>
          </div>
        )}
      </Modal>

    </Layout>
  );
};

export default ExplorePage;
