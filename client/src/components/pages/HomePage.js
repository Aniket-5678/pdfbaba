import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Banner from './Banner';
import '../style/style.css';
import axios from 'axios';
import Modal from 'react-modal';
import { FaChevronDown } from 'react-icons/fa'; // Load More Icon
import { ClipLoader } from 'react-spinners';
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Slider from "react-slick"; // Import react-slick
import Featurepdf from './Featurepdf';
import PlatformHighlights from './PlatformHighlights';
import ContactOffer from './ContactOffer';
import PdfSearchGuide from './PdfSearchGuide';
import PlatformInfoCard from './PlatformInfoCard';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PdfFormat from './PdfFormat';
import { useTheme } from '../context/ThemeContext'; 
import Faq from './Faq';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 products
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [categories, setCategories] = useState([])
 const [theme] = useTheme(); 
   
  useEffect(() => {
    const getAllcategory = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/get-category');
        console.log("Category Data: ", data); // Debugging
        setCategories(data.category); // Correctly set category array
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    getAllcategory();
  }, []);




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/v1/questionpaper/all-questions');
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } 
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => {
        const newCount = prevCount + 6;
        return newCount > 15 ? 15 : newCount; // Ensure not to exceed 15
      });
      setIsLoadingMore(false);
    }, 1000)
  };


// Next Arrow
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    <IoIosArrowDroprightCircle size={30} />
  </div>
);

// Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    <IoIosArrowDropleftCircle size={30}  />
  </div>
);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Use custom next arrow
    prevArrow: <PrevArrow />, // Use custom previous arrow
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };


// Add a new slider settings object specifically for categories
const categorySlider = {
  dots: false, // Disable dots
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Display 4 categories at once
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Show 2 categories on smaller screens
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, // Show 1 category on very small screens
        slidesToScroll: 1,
      },
    },
  ],
};




  

  return (
    <Layout>
      <div className='Home-container'>
        <div className='home-banner'>
          <Banner />
        </div>

        <div className='Board-content'>
          <h3 className='board-title'>Learning Platform</h3>
        </div>

        <Box
  sx={{
    padding: { xs: '10px', sm: '20px' },
    background: theme === 'dark' ? '#1a1a1a' : '#f9fcfc', // Dark background for dark mode
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif', // Apply Poppins font family
  }}
>
  <Slider
    {...categorySlider}
    sx={{
      '.slick-slide': {
        display: 'flex',
        justifyContent: 'center',
        padding: { xs: '5px', sm: '10px' },
      },
      '.slick-track': {
        display: 'flex',
        justifyContent: 'center',
      },
    }}
    responsive={[
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false, // Disable arrows on mobile
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true, // Enable arrows for tablet and desktop
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ]}
  >
    {categories.map((category) => (
      <Box
        className="catbox"
        key={category._id}
        sx={{
          width: '100%',
          margin: '0 auto',
          padding: { xs: '5px', sm: '10px' },
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif', // Apply Poppins font family to each category box
        }}
      >
        <Link to={`/category/${category.slug}`} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              boxShadow: theme === 'dark' ? '0px 4px 10px rgba(255, 255, 255, 0.1)' : '0px 4px 10px rgba(0, 0, 0, 0.1)', // Darker box shadow for dark mode
              padding: { xs: '8px', sm: '12px' },
              borderRadius: '10px',
              background: theme === 'dark' ? '#333' : '#fff', // Dark background for dark mode
              transition: 'all 0.3s ease-in-out',
              ':hover': {
                boxShadow: theme === 'dark' ? '0px 8px 20px rgba(255, 255, 255, 0.15)' : '0px 8px 20px rgba(0, 0, 0, 0.15)',
                transform: 'scale(1.05)',
              },
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                color: theme === 'dark' ? '#fff' : '#333', // White text for dark mode
                fontWeight: 'bold',
                marginBottom: '5px',
                fontFamily: 'Poppins, sans-serif', // Apply Poppins font family to category name
                maxWidth: '150px', // Set a maximum width
                overflow: 'hidden', // Hide any content that exceeds the width
                textOverflow: 'ellipsis', // Add ellipsis if the text is too long
                whiteSpace: 'nowrap', // Prevent text from wrapping into multiple lines
                margin: '0 auto', // Center align the text
              }}
            >
              {category.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.9rem' },
                color: theme === 'dark' ? '#bbb' : '#777', // Lighter text color for dark mode
                fontFamily: 'Poppins, sans-serif', // Apply Poppins font family to description
              }}
            >
              Explore now
            </Typography>
          </Box>
        </Link>
      </Box>
    ))}
  </Slider>
</Box>



        <div className='products-container'>
          {products.slice(0, visibleCount).map((product) => (
            <div key={product._id} className='product-card'>
              <h3 className='product-title'>{product.name}</h3>
              <p className='product-description'> {product.description.length > 16 
          ? `${product.description.substring(0, 45)}...` 
          : product.description}</p>
              <button
                className='product-dropdown-button'
                onClick={() => openModal(product)}
              >
                View PDFs
              </button>
            </div>
            
          ))}
        </div>

        {visibleCount < products.length && (
          <button className='load-more-button' onClick={handleLoadMore} disabled={isLoadingMore}    aria-label="Load More PDFs"  >
            {isLoadingMore ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <>
                <FaChevronDown /> Load More
              </>
            )}
          </button>
        )}

        {/* Modal for displaying PDF links */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="PDF Links"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <button onClick={closeModal} className="modal-close-button"><IoClose size={20} /></button>
          {selectedProduct && (
            <div className="modal-body">
              <h3>{selectedProduct.name} - PDFs</h3>
              <ul>
                {selectedProduct.pdfs.map((pdfUrl, pdfIndex) => {
                  const filename = pdfUrl.split('/').pop();
                  return (
                    <li key={pdfIndex}>
                      <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                        {filename}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Modal>

        <div>
          <PdfFormat/>
        </div>

      <div className='feature-pdf'>
        <Featurepdf/>
      </div>

      <div className='platform-info-section'>
          <PlatformInfoCard />
        </div>

        {/* Popular PDFs Slider */}
        <div className='popular-pdfs'>
          <h3 className='section-title'>Popular PDFs</h3>
          <Slider {...sliderSettings}>
            {products.slice(0, 6).map((product) => (
              <div key={product._id} className='pdf-card'>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <button className='pdf-button' onClick={() => openModal(product)}>View PDFs</button>
              </div>
            ))}
          </Slider>
        </div>

     
        
        <div className='platformhiglights-main'>
          <PlatformHighlights/>
        </div>

        <div>
          <PdfSearchGuide/>
        </div>
          

          <div className='contact-offer'>
             <ContactOffer/>
          </div>

          <div>
            <Faq/>
          </div>

      </div>
    </Layout>
  )
}

export default HomePage;
