import React from "react";
import { Link } from "react-router-dom"; // Adjust this import if you are not using React Router
import "../style/style.css"; // Add your CSS file path

const ContactOffer = () => {
  return (
    <div className="contact-offer-container">
      <h2 className="contact-offer-heading">Looking for a Specific PDF?</h2>
      <p className="contact-offer-text">
        If you're unable to find the PDFs you need, don't worry! You can contact us directly, and we will provide the PDF for any subject for just ₹49. Reach out to us, and we'll help you find what you need.
      </p>
      <p className="contact-offer-contact">
        📞 Contact us at: <strong>+917020772919</strong>
      </p>
      <Link to="/contact" className="contact-offer-button">
        Go to Contact Page
      </Link>
    </div>
  );
};

export default ContactOffer;
