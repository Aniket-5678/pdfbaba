import React from 'react';
import '../style/style.css'; // Ensure your CSS file is correctly imported
import { FaReact, FaDatabase, FaLaptopCode } from 'react-icons/fa'; // Example icons, adjust as needed
import exploreImage from "../images/explore.png";
import {useNavigate} from "react-router-dom"

const PlatformInfoCard = () => {

const navigate = useNavigate()

const handleExploreClick = () => {
  navigate('/explore');
};


  return (
    <div className="platform-info-card">
      <div className="card-image">
        <img src={exploreImage} alt="Learning Platform" className="info-image" />
      </div>
      <div className="card-content">
        <h2 className="info-title">Your Ultimate Learning Hub</h2>
        <p className="info-description">
          Welcome to our comprehensive learning platform where you can access all your BSc CS, IT, React JS, MERN, and other subject notes in PDF format. Enhance your knowledge with meticulously curated content designed to help you excel in your studies and career.
        </p>
        <div className="info-features">
          <div className="feature">
            <FaLaptopCode className="feature-icon" />
            <span>All Subjects Covered</span>
          </div>
          <div className="feature">
            <FaDatabase className="feature-icon" />
            <span>Structured PDF Notes</span>
          </div>
          <div className="feature">
            <FaReact className="feature-icon" />
            <span>Easy Accessibility</span>
          </div>
        </div>
        <button className="info-button" onClick={handleExploreClick}>Explore Now</button>
      </div>
    </div>
  );
};

export default PlatformInfoCard;
