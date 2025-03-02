// src/components/Aboutus.js

import React, { useState, useEffect } from 'react';
import "../style/style.css";
import Layout from '../Layout/Layout';
import { ClipLoader } from 'react-spinners'; 
import bannerImage from '../images/aboutusbanner.png'; // Ensure you have a banner image in your assets
import AboutownerImage from "../images/aniketsingh.jpg"
import graphicdesignerImage from "../images/ajit.jpg"
import joshuaImage from "../images/joshua.jpg"
import goldyImage from "../images/goldy.jpg"
import SocialBarAd from './SocialBarAd';
import PopunderAd from './PopunderAd';


const Aboutus = () => {
  const [loading, setLoading] = useState(true); // State for managing loading

  // Simulate loading with a timeout (You can adjust this or replace it with real loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  // Show spinner while loading
  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#007bff" size={50} /> {/* Spinner Color and Size */}
      </div>
    );
  }

  return (
    <Layout>
      <div className="aboutus-container">
        {/* Banner Section */}
        <div className="banner">
          <img src={bannerImage} alt="Banner" className="about-banner-image" />
          <div className="banner-text">
            <h1>Welcome to PDFBABA</h1>
            <p>Your Gateway to Comprehensive Learning Resources</p>
          </div>
        </div>

        {/* About the Website */}
        <section className="section">
          <h2 className="subtitle">About PDFBABA</h2>
          <p className="paragraph">
            Welcome to <strong>PDFBABA</strong>, a platform dedicated to enhancing learning through accessible PDFs, tutorials, and other valuable resources. Designed specifically for 12th-grade IT/Computer Science students and aspiring website developers, LearnLedger provides a centralized hub where you can find all the materials you need to excel in your studies and projects.
          </p>
        </section>

        {/* Our Mission */}
        <section className="section">
          <h2 className="subtitle">Our Mission</h2>
          <p className="paragraph">
            At PDFBABA, our mission is to democratize access to quality educational content and provide a comprehensive learning experience for everyone. We believe in continuous learning and strive to make it easier for learners to access valuable resources and knowledge, empowering them to achieve their academic and professional goals.
          </p>
        </section>

        {/* What We Offer */}
        <section className="section">
          <h2 className="subtitle">What We Offer</h2>
          <ul className="list">
            <li className="listItem">Extensive collection of PDFs across all subjects</li>
            <li className="listItem">Detailed tutorials to help you grasp complex topics</li>
            <li className="listItem">Regular updates with the latest study materials</li>
            <li className="listItem">Advanced search functionality for easy access</li>
            <li className="listItem">User-friendly interface tailored for students and developers</li>
          </ul>
        </section>

        {/* Search Functionality Highlight */}
        <section className="section">
          <h2 className="subtitle">Powerful Search Functionality</h2>
          <p className="paragraph">
            Our platform features an advanced search functionality that allows you to quickly find the PDFs and notes you need. Whether you're looking for specific topics, subjects, or resources related to website development, our intuitive search ensures you spend less time searching and more time learning.
          </p>
        </section>

        {/* Contact Us */}
        <section className="section">
          <h2 className="subtitle">Contact Us</h2>
          <p className="paragraph">
            If you have any questions, suggestions, or feedback, feel free to reach out to us at:
          </p>
          <p className="contactInfo">📧 ani23june@gmail.com</p>
          <p className="contactInfo">📞+918830730929</p>
        </section>


        <section className="team-section">
          <h2 className="subtitle">Meet the Team</h2>
          <div className="team-cards">

            {/* Owner Card */}
            <div className="team-card">
              <img src={AboutownerImage} alt="Owner" className="team-image" />
              <h3 className="team-name">Aniket (Owner)</h3>
              <p className="team-role">MERN Stack Developer</p>
              <p className="team-description">
                Hi, I'm Aniket, the creator of PDFBABA. With a passion for full-stack development, I built this platform to help students and developers access essential resources effortlessly.
              </p>
            </div>

            {/* Graphic Designer */}
            <div className="team-card">
              <img src={graphicdesignerImage} alt="Graphic Designer" className="team-image" />
              <h3 className="team-name">Ajit Yadav</h3>
              <p className="team-role">Graphic Designer</p>
              <p className="team-description">
                Ajit creates visually engaging content, ensuring all designs are attractive and aligned with the platform’s brand.
              </p>
            </div>

            {/* UX Designer */}
            <div className="team-card">
              <img src={goldyImage} alt="UX Designer" className="team-image" />
              <h3 className="team-name">Guarav karkera</h3>
              <p className="team-role">UI/UX Designer</p>
              <p className="team-description">
                gaurav designs intuitive interfaces to make sure the user journey is effortless and visually appealing.
              </p>
            </div>

            {/* PDF Expert */}
            <div className="team-card">
              <img  src={joshuaImage} alt="PDF Expert" className="team-image" />
              <h3 className="team-name">joshua </h3>
              <p className="team-role">PDF Expert</p>
              <p className="team-description">
                Mark ensures all PDF materials are of high quality and accessible for all learners.
              </p>
            </div>

          </div>
        </section>
        <SocialBarAd/>
      </div>
      <div>
        <PopunderAd/>
      </div>
    </Layout>
  );
}

export default Aboutus;
