import React, { useEffect } from 'react';
import Searchinput from "../form/SearchInput";
import "../style/style.css"; // Ensure this CSS file contains styles for unique class names prefixed with 'searchfunction'.
import { useTheme } from '../context/ThemeContext';
import Layout from "../Layout/Layout"

const Howsearchworks = () => {
  const [theme] = useTheme(); // Accessing the theme context
  
  useEffect(() => {
    // Scroll to top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
    <div className="searchfunction-container" 
      style={{ 
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fcfc', 
        color: theme === 'dark' ? '#fff' : '#333', 
        fontFamily: 'Poppins, sans-serif',
        margin: '100px 0px'
      }}
    >
      {/* Page Title */}
      <h2 className="searchfunction-title" 
        style={{ color: theme === 'dark' ? '#fff' : '#333' }}
      >
        How Search Works
      </h2>

      {/* Introductory Text */}
      <p className="searchfunction-intro" 
        style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
      >
        Welcome to the guide on how to effectively use the search functionality on our platform. 
        Our search system is designed to make it easy for you to find and download PDFs across various categories, 
        including technology, space studies, and spirituality.
      </p>

      {/* Search Functionality Section */}
      <div className="searchfunction-section">
        <h3 className="searchfunction-section-title" 
          style={{ color: theme === 'dark' ? '#fff' : '#333' }}
        >
          Search Input Functionality
        </h3>
        <p className="searchfunction-description" 
          style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
        >
          Use the search bar below to explore a vast collection of resources. 
          Just type in a keyword or phrase related to what you're looking for, and our system will fetch the best results for you.
        </p>
        <Searchinput />
      </div>

      {/* Steps to Use Search Section (Card with dark background and white content) */}
      <div className="searchfunction-steps-container" 
        style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', padding: '20px', borderRadius: '8px' }}
      >
        <h3 className="searchfunction-section-title" 
          style={{ color: theme === 'dark' ? '#fff' : '#333' }}
        >
          Steps to Use Search
        </h3>
        <div className="searchfunction-steps">
          <div className="searchfunction-step">
            <h4 
              style={{ color: theme === 'dark' ? '#fff' : '#333' }}
            >
              Step 1: Enter Keywords
            </h4>
            <p 
              style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
            >
              Use specific keywords to narrow down your search. For example, type "ReactJS" to find PDFs related to ReactJS.
            </p>
          </div>
          <div className="searchfunction-step">
            <h4 
              style={{ color: theme === 'dark' ? '#fff' : '#333' }}
            >
              Step 2: Review Results
            </h4>
            <p 
              style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
            >
              Browse through the list of PDFs that match your search query. Each result includes a title, description, and download option.
            </p>
          </div>
          <div className="searchfunction-step">
            <h4 
              style={{ color: theme === 'dark' ? '#fff' : '#333' }}
            >
              Step 3: Download PDFs
            </h4>
            <p 
              style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
            >
              Click on the file name to access the PDF in your browser. Once opened, you can choose to download it directly from the PDF viewer for offline use.
            </p>
          </div>
        </div>
      </div>

      {/* User Benefits Section (Dark Mode) */}
      <div className="searchfunction-benefits" 
        style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', padding: '20px', borderRadius: '8px' }}
      >
        <h3 className="searchfunction-section-title" 
          style={{ color: theme === 'dark' ? '#fff' : '#333' }}
        >
          Why Use Our Search?
        </h3>
        <ul className="searchfunction-benefits-list">
          <li style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>Quickly find PDFs relevant to your needs.</li>
          <li style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>Access a wide variety of topics and categories.</li>
          <li style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>Enjoy a seamless and user-friendly interface.</li>
        </ul>
      </div>

      {/* Closing Note */}
      <div className="searchfunction-closing" 
        style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', padding: '20px', borderRadius: '8px' }}
      >
        <p 
          style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
        >
          Start exploring now and unlock the world of knowledge at your fingertips. If you encounter any issues or need assistance, 
          feel free to reach out to our support team.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Howsearchworks;
