import React, { useState, useEffect } from 'react';
import Layout from "../Layout/Layout";
import "../style/style.css";
import toast from 'react-hot-toast';
import contactImage from "../images/contactbanner.png";
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader spinner  

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(true); // Initialize as true to show spinner on page load

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simulate a delay for page loading (e.g., fetching initial data, setup)
    const loadPage = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed (1000ms = 1 second)
      } finally {
        setLoading(false); // Hide spinner after the simulated delay
      }
    };

    loadPage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when submitting the form

    try {
      const response = await fetch('/api/v1/contactuser/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Success toast
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message); // Error toast
    } finally {
      // Delay hiding the spinner to keep it visible for a short period
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the delay as needed (1000ms = 1 second)
    }
  };

  return (
    <Layout>
      <div className="contact-container">
        {/* Spinner Section */}
        {loading && (
          <div className="spinner-container">
            <ClipLoader color="#007bff" size={50} /> {/* Spinner Color and Size */}
          </div>
        )}

        {/* Contact Form Section */}
        {!loading && (
          <>
            <div className="contact-content">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-paragraph">
                If you have any questions, feedback, or inquiries, feel free to reach out to us. We are here to help you and ensure you have a great experience using our platform.
              </p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="contact-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="contact-input"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="subject"
                  className="contact-input"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  className="contact-textarea"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit" className="contact-button" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* New Card Section */}
            <div className="contact-card">
              <div className="card-content">
                <h2>Why Contact Us?</h2>
                <p>
                  Our team is dedicated to providing you with the best service possible. Reach out for any assistance, support, or to give feedback. We're always here to listen and help!
                </p>
              </div>
              <div className="card-image">
                <img className="contact-card-img" src={contactImage} alt="Get in Touch" />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Contact;

