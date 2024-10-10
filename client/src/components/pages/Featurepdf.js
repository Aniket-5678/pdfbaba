import React from 'react';
import "../style/style.css";
import { FaLaptopCode,  FaBook, FaFreeCodeCamp } from 'react-icons/fa'; // Import icons
import { FaSearch } from 'react-icons/fa';


const Featurepdf = () => {
  return (
    <div>
      {/* Featured PDF Categories Section */}
      <div className='featured-pdf-categories'>
        <h3 className='section-title'>Featured PDF Categories</h3>
        <div className='categories-container'>
          <div className='category-card'>
            <FaLaptopCode size={50} className='category-icon' />
            <h4 className='category-title'>Technology Notes</h4>
            <p className='category-description'>Explore comprehensive notes on the latest technology trends, programming, AI, and more.</p>
          </div>
          <div className='category-card'>
            <FaBook size={50} className='category-icon' />
            <h4 className='category-title'>Programming Guides</h4>
            <p className='category-description'>Find detailed guides on various programming languages like Python, JavaScript, Java, and more.</p>
          </div>
          <div className='category-card'>
            <FaFreeCodeCamp size={50} className='category-icon' />
            <h4 className='category-title'>Free PDFs Available</h4>
            <p className='category-description'>Download free PDFs available in various categories. For premium PDFs, contact us directly.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className='how-it-works'>
        <h3 className='section-title'>How It Works</h3>
        <div className='how-it-works-steps'>
          <div className='step-card'>
            <FaSearch size={50} className='step-icon' />
            <h4>Search for Notes</h4>
            <p>Use our search feature to find the PDFs you're looking for from various categories.</p>
          </div>
          <div className='step-card'>
            <FaBook size={50} className='step-icon' />
            <h4>Choose a PDF</h4>
            <p>Browse the available options and choose the PDF that best suits your needs.</p>
          </div>
          {/* Add more steps as needed */}
        </div>
      </div>
    </div>
  );
};

export default Featurepdf;
