import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoSearchOutline } from "react-icons/io5";
import { useMediaQuery, TextField, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '../context/ThemeContext';  // Import the theme context
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import "../style/style.css";

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const { theme } = useTheme(); // Access theme from context

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.get('/api/v1/keyword/search', { params: { query } });
        if (data.success) {
          setResults(data.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error searching question papers', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      search();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = async () => {
    if (results.length > 0 && selectedIndex >= 0) {
      window.location.href = `/question/${results[selectedIndex]._id}`;
    } else if (query.trim()) {
      try {
        const { data } = await axios.get('/api/v1/keyword/search', { params: { query } });
        if (data.success && data.data.length > 0) {
          window.location.href = `/question/${data.data[0]._id}`;
        } else {
          window.location.href = '/not-found';
        }
      } catch (error) {
        console.error('Error searching question papers', error);
        window.location.href = '/not-found';
      }
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton onClick={() => setDrawerOpen(true)} style={{ color: theme === 'dark' ? 'white' : 'gray' }}>
            <SearchIcon  style={{position: 'relative', left: '40px' , fontSize: '1.6rem' }} />
          </IconButton>
          <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <div className="mobile-search-container">
              <IconButton
                style={{ float: 'right', margin: '10px' }}
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search notes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                style={{ margin: '20px' }}
              />
              {loading && <ClipLoader color="#007bff" size={20} />}
              {!loading && results.length === 0 && query && (
                <div className="no-results show">No results found</div>
              )}
              <List>
                {results.map((result) => (
                  <ListItem
                    button
                    key={result._id}
                    onClick={() => (window.location.href = `/question/${result._id}`)}
                  >
                    <IoSearchOutline size={20} color={theme === 'dark' ? '#ffffff' : '#2c8edf'} style={{ marginRight: '10px' }} />
                    <ListItemText primary={result.description} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </>
      ) : (
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search notes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="search-button"
            disabled={loading}
            onClick={handleSearch}
          >
            {loading ? <ClipLoader color="#007bff" size={10} /> : <FaSearch  />}
          </button>
          {!loading && query && results.length === 0 && (
            <div className="no-results show">No results found</div>
          )}
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((result) => (
                <li key={result._id} className="search-result-item">
                  <a href={`/question/${result._id}`} target="_self" rel="noopener noreferrer">
                    <IoSearchOutline size={20} color={theme === 'dark' ? '#ffffff' : '#2c8edf'} /> {result.description}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchInput;
