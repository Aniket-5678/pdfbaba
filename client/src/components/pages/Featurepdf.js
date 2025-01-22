import React from "react";
import "../style/style.css";
import { FaLaptopCode, FaBook, FaFreeCodeCamp } from "react-icons/fa"; // Import icons
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Featurepdf = () => {
  return (
    <div>
      {/* Featured PDF Categories Section */}
      <div className="featured-pdf-categories">
        <h3 className="section-title">Featured PDF Categories</h3>
        <div className="categories-container">
          {/* TechZone Category */}

          <div className="category-card">
            <Link to="categoryworks" className="categoryworklink">
              <FaLaptopCode size={50} className="category-icon" />
              <h4 className="category-title">TechZone</h4>
              <p className="category-description">
                Explore learning materials on ReactJS, NodeJS, HTML, CSS, and
                web development technologies. Perfect for aspiring developers!
              </p>
            </Link>
          </div>
          {/* Space Studies Category */}
          <div className="category-card">
            <Link to="categoryworks" className="categoryworklink">
              <FaBook size={50} className="category-icon" />
              <h4 className="category-title">Space Studies</h4>
              <p className="category-description">
                Explore the universe with PDFs on space exploration, satellite
                technology, astronomy, and space missions from leading space
                agencies.
              </p>
            </Link>
          </div>
          {/* Spiritual Insights Category */}

          <div className="category-card">
            <Link to="categoryworks" className="categoryworklink">
              <FaFreeCodeCamp size={50} className="category-icon" />
              <h4 className="category-title">Spiritual Insights</h4>
              <p className="category-description">
                Dive into spiritual teachings, meditation practices, and wisdom
                from various traditions to enhance personal growth and inner
                peace.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h3 className="section-title">How It Works</h3>
        <div className="how-it-works-steps">
          
            <div className="step-card">
            <Link to="howitworks" className="searchfunction">
              <FaSearch size={50} className="step-icon" />
              <h4>Search for Notes</h4>
              <p>
                Use the search bar to find PDFs across different categories like
                TechZone, Space Studies, and Spiritual Insights.
              </p>
              </Link>
            </div>
         
          <div className="step-card">
            <FaBook size={50} className="step-icon" />
            <h4>Select and Download</h4>
            <p>
              Pick the PDF that fits your needs, whether you're looking to learn
              a new tech skill or explore space or spirituality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featurepdf;
