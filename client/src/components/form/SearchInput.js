import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoSearchOutline } from "react-icons/io5";
import {
  useMediaQuery,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import "../style/style.css";

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // multiple spaces ko single space banata hai
};

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [noteResults, setNoteResults] = useState([]);
  const [roadmapResults, setRoadmapResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const { theme } = useTheme();

  useEffect(() => {
    const search = async () => {
      const normalizedQuery = normalizeText(query);

      if (!normalizedQuery) {
        setNoteResults([]);
        setRoadmapResults([]);
        return;
      }

      setLoading(true);
      try {
        const [notesRes, roadmapRes] = await Promise.all([
          axios.get('/api/v1/keyword/search', { params: { query: normalizedQuery } }),
          axios.get('/api/v1/roadmaps')
        ]);

        // ✅ Notes results
        const notes = notesRes.data.success ? notesRes.data.data : [];

        // ✅ Roadmaps fuzzy filter
        const filteredRoadmaps = roadmapRes.data.filter((r) =>
          normalizeText(r.category).includes(normalizedQuery)
        );

        setNoteResults(notes);
        setRoadmapResults(filteredRoadmaps);
      } catch (error) {
        console.error('Error searching:', error);
        setNoteResults([]);
        setRoadmapResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      search();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = () => {
    if (noteResults.length > 0) {
      window.location.href = `/question/${noteResults[0]._id}`;
    } else if (roadmapResults.length > 0) {
      window.location.href = `/roadmap/${roadmapResults[0]._id}`;
    } else {
      window.location.href = '/not-found';
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: theme === 'dark' ? 'white' : 'gray' }}
          >
            <SearchIcon style={{ position: 'relative', left: '30px', fontSize: '1.6rem' }} />
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
                placeholder="Search notes or roadmaps"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                autoFocus
                style={{ margin: '20px' }}
              />

              {loading && <ClipLoader color="#007bff" size={20} />}
              {!loading && query && noteResults.length === 0 && roadmapResults.length === 0 && (
                <div className="no-results show">No results found</div>
              )}

              <List>
                {noteResults.length > 0 && (
                  <ListItem className="result-heading">📖 Notes</ListItem>
                )}
                {noteResults.map((note) => (
                  <ListItem
                    button
                    key={note._id}
                    onClick={() => (window.location.href = `/question/${note._id}`)}
                  >
                    <IoSearchOutline
                      size={20}
                      color={theme === 'dark' ? '#ffffff' : '#2c8edf'}
                      style={{ marginRight: '10px' }}
                    />
                    <ListItemText primary={note.description} />
                  </ListItem>
                ))}

                {roadmapResults.length > 0 && (
                  <ListItem className="result-heading">🛣 Roadmaps</ListItem>
                )}
                {roadmapResults.map((roadmap) => (
                  <ListItem
                    button
                    key={roadmap._id}
                    onClick={() => (window.location.href = `/roadmap/${roadmap._id}`)}
                  >
                    <IoSearchOutline
                      size={20}
                      color={theme === 'dark' ? '#ffffff' : '#2c8edf'}
                      style={{ marginRight: '10px' }}
                    />
                    <ListItemText primary={roadmap.category} />
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
            placeholder="Search notes or roadmaps"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            className="search-button"
            disabled={loading}
            onClick={handleSearch}
          >
            {loading ? <ClipLoader color="#007bff" size={10} /> : <FaSearch />}
          </button>

          {!loading && query && noteResults.length === 0 && roadmapResults.length === 0 && (
            <div className="no-results show">No results found</div>
          )}

          {(noteResults.length > 0 || roadmapResults.length > 0) && (
            <ul className="search-results">
              {noteResults.length > 0 && <li className="result-heading">📖 Notes</li>}
              {noteResults.map((note) => (
                <li key={note._id} className="search-result-item">
                  <a href={`/question/${note._id}`} target="_self" rel="noopener noreferrer">
                    <IoSearchOutline
                      size={20}
                      color={theme === 'dark' ? '#ffffff' : '#2c8edf'}
                    />{" "}
                    {note.description}
                  </a>
                </li>
              ))}

              {roadmapResults.length > 0 && <li className="result-heading">🛣 Roadmaps</li>}
              {roadmapResults.map((roadmap) => (
                <li key={roadmap._id} className="search-result-item">
                  <a href={`/roadmap/${roadmap._id}`} target="_self" rel="noopener noreferrer">
                    <IoSearchOutline
                      size={20}
                      color={theme === 'dark' ? '#ffffff' : '#2c8edf'}
                    />{" "}
                    {roadmap.category}
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
