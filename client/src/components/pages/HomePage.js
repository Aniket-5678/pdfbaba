import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Banner from './Banner';
import '../style/style.css';
import axios from 'axios';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Slider from "react-slick"; // Import react-slick
import Featurepdf from './Featurepdf';
import PdfSearchGuide from './PdfSearchGuide';
import PlatformInfoCard from './PlatformInfoCard';
import { Link } from 'react-router-dom';
import { Box, Typography ,Pagination} from '@mui/material';
import PdfFormat from './PdfFormat';
import { useTheme } from '../context/ThemeContext'; 
import Faq from './Faq';
import Featureimage from './Featureimage';
import Services from './Services';
import QuizIntro from './QuizIntro';
import SocialBarAd from "./SocialBarAd"
import GoogleMultiplexAd from './GoogleMultiplexAd';
import GoogleDisplayAds from './GoogleDisplayAds';
import RoadmapSection from './RoadmapSection';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const [downloading, setDownloading] = useState({});
  const [categories, setCategories] = useState([])
 const [theme] = useTheme(); 

 const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 6;
   
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

<div>
  <RoadmapSection/>
</div>

<div>
  <QuizIntro/>
</div>


<div className='products-container'>
  {products.length === 0 ? (
    <Typography
      variant="h6"
      sx={{
        fontFamily: "Poppins",
        color: theme === "dark" ? "#BDBDBD" : "#444",
        textAlign: "center",
        mt: 4,
      }}
    >
      No PDFs found.
    </Typography>
  ) : (
    products
      .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
      .map((product) => (
        <div
          key={product._id}
          className="product-card"
          style={{
            background:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow:
              theme === "dark"
                ? "0 8px 32px rgba(0,0,0,0.35)"
                : "0 8px 32px rgba(31, 38, 135, 0.25)",
            color: theme === "dark" ? "#E0E0E0" : "#2c2c2c",
            fontFamily: "Poppins",
          }}
        >
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <button
            className="product-dropdown-button"
            onClick={() => openModal(product)}
            style={{
              padding: "10px 18px",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            View PDFs
          </button>
        </div>
      ))
  )}
</div>
{products.length > productsPerPage && (
  <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
    <Pagination
      count={Math.ceil(products.length / productsPerPage)}
      page={currentPage}
      onChange={(event, value) => {
        setCurrentPage(value);
      }}
      color="primary"
      sx={{
        "& .MuiPaginationItem-root": {
          fontFamily: "Poppins",
          color: theme === "dark" ? "#fff" : "#2c2c2c",
        },
      }}
    />
  </div>
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
                  const securePdfUrl = pdfUrl.replace("http://", "https://");
   
                  const handleDownload = async (url, filename) => {
                    try {
                      const secureUrl = url.replace("http://", "https://"); 
                      setDownloading(prev => ({ ...prev, [filename]: true })); // Set downloading state
                      const response = await fetch(secureUrl);
                      const blob = await response.blob();
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = filename;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } catch (error) {
                      console.error("Error downloading the file:", error);
                    } finally {
                      setDownloading(prev => ({ ...prev, [filename]: false })); // Reset downloading state
                    }
                  };

                  return (
                    <li key={pdfIndex}>
                      <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                        {filename}
                      </a>
                      <button
    onClick={() => handleDownload(securePdfUrl, filename)}
    disabled={downloading[filename]}
    style={{
      backgroundColor: '#28a745', // Green color
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: downloading[filename] ? 'not-allowed' : 'pointer',
      transition: '0.3s',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      margin: '10px 0px',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')} // Dark green on hover
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
  >
      {downloading[filename] ? (
    <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Downloading...</span> // Golden Color
  ) : (
    '📥 Download'
  )}
  </button>
                    </li>
                  );
                })}
              </ul>
              {/* Instructions for Android users */}
      <div className="android-instructions">
     
        <p>For PC and iOS users, simply click on the link to access the PDF directly.</p>
        <p><strong>For Android users:</strong> Simply click on the download button, and the file will be downloaded.</p>
      </div>
      <SocialBarAd />
            </div>
            
          )}
        </Modal>

        <div>
  <Services/>
</div>



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
          
          <div  style={{ textAlign: "center", marginTop: "20px" }}>
            <GoogleMultiplexAd/>
          </div>
           
          <>
          <GoogleDisplayAds/>
          </>

      </div>
    </Layout>
  )
}

export default HomePage;
