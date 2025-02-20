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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../context/ThemeContext';
import NativeAd from './NativeAd';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader

const QuizPlayList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setLoading(false);
    }
  };

  const handleSearchSelect = (event, value) => {
    if (value) {
      navigate(`/play/${value._id}`);
    }
  };

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
        }}
      >
        {loading ? (
          <div className="spinner-container">
            <ClipLoader color="#007bff" size={50} /> {/* Spinner matches Aboutus.js */}
          </div>
        ) : (
          <>
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
              Available Quizzes
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, width: '100%' }}>
              <Autocomplete
                options={quizzes}
                getOptionLabel={(option) => option.title}
                onChange={handleSearchSelect}
                sx={{
                  width: { xs: '100%', sm: '50%' },
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
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
                      backgroundColor: theme === 'dark' ? '#333' : '#fff',
                      borderRadius: '5px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme === 'dark' ? '#bbb' : '#ccc' },
                        '&:hover fieldset': { borderColor: theme === 'dark' ? '#fff' : '#000' },
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {quizzes.map((quiz) => (
                <Grid item xs={6} sm={6} md={4} key={quiz._id}>
                  <Card
                    sx={{
                      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
                      color: theme === 'dark' ? 'white' : 'black',
                      boxShadow: theme === 'dark'
                        ? '0px 4px 10px rgba(255,255,255,0.1)'
                        : '0px 4px 10px rgba(0,0,0,0.1)',
                      transition: '0.3s',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                        }}
                      >
                        {quiz.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {quiz.category}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: theme === 'dark' ? '#068fc6' : '#1976d2',
                          color: 'white',
                          '&:hover': { backgroundColor: theme === 'dark' ? '#388e3c' : '#125ea2' },
                        }}
                        onClick={() => navigate(`/play/${quiz._id}`)}
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
      <Box>
        <NativeAd />
      </Box>
    </Layout>
  );
};

export default QuizPlayList;
