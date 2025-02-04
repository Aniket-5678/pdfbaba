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
import PdfSearchGuide from './PdfSearchGuide';
import PlatformInfoCard from './PlatformInfoCard';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PdfFormat from './PdfFormat';
import { useTheme } from '../context/ThemeContext'; 
import Faq from './Faq';
import Featureimage from './Featureimage';
import NativeAd from './NativeAd';


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
        return newCount > 25 ? 25 : newCount; // Ensure not to exceed 25
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
    fontFamily: 'Poppins, sans-serif', // Apply Poppins font family,
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
  }}
>
  <Slider
    {...categorySlider}
    autoplay={true} // Enable automatic sliding
    autoplaySpeed={2500} // Set the speed of sliding (in milliseconds)
    infinite={true} // Enable infinite loop
    cssEase="linear" // Smooth linear sliding
    speed={800} // Set the speed of the transition (in milliseconds)
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
      <p className='product-description'>
        {product.description} {/* Displaying full description without truncation */}
      </p>
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
  <button
    className='load-more-button'
    onClick={handleLoadMore}
    disabled={isLoadingMore}
    aria-label="Load More PDFs"
  >
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
              {/* Instructions for Android users */}
      <div className="android-instructions">
        <h4>Instructions for Android Users:</h4>
        <p>
          To download the PDF on your Android device:
        </p>
        <ol>
          <li>Hold the link of the PDF you want to download.</li>
          <li>An options menu will appear.</li>
          <li>Select "Download link" from the options.</li>
          <li>After the download is complete, you can access the PDF from your device's file manager.</li>
        </ol>
        <p>For PC and iOS users, simply click on the link to access the PDF directly.</p>
      </div>
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

        
        <div className='platformhiglights-main'>
         
        </div>

        <div>
          <PdfSearchGuide/>
        </div>
          
          <div>
            <Faq/>
          </div>

          <div>
           <Featureimage/>
          </div>
          
          <div>
            <NativeAd/>
          </div>

      </div>
    </Layout>
  )
}

export default HomePage;
