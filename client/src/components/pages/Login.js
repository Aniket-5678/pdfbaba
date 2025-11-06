import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from "axios";
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader spinner

const Login = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // Initialize as true to show spinner on page load
  const [formSubmitting, setFormSubmitting] = useState(false); // Separate state for form submission loading
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
    const res = await axios.post('/api/v1/user/login', { email, password });

    if (res.data.success) {
      toast.success(res.data.message);

      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token
      });

      localStorage.setItem('auth', JSON.stringify(res.data));

      navigate(location.state || '/');
    } else {
      toast.error(res.data.message || "Login failed");
    }
  } catch (error) {
    console.log(error);

    // ✅ Backend ka real message frontend par dikhayega
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
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
        {loading && (
          <div className="spinner-container">
            <ClipLoader color="#007bff" size={50} /> {/* Spinner Color and Size */}
          </div>
        )}

        {/* Login Form Section */}
        {!loading && (
          <form className='signup-main' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div>
              <input className='signup-input' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <input className='signup-input' type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <button type='submit' className='signup-btn' disabled={formSubmitting}>
                {formSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <div>
              <Link className='forget-pass-link' to='/forgetpass'>Forget password?</Link>
            </div>
            <div>
              <Link to='/register' className='login-link'>Do not have an Account? Please Signup</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Login;
