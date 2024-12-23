import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Banner from './Banner';
import '../style/style.css';
import axios from 'axios';
import Modal from 'react-modal';
import { FaChevronDown } from 'react-icons/fa'; // Load More Icon
import { ClipLoader } from 'react-spinners';
import { IoClose } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; // Custom arrow icons
import Slider from "react-slick"; // Import react-slick
import Featurepdf from './Featurepdf';
import Reviewcard from "../pages/Reviewcard"
import PlatformHighlights from './PlatformHighlights';
import ContactOffer from './ContactOffer';
import PdfSearchGuide from './PdfSearchGuide';
import PlatformInfoCard from './PlatformInfoCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 products
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [categories, setCategories] = useState([])

   
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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <MdArrowForward size={30} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <MdArrowBack size={30} />
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

  return (
    <Layout>
      <div className='Home-container'>
        <div className='home-banner'>
          <Banner />
        </div>

        <div className='Board-content'>
          <h3 className='board-title'>Learning Platform</h3>
        </div>
       
       {/* category name card */}
       <div>
       <div className='cat-name' >
           {categories?.map((cat) => (
            <Link className='cat-link' to={`/category/${cat.slug}`} >
           <div className='cat-card' key={cat._id}>
         {cat.name}
          </div>
          </Link>
  ))}
        </div>
  </div>
 {/* category name card */}
        

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

        <div className='review-section'>
          <Reviewcard />
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

      </div>
    </Layout>
  )
}

export default HomePage;
