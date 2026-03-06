import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useTheme } from "../context/ThemeContext";
import SmallBannerAd from "./SmallBannerAd";
import SocialBarAd from "../pages/SocialBarAd";
import NativeAd from "./NativeAd";

Modal.setAppElement("#root");

const ExplorePage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [downloading, setDownloading] = useState({});
  const [theme] = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get("/api/v1/questionpaper/all-questions");
        if (res.data.success) {
          setPdfs(res.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPdf(null);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoadingMore(false);
    }, 1000);
  };

  const handleDownload = async (url, filename) => {
    try {
      setDownloading((prev) => ({ ...prev, [filename]: true }));

      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.log(err);
    } finally {
      setDownloading((prev) => ({ ...prev, [filename]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] gap-3">
        <ClipLoader size={40} color="#2563eb" />
        <span className="text-gray-600">Loading PDF Notes...</span>
      </div>
    );
  }

  return (
    <Layout>

      <section className="max-w-7xl mx-auto px-4 py-16 mt-12">

        <SmallBannerAd />
        <SocialBarAd />

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-[1.1rem] sm:text-2xl md:text-3xl font-light tracking-wide mb-3">
            Explore Our PDF Collection
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Browse structured study materials including question papers,
            notes and educational resources to improve your learning.
          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

          {pdfs.slice(0, visibleCount).map((pdf) => (
            <div
              key={pdf._id}
              className={`p-4 rounded-xl transition hover:shadow-xl hover:-translate-y-1
              ${isDark ? "bg-gray-800 text-white" : "bg-white shadow-md"}
              `}
            >

              <h3 className="text-sm sm:text-base font-medium mb-2 line-clamp-2">
                {pdf.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-3 mb-4">
                {pdf.description}
              </p>

              <button
                onClick={() => openModal(pdf)}
                className="w-full text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                View PDFs
              </button>

            </div>
          ))}
        </div>

        {/* LOAD MORE */}

        {visibleCount < pdfs.length && (

          <div className="flex justify-center mt-10">

            <button
              onClick={handleLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {loadingMore ? (
                <ClipLoader size={18} color="#fff" />
              ) : (
                "Load More"
              )}
            </button>

          </div>

        )}

      </section>

      {/* MODAL */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="relative bg-white dark:bg-gray-900 max-w-lg mx-auto mt-32 p-6 rounded-xl shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
      >

        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
        >
          <IoClose size={22} />
        </button>

        {selectedPdf && (

          <div>

            <h3 className="text-lg font-semibold mb-5">
              {selectedPdf.name} PDFs
            </h3>

            <ul className="space-y-4">

              {selectedPdf.pdfs.map((pdfUrl, index) => {

                const filename = pdfUrl.split("/").pop();

                return (

                  <li
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col gap-3"
                  >

                    <span className="text-sm truncate">
                      {filename}
                    </span>

                    <div className="flex gap-2">

                      {/* VIEW BUTTON */}

                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs"
                      >
                        <FiExternalLink size={14} />
                        View
                      </a>

                      {/* DOWNLOAD BUTTON */}

                      <button
                        onClick={() =>
                          handleDownload(pdfUrl, filename)
                        }
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs"
                      >

                        <FiDownload size={14} />

                        {downloading[filename]
                          ? "Downloading..."
                          : "Download"}

                      </button>

                    </div>

                  </li>

                );
              })}

            </ul>

            <div className="text-xs text-gray-500 mt-5 space-y-1">
              <p>PC / iOS users: click "View" to open PDF.</p>
              <p>Android users: use Download button.</p>
            </div>

          </div>

        )}

      </Modal>

      <NativeAd />

    </Layout>
  );
};

export default ExplorePage;