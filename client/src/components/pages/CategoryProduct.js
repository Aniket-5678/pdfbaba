import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Container,
  Grid,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme] = useTheme(); // Use the theme context

  useEffect(() => {
    if (params.slug) getProductByCategory();
  }, [params.slug]);

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/questionpaper/product-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const themeStyles = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      background: {
        default: theme === 'dark' ? '#121212' : '#ffffff',
      },
      text: {
        primary: theme === 'dark' ? '#ffffff' : '#000000',
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={themeStyles}>
      <Layout>
        <Box
          sx={{
            backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
            py: 5,
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: theme === 'dark' ? 'white' : 'black',
              fontSize: '1.1rem'
            }}
          >
            {category.name || 'Category'}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme === 'dark' ? '#cccccc' : '#666666',
            }}
          >
            Explore the best resources for {category.name}
          </Typography>
        </Box>

        <Container sx={{ py: 5 }}>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={6} sm={6} md={4} key={product._id}>
              <Card
  sx={{
    backgroundColor: theme === 'dark' ? '#424242' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    boxShadow: theme === 'dark' ? '0px 4px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme === 'dark' ? '0px 8px 20px rgba(0, 0, 0, 0.5)' : '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
  }}
>
  <CardContent>
    <Typography
      variant="h5"
      fontSize="1.2rem"
      fontFamily='"Poppins", sans-serif'
      gutterBottom
      sx={{
        fontWeight: 600,
        fontSize: '0.9rem',
        color: theme === 'dark' ? '#ffffff' : '#333333',
      }}
    >
      {product.name}
    </Typography>
    <Typography
      variant="body2"
      color="textSecondary"
      sx={{
        fontSize: '0.8rem',
        lineHeight: 1.5,
        color: theme === 'dark' ? '#cccccc' : '#666666',
        
      }}
    >
      {product.description.length > 60
        ? `${product.description.substring(0, 60)}...`
        : product.description}
    </Typography>
  </CardContent>
  <CardActions
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px',
    }}
  >
    {product.pdfs?.length > 0 && (
      <Button
        size="small"
        variant="contained"
        onClick={() => openModal(product)}
        sx={{
          backgroundColor: theme === 'dark' ? '#64b5f6' : '#3f51b5',
          color: 'white',
          fontWeight: 500,
          fontSize: '0.8rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: theme === 'dark' ? '#42a5f5' : '#303f9f',
          },
        }}
      >
        View PDFs
      </Button>
    )}
  </CardActions>
</Card>

                </Grid>
              ))
            ) : (
              <Typography>No products available</Typography>
            )}
          </Grid>
        </Container>

        {/* Modal */}
        <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
          <DialogTitle
            sx={{
              backgroundColor: theme === 'dark' ? '#1e88e5' : '#3f51b5',
              color: 'white',
            }}
          >
            {selectedProduct?.name || 'Product PDFs'}
            <IoClose
              size={24}
              onClick={closeModal}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: 'white',
              }}
            />
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: theme === 'dark' ? '#424242' : '#f9f9f9' }}>
            {selectedProduct && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  PDFs Available:
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {selectedProduct.pdfs.map((pdfUrl, index) => {
                    const filename = pdfUrl.split('/').pop();
                    return (
                      <li key={index} style={{ marginBottom: '8px' }}>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            color: theme === 'dark' ? '#64b5f6' : '#3f51b5',
                            fontWeight: 'bold',
                          }}
                        >
                          {filename}
                        </a>
                      </li>

                    );
                  })}
                </ul>

                         {/* Instructions for Android users */}
      <div className="android-instructions">
        <h4>Instructions for Android Users:</h4>
        <p>
          To download the PDF on your Android device:
        </p>
        <ol>
          <li>Hold the link of the PDF you want to download.</li>
          <li>An options menu will appear.</li>
          <li>Select "Download link" from the options.</li>
          <li>After the download is complete, you can access the PDF from your device's file manager.</li>
        </ol>
        <p>For PC and iOS users, simply click on the link to access the PDF directly.</p>
      </div>
              </Box>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: theme === 'dark' ? '#1e88e5' : '#3f51b5',
            }}
          >
            <Button onClick={closeModal} sx={{ color: 'white' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </ThemeProvider>
  );
};

export default CategoryProduct;
