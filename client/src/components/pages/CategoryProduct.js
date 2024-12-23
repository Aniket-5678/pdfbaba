import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import "../style/style.css"
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5"; // Close Icon

const CategoryProduct = () => {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal

  useEffect(() => {
    if (params.slug) getProductByCategory();
  }, [params.slug]);

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/questionpaper/product-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      setError('Failed to fetch data'); // Set error message
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product); // Set the selected product for modal
    setModalIsOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close the modal
    setSelectedProduct(null); // Clear the selected product
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <Layout>
     
    
      
     
     

      <div className="products-category">
     
        {
          products.length > 0 ? (
            products.map((product) => (
                  
              <div key={product._id} className="categorywise-product">
                <h4 className='categorywise-title'>{product?.name}</h4>
                <p className='categorywise-description'>{product.description.length > 30 
          ? `${product.description.substring(0, 60)}` 
          : product.description}</p>

                {/* Render PDF download button */}
                {product.pdfs?.length > 0 && (
                  <button
                    className="product-dropdown-button"
                    onClick={() => openModal(product)} // Open modal with selected product
                  >
                    View PDFs
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No products available</p> // Show a message if no products are found
          )
        }
      </div>

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
                const filename = pdfUrl.split('/').pop(); // Extract filename from URL
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
     
    </Layout>
  );
};

export default CategoryProduct;
