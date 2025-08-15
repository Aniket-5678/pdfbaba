import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '../context/ThemeContext';
import Layout from '../Layout/Layout';
import axios from 'axios';
import GoogleDisplayAds from "./GoogleDisplayAds";
import GoogleMultiplexAd from "./GoogleMultiplexAd";

const DomainSearch = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState('');
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      setSuggestions([]);
      return;
    }

    try {
      setError('');
      const { data } = await axios.post('/api/v1/domain/suggest', { name, category });
      setSuggestions(data.suggestions);
      setCopied(null);
    } catch (err) {
      console.error('❌ Error fetching domains:', err.message);
      setError('Something went wrong while fetching domains.');
      setSuggestions([]);
    }
  };

  const handleCopy = (domain) => {
    navigator.clipboard.writeText(domain);
    setCopied(domain);
    setTimeout(() => setCopied(null), 1500);
  };

  useEffect(() => {
    if (name.trim() === '') {
      setSuggestions([]);
      setError('');
    }
  }, [name]);

  return (
    <Layout title="Domain Suggester">
      <Container maxWidth="md" sx={{ mt: 12, py: 5 }}>
        {/* Title */}
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Poppins',
            color: theme === 'dark' ? '#fff' : '#000',
            fontSize: { xs: '1.5rem', sm: '2.5rem' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            mt: { xs: 3, sm: 0 },
          }}
        >
          🔍 <span>Domain Name Suggester</span>
        </Typography>

        {/* Search input, category, and button */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          mt={4}
          width="100%"
        >
          <TextField
            label="Enter your name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              maxWidth: { xs: '100%', sm: '300px' },
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
              input: {
                color: theme === 'dark' ? '#fff' : '#000',
                fontFamily: 'Poppins',
              },
            }}
          />

          <FormControl
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: '200px' },
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                color: theme === 'dark' ? '#fff' : '#000',
                fontFamily: 'Poppins',
              }}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="shop">Shop</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{
              maxWidth: { xs: '100%', sm: '150px' },
              fontFamily: 'Poppins',
              backgroundColor: '#007bff',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            Suggest
          </Button>
        </Box>

        {/* Error message */}
        {error && (
          <Typography color="error" align="center" mt={2} fontFamily="Poppins">
            {error}
          </Typography>
        )}

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <Box mt={5} sx={{ zIndex: 1, position: 'relative' }}>
            <Divider />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: 'Poppins',
                color: theme === 'dark' ? '#fff' : '#000',
                mt: 3,
              }}
            >
              🧠 Suggested Domains:
            </Typography>

            <List>
              {suggestions.map((domain, index) => (
                <ListItem
                  key={index}
                  divider
                  secondaryAction={
                    <Tooltip title={copied === domain ? 'Copied!' : 'Copy'}>
                      <IconButton onClick={() => handleCopy(domain)} edge="end">
                        {copied === domain ? (
                          <CheckCircleIcon sx={{ color: 'green' }} />
                        ) : (
                          <ContentCopyIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  }
                  sx={{
                    backgroundColor: theme === 'dark' ? '#2c2c2c' : '#f9f9f9',
                    color: theme === 'dark' ? '#fff' : '#000',
                    borderRadius: 1,
                    my: 1,
                    px: 2,
                  }}
                >
                  <Typography fontFamily="Poppins">{domain}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Container>
      <GoogleDisplayAds />
      <GoogleMultiplexAd />
    </Layout>
  );
};

export default DomainSearch;
