import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout/Layout';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Autocomplete,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../context/ThemeContext';
import NativeAd from './NativeAd';
import SmallBannerAd from './SmallBannerAd';

const QuizPlayList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('/api/v1/quizzes/all');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleSearchSelect = (event, value) => {
    if (value) {
      navigate(`/play/${value._id}`);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination logic
  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  return (
    <Layout>
      <Box
        marginTop="100px"
        sx={{
          px: { xs: 2, sm: 4 },
          py: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: theme === 'dark' ? '#121212' : '#f5f5f5',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontFamily: 'Poppins, sans-serif',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            color: theme === 'dark' ? 'white' : 'black',
          }}
        >
          🧠 Available Quizzes
        </Typography>

  <Box display="flex" justifyContent="center" mb={2}>
    <SmallBannerAd />
  </Box>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, width: '100%' }}>
          <Autocomplete
            options={quizzes}
            getOptionLabel={(option) => option.title}
            onChange={handleSearchSelect}
            sx={{
              width: { xs: '100%', sm: '50%' },
              backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
              borderRadius: '5px',
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Quiz"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon sx={{ color: theme === 'dark' ? '#bbb' : '#000' }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
                sx={{
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff',
                  borderRadius: '5px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme === 'dark' ? '#555' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: theme === 'dark' ? '#aaa' : '#000',
                    },
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Quiz Cards */}
        <Grid container spacing={3} justifyContent="center">
          {currentQuizzes.map((quiz) => (
            <Grid item xs={6} sm={6} md={4} key={quiz._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: 200, // ✅ Fixed height for all cards
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  background:
                    theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  color: theme === 'dark' ? 'white' : 'black',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {quiz.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.7,
                      mt: 1,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.8rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {quiz.category}
                  </Typography>
                </CardContent>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/play/${quiz._id}`)}
                  sx={{
                    backgroundColor: theme === 'dark' ? '#1e88e5' : '#1976d2',
                    borderRadius: '0 0 12px 12px',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: theme === 'dark' ? '#1565c0' : '#125ea2',
                    },
                  }}
                >
                  Start Quiz
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box mt={5}>
          <Pagination
            count={Math.ceil(quizzes.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'Poppins, sans-serif',
              },
            }}
          />
        </Box>
      </Box>

      <Box>
        <NativeAd />
      </Box>
    </Layout>
  );
};

export default QuizPlayList;
