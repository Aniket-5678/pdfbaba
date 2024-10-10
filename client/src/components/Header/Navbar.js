import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../style/style.css";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { CgProfile, CgChevronDown } from "react-icons/cg";
import SearchInput from '../form/SearchInput';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';
import LogoImage from "../images/pdfbaba.png"




const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [isQuestionDropdownOpen, setQuestionDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const questionDropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme(); 




  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem('auth');
    toast.success("Logged out successfully");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleQuestionDropdown = () => {
    setQuestionDropdownOpen(!isQuestionDropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  const handleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === 'light' ? 'dark' : 'light';
      console.log("Theme changed to:", newTheme);
      return newTheme;
    });
  };
  

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const { data } = await axios.get('/api/v1/questionpaper/all-questions');
        if (data.success) {
          setQuestionPapers(data.data);
        } else {
          console.error('Failed to fetch question papers');
        }
      } catch (error) {
        console.error('Error fetching question papers', error);
      }
    };

    fetchQuestionPapers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (questionDropdownRef.current && !questionDropdownRef.current.contains(event.target)) {
        setQuestionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add this useEffect for handling resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { // Adjust this value based on your breakpoints
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='navbar-container'>
      <nav className='nav-main'>
        
        <div className='hamburger' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className='nav-logo'>
          <Link className='nav-home ' to='/'>
          <img className='pdfbaba-logo'  src={LogoImage} alt='logo' />
     
          </Link>
        </div>

        <div className='nav-search-input'>
          <SearchInput />
        </div>

        <div className={`nav-link-main ${isMenuOpen ? 'open' : ''}`}>

        <div className='aboutus'>
             <Link className='about-nav' to='/about' >About us</Link>
          </div>

          <div className='contactus'>
             <Link className='contact-nav' to='/contact' >contact us</Link>
          </div>
          
          <div className="dropdown" ref={questionDropdownRef}>
            <button onClick={toggleQuestionDropdown} className="dropdown-btn">
              PDFS <CgChevronDown />
            </button>
            <div className={`dropdown-menu ${isQuestionDropdownOpen ? 'show' : ''}`}>
              {questionPapers.map((paper) => (
                <Link key={paper._id} to={`/question/${paper._id}`} className="nav-link">
                  <p className='nav-h2'>{paper.name}</p>
                </Link>
              ))}
            </div>
          </div>

         

          {!auth.user ? (
            <>
              <Link className='nav-1' to='/register'>Signup</Link>
              <Link className='nav-2' to='/login'>Login</Link>
            </>
          ) : (
            <>
              <div className="dropdown" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="dropbtn">
                  {auth?.user.name} <CgProfile color='gold' />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="nav-dashboard">
                      <p className='nav-h2'>Dashboard</p>
                    </Link>
                    <Link to='/login' onClick={handleLogout} className="nav-link">
                      <p className='nav-h2'>Logout</p>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className='btn-mode' onClick={handleTheme}>
    {theme === "light" ? (<MdLightMode color='#f0e68c'  size={30}/>) : (<MdDarkMode  color='#4b0082' size={30}/>)}
  </div>
      </nav>
    </div>
  );
};

export default Navbar;
