import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/style.css";
import axios from "axios";
import toast from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
import facbookImage from "../images/facebook.png"
import linkdinImage from "../images/linkdin.png"
import instagramImage from "../images/instagram.png"
import twitterImage from "../images/twitter.png"

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/v1/email/send-email', { email });

      toast.success(response.data.message);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h3>About  PDFBaba</h3>
          <p>
          PDFBaba is a platform dedicated to providing quality educational materials and resources for learners worldwide.
            Join us and start your learning journey today!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/register">signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: ani23june@gmail.com</p>
          <p>Phone: +918830730929</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img className='social' src={facbookImage} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img className='social' src={twitterImage} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img className='social' src={linkdinImage} alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img className='social' src={instagramImage} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-subscribe">
          <h3>Subscribe to Our Newsletter</h3>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? <RingLoader size={24} color="#ffffff" /> : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© 2024 PDFBaba. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
