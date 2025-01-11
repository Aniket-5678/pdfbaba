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

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const theme = createTheme({
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
    <ThemeProvider theme={theme}>
      <Layout>
        {/* Header Section */}
        <Box sx={{ backgroundColor: '#f5f5f5', py: 5, textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h3" gutterBottom>
            {category.name || 'Category'}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Explore the best resources for {category.name}
          </Typography>
        </Box>

        {/* Product Section */}
        <Container sx={{ py: 5 }}>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={6} sm={6} md={4} key={product._id}> {/* Updated for responsive layout */}
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.description.length > 60
                          ? `${product.description.substring(0, 60)}...`
                          : product.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: { xs: 'block', sm: 'flex' } }}> {/* Mobile display as block */}
                      {product.pdfs?.length > 0 && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => openModal(product)}
                          sx={{
                            width: '100%',  // Make button full width on mobile
                            backgroundColor: 'white',  // Button color on mobile for better visibility
                            color: 'black',  // Button text color on mobile
                            '&:hover': {
                              backgroundColor: '#f1f1f1',  // Adjust hover color on mobile
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

        {/* Modal for displaying PDFs */}
        <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm" sx={{ borderRadius: '8px' }}>
          <DialogTitle sx={{ position: 'relative', backgroundColor: '#3f51b5', color: 'white', padding: '16px 24px' }}>
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
          <DialogContent sx={{ padding: '24px', backgroundColor: '#f9f9f9' }}>
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
                            color: '#3f51b5',
                            fontWeight: 'bold',
                          }}
                        >
                          {filename}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#3f51b5', padding: '12px 24px' }}>
            <Button onClick={closeModal} color="primary" sx={{ color: 'white' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </ThemeProvider>
  );
};

export default CategoryProduct;
