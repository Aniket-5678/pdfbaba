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
  Pagination,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import SmallBannerAd from "../pages/SmallBannerAd";
import SocialBarAd from "./SocialBarAd";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme] = useTheme();
  const [downloading, setDownloading] = useState({});
  const [page, setPage] = useState(1);
  const productsPerPage = 6;



    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params.slug) getProductByCategory();
  }, [params.slug]);

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/questionpaper/product-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
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

  const handleDownload = async (url, filename) => {
    try {
      const secureUrl = url.replace("http://", "https://");
      setDownloading(prev => ({ ...prev, [filename]: true }));
      const response = await fetch(secureUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(prev => ({ ...prev, [filename]: false }));
    }
  };

  const paginatedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <Layout>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5', py: 5, mt: '90px', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', color: theme === 'dark' ? '#fff' : '#000' }}>
              {category.name || 'Category'}
            </Typography>
            <Typography sx={{ color: theme === 'dark' ? '#ccc' : '#666' }}>
              Explore the best resources for {category.name}
            </Typography>
          </Box>

          <Container sx={{ py: 5 }}>
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card
                    sx={{
                      backdropFilter: 'blur(10px)',
                      backgroundColor: theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.7)',
                      color: theme === 'dark' ? '#fff' : '#000',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      borderRadius: '16px',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      }
                    }}
                  >
                    <CardContent>
                      <Typography fontWeight="bold" fontSize="1rem">
                        {product.name}
                      </Typography>
                      <Typography fontSize="0.875rem" sx={{ opacity: 0.8 }}>
                        {product.description.slice(0, 60)}...
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      {product.pdfs?.length > 0 && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => openModal(product)}
                          sx={{
                            backgroundColor: theme === 'dark' ? '#64b5f6' : '#3f51b5',
                            textTransform: 'none',
                          }}
                        >
                          View PDFs
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {pageCount > 1 && (
              <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </Box>
            )}

            <Box mt={5}>
              <SmallBannerAd />
            </Box>
          </Container>

          {/* PDF Modal */}
          <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
              {selectedProduct?.name}
              <IoClose onClick={closeModal} style={{ float: 'right', cursor: 'pointer' }} />
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9' }}>
              {selectedProduct?.pdfs.map((pdfUrl, index) => {
                const filename = pdfUrl.split('/').pop();
                return (
                  <Box key={index} sx={{
                    mb: 2,
                    p: 2,
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
                    borderRadius: '10px',
                    backgroundColor: theme === 'dark' ? '#424242' : '#fff'
                  }}>
                    <Typography
                      component="a"
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'block',
                        color: theme === 'dark' ? '#64b5f6' : '#3f51b5',
                        textDecoration: 'none',
                        mb: 1
                      }}
                    >
                      {filename}
                    </Typography>
                    <Button
                      fullWidth
                      onClick={() => handleDownload(pdfUrl, filename)}
                      disabled={downloading[filename]}
                      sx={{
                        backgroundColor: theme === 'dark' ? '#64b5f6' : '#3f51b5',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: theme === 'dark' ? '#42a5f5' : '#2c387e',
                        }
                      }}
                    >
                      {downloading[filename] ? 'Downloading...' : '📥 Download'}
                    </Button>
                  </Box>
                );
              })}
              <SocialBarAd />
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#3f51b5' }}>
              <Button onClick={closeModal} sx={{ color: 'white' }}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Layout>
  );
};

export default CategoryProduct;
