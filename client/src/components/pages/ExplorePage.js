// src/components/ExplorePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Spinner for loading state
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'; // Close icon for modal
import '../style/style.css'; // Ensure your CSS file is correctly imported
import Layout from '../Layout/Layout';

const ExplorePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more PDFs
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [selectedPdf, setSelectedPdf] = useState(null); // Selected PDF state
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 PDFs

  useEffect(() => {
    // Fetch PDFs from the backend API
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('/api/v1/questionpaper/all-questions'); // Adjust the endpoint as needed
        if (response.data.success) {
          setPdfs(response.data.data); // Assuming the PDFs are in response.data.data
        } else {
          setError('Failed to fetch PDFs.');
        }
      } catch (err) {
        setError('An error occurred while fetching PDFs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  // Open modal and set selected PDF
  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPdf(null);
  };

  // Handle Load More button click
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 6);
      setLoadingMore(false);
    }, 1000); // Simulate a network request delay
  };

  if (loading) {
    return (
      <div className="explore-spinner-container">
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="explore-error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="explore-container">
        <h1 className="explore-title">Available PDF Notes</h1>
        <div className="pdf-grid">
          {pdfs.slice(0, visibleCount).map((pdf) => (
            <div key={pdf._id} className="pdf-card">
              {/* If you have images for PDFs, include them here */}
              {/* <img src={pdf.imageUrl} alt={`${pdf.name} Cover`} /> */}
              <h3 className="pdf-title">{pdf.name}</h3>
              <p className="pdf-description">{pdf.description}</p>
              <button
                className="pdf-button"
                onClick={() => openModal(pdf)}
                aria-label={`View PDFs for ${pdf.name}`}
              >
                View PDFs
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < pdfs.length && (
          <div className="explore-load-container ">
            <button
              className="explore-load-more-button" // Unique class name as requested
              onClick={handleLoadMore}
              disabled={loadingMore}
              aria-label="Load More PDFs"
            >
              {loadingMore ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}

        {/* Modal for displaying PDF links */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="PDF Links"
          className="modal-content"
          overlayClassName="modal-overlay"
          ariaHideApp={false} // Add this line if you encounter accessibility warnings
        >
          <button
            onClick={closeModal}
            className="modal-close-button"
            aria-label="Close Modal"
          >
            <IoClose size={20} />
          </button>
          {selectedPdf && (
            <div className="modal-body">
              <h3>{selectedPdf.name} - PDFs</h3>
              <ul>
                {selectedPdf.pdfs.map((pdfUrl, pdfIndex) => {
                  const filename = pdfUrl.split('/').pop();
                  return (
                    <li key={pdfIndex}>
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        {filename}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default ExplorePage;
