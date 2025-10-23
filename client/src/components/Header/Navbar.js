import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../style/style.css";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { CgProfile, CgChevronDown } from "react-icons/cg";
import SearchInput from '../form/SearchInput';
import axios from 'axios';
import {  FaTimes } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';
import { MdClose } from 'react-icons/md';
import { BiMenuAltLeft } from "react-icons/bi";
import { Drawer, List, ListItem, Divider } from '@mui/material';
import TopContentSlider from '../pages/TopContentSlider';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isQuestionDropdownOpen, setQuestionDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const questionDropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme(); 
  const [categories, setCategories] = useState([]);

  const [showTopContentSlider, setShowTopContentSlider] = useState(true);
  const lastScrollY = useRef(0);
const [isToolDropdownOpen, setToolDropdownOpen] = useState(false);
const toolDropdownRef = useRef(null);


// Track scroll direction
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Hide the slider when scrolling down (only hide if we're past 50px)
    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      setShowTopContentSlider(false); 
    } 
    // Show the slider only when scrolling up and we're at the top of the page
    else if (currentScrollY < lastScrollY.current && currentScrollY <= 50) {
      setShowTopContentSlider(true); 
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);




  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/get-category');
        setCategories(data.category); 
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    getAllCategory();
  }, []);

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

  const toggleToolDropdown = () => {
  setToolDropdownOpen(!isToolDropdownOpen);
};


  const handleTheme = () => {
    setTheme((prevState) => prevState === 'light' ? 'dark' : 'light');
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (questionDropdownRef.current && !questionDropdownRef.current.contains(event.target)) {
      setQuestionDropdownOpen(false);
    }
    if (toolDropdownRef.current && !toolDropdownRef.current.contains(event.target)) {
      setToolDropdownOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

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
       <div className={`topslider-main ${!showTopContentSlider ? 'topslider-hidden' : ''}`} >
       {showTopContentSlider && <TopContentSlider />}
       </div>

      <nav className='nav-main'>
        
        <div className='hamburger' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <BiMenuAltLeft />}
        </div>

        <div className='nav-logo'>
          <Link className='nav-home ' to='/'>
           <h2>PDF-BABA</h2>
          </Link>
        </div>

        <div className='nav-search-input'>
          <SearchInput />
        </div>


     {/* MUI Drawer for Mobile Menu */}
<Drawer
  anchor="left"
  open={isMenuOpen}
  onClose={toggleMenu}
  sx={{
    display: { xs: 'block', sm: 'none' }, // Drawer only on mobile
    width: '300px',  // Adjust width of the drawer
  }}
>
  <div className="drawer-header">
    <MdClose className="close-btn" onClick={toggleMenu} />
  </div>
  <List>
  <ListItem  component={Link}  to = "/"className="menu-item_1">PDF BABA</ListItem>
   {/* Auth links */}
    {!auth.user ? (
      <>
        <ListItem button component={Link} to='/register' className="menu-item">Signup</ListItem>
        <ListItem button component={Link} to='/login' className="menu-item">Login</ListItem>
      </>
    ) : (
      <>
                <ListItem className="menu-item">
                  <CgProfile size={25} style={{ marginRight: "10px" }} /> {auth?.user.name}
                </ListItem>
                <ListItem button component={Link} to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="menu-item">Dashboard</ListItem>
                <ListItem button onClick={handleLogout} className="menu-item">Logout</ListItem>
              </>
    )}
    
  <ListItem button component={Link} to="/roadmapdata" className="menu-item">Career Paths</ListItem>
  <ListItem button component={Link} to="/quizplaylist" className="menu-item">Quiz</ListItem>
  <ListItem button component={Link} to="/service" className="menu-item">Website Projects</ListItem>
    <ListItem button component={Link} to="/sourcecode-order" className="menu-item">sourcecodeOrder</ListItem>
    <ListItem button component={Link} to="/contact" className="menu-item">Contact us</ListItem>
    <ListItem button component={Link} to="/privacy" className="menu-item">Privacy Policy</ListItem>
    <ListItem button component={Link} to="/termcondition" className="menu-item">Terms & Conditions</ListItem>
        <ListItem button component={Link} to="/domain-suggestor" className="menu-item">Domain Suggestor</ListItem>

    <Divider />

    {/* Display all categories directly */}
    {categories.map((paper) => (
      <ListItem key={paper._id} button component={Link} to={`/category/${paper.slug}`} className="menu-item">
        <p className="nav-h2">{paper.name}</p>
      </ListItem>
    ))}

    <Divider />


  </List>
</Drawer>

        {/* Desktop Menu */}
        <div className="nav-link-main">

        <div className='contactus'>
            <Link className='contact-nav' to='/roadmapdata'>CareerPaths </Link>
          </div>

        <div className='contactus'>
            <Link className='contact-nav' to='/quizplaylist'>Quiz </Link>
          </div>
          
        <div className='contactus'>
            <Link className='contact-nav' to='/service'>WebsiteProjects</Link>
          </div>
   
         
          <div className='aboutus'>
            <Link className='about-nav' to='/sourcecode-order'>sourcecodeOrder</Link>
          </div>

         
<div className="dropdown" ref={toolDropdownRef}>
  <button onClick={toggleToolDropdown} className="dropdown-btn">
    Tools <CgChevronDown />
  </button>
  <div className={`dropdown-menu ${isToolDropdownOpen ? 'show' : ''}`}>
   
    <Link to="/domain-suggestor" className="nav-link">
      <p className="nav-h2">Domain Suggestor</p>
    </Link>
  </div>
</div>


         


          <div className="dropdown" ref={questionDropdownRef}>
            <button onClick={toggleQuestionDropdown} className="dropdown-btn">
              PDFs <CgChevronDown />
            </button>
            <div className={`dropdown-menu ${isQuestionDropdownOpen ? 'show' : ''}`}>
              {categories.map((paper) => (
                <Link key={paper._id} to={`/category/${paper.slug}`} className="nav-link">
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
          {theme === "light" ? (<MdLightMode color='#f0e68c' size={30} />) : (<MdDarkMode color='#4b0082' size={30} />)}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
