import React from 'react';
import "../style/style.css"
import { Link } from 'react-router-dom';

const NotFoundComponent = () => {


  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to= '/'>
      <button >Go to Home</button>
      </Link>
    
    </div>
  );
};

export default NotFoundComponent;
