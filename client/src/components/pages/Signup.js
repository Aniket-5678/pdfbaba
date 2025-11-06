import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader spinner
import "../style/style.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for page load spinner
  const [formSubmitting, setFormSubmitting] = useState(false); // Loading state for form submission spinner
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitting(true);

  try {
    const res = await axios.post('/api/v1/user/register', { fullName, email, password });

    if (res.data.success) {
      toast.success(res.data.message);
      navigate('/login');
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // ✅ Real error message
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setFormSubmitting(false);
  }
};


  return (
    <Layout>
      <div className='signup-container'>
        {/* Spinner Section for Page Load */}
        {loading ? (
          <div className="spinner-container">
            <ClipLoader color="#007bff" size={50} /> {/* Spinner Color and Size */}
          </div>
        ) : (
          /* Signup Form Section */
          <form className='signup-main' onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <div>
              <input className='signup-input' type='text' placeholder='Enter your full name' value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <input className='signup-input' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <input className='signup-input' type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <button type='submit' className='signup-btn' disabled={formSubmitting}>
                {formSubmitting ? 'Signing up...' : 'Signup'}
              </button>
            </div>
            <div>
              <Link to='/login' className='login-link'>Already have an Account? Please Login</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Signup;
