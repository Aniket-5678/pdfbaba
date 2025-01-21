import React from 'react';
import '../style/style.css'; // Ensure your CSS file is correctly imported
import { FaReact, FaDatabase, FaLaptopCode } from 'react-icons/fa'; // Example icons, adjust as needed
import exploreImage from '../images/explore.png';
import { useNavigate } from 'react-router-dom';

const PlatformInfoCard = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="platform-info-card">
      <div className="card-image">
        <img
          src={exploreImage}
          alt="Learning Platform"
          className="info-image"
        />
      </div>
      <div className="card-content">
        <h2 className="info-title">Welcome to PDF Baba Learning Hub</h2>
        <p className="info-description">
          Discover a wide range of educational resources and notes on PDF Baba.
          We provide study materials for various categories such as 12th Science, 
          Tech Zone, Spiritual Insights, Space Studies, and more. Access high-quality 
          PDF notes on subjects like React JS, Node JS, JavaScript, HTML, CSS, Earth 
          Studies, Chakra Practices, and much more to enhance your learning experience.
        </p>
        <div className="info-features">
          <div className="feature">
            <FaLaptopCode className="feature-icon" />
            <span>12th Science - Comprehensive Notes</span>
          </div>
          <div className="feature">
            <FaDatabase className="feature-icon" />
            <span>Tech Zone - React JS, Node JS, JavaScript</span>
          </div>
          <div className="feature">
            <FaReact className="feature-icon" />
            <span>Spiritual Insights - Chakra Practices</span>
          </div>
          <div className="feature">
            <FaReact className="feature-icon" />
            <span>Space Studies - Earth and Beyond</span>
          </div>
        </div>
        <button className="info-button" onClick={handleExploreClick}>
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default PlatformInfoCard;
