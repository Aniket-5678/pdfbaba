import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoSearchOutline } from "react-icons/io5";
import "../style/style.css";

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (results.length > 0 && selectedIndex >= 0) {
      window.location.href = `/question/${results[selectedIndex]._id}`;
    } else if (query.trim()) {
      try {
        const { data } = await axios.get('/api/v1/keyword/search', { params: { query } });
        if (data.success && data.data.length > 0) {
          // Redirect to the first result's details page
          window.location.href = `/question/${data.data[0]._id}`;
        } else {
          // Redirect to a not-found page if no results are found
          window.location.href = '/not-found';
        }
      } catch (error) {
        console.error('Error searching question papers', error);
        // Redirect to a not-found page in case of an error
        window.location.href = '/not-found';
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search notes"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-button"
        disabled={loading}
        onClick={handleSearch}
      >
        {loading ? <ClipLoader color="#007bff" size={10} /> : <FaSearch />}
      </button>

      {/* No Results Message */}
      {!loading && query && results.length === 0 && (
        <div className="no-results show">No results found</div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result, index) => (
            <li
              key={result._id}
              className={`search-result-item ${index === selectedIndex ? 'highlighted' : ''}`}
            >
              <a   href={`/question/${result._id}`} target='_self' rel='noopener noreferrer'>
                <IoSearchOutline size={20} color='#2c8edf' />    {result.description}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
