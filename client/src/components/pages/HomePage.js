import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "./Banner";
import axios from "axios";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import Featurepdf from "./Featurepdf";
import PdfSearchGuide from "./PdfSearchGuide";
import PlatformInfoCard from "./PlatformInfoCard";
import PdfFormat from "./PdfFormat";
import Faq from "./Faq";
import Featureimage from "./Featureimage";
import Services from "./Services";
import QuizIntro from "./QuizIntro";
import SocialBarAd from "./SocialBarAd";
import RoadmapSection from "./RoadmapSection";

Modal.setAppElement("#root");

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState({});
  const [theme] = useTheme();

  const productsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const catRes = await axios.get("/api/v1/category/get-category");
      setCategories(catRes.data.category);

      const prodRes = await axios.get(
        "/api/v1/questionpaper/all-questions"
      );
      if (prodRes.data.success) {
        setProducts(prodRes.data.data);
      }
    };

    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  // ✅ DIRECT DOWNLOAD LOGIC
  const handleDownload = async (url, filename) => {
    try {
      setDownloading((prev) => ({ ...prev, [filename]: true }));

      const secureUrl = url.replace("http://", "https://");
      const response = await fetch(secureUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log("Download error:", err);
    } finally {
      setDownloading((prev) => ({ ...prev, [filename]: false }));
    }
  };

  // ✅ PAGINATION LOGIC
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Layout>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        } min-h-screen`}
      >
        <Banner />

        {/* ================= CATEGORY SECTION ================= */}
{/* ================= NETFLIX STYLE CATEGORY SECTION ================= */}
{/* ================= GLASS CATEGORY SECTION ================= */}
<div className="max-w-7xl mx-auto px-4 py-12">

  {/* Heading */}
  <h3 className="text-[0.9rem] sm:text-2xl font-light mb-6 tracking-wide">
    Browse Categories
  </h3>

  {/* Horizontal Scroll */}
  <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4">

    {categories.map((category) => (
      <Link
        key={category._id}
        to={`/category/${category.slug}`}
        className="flex-shrink-0 w-[130px] sm:w-[160px] group"
      >
        <div
          className={`
          h-[80px] sm:h-[95px]
          rounded-xl
          backdrop-blur-lg
          border
          flex flex-col items-center justify-center
          transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          ${
            theme === "dark"
              ? "bg-white/10 border-white/20 hover:bg-blue-600"
              : "bg-white/60 border-gray-200 hover:bg-blue-600"
          }
        `}
        >
          {/* Category Name */}
          <h4 className="text-[0.85rem] sm:text-sm font-medium text-center group-hover:text-white transition px-2 whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {category.name}
          </h4>

          {/* View Notes */}
          <p className="text-[10px] sm:text-[11px] mt-1 opacity-70 group-hover:text-white transition">
            View Notes →
          </p>
        </div>
      </Link>
    ))}

  </div>
</div>

        <Services />
        <RoadmapSection />
        <QuizIntro />

        {/* ================= PRODUCTS ================= */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {paginatedProducts.length === 0 ? (
            <p className="text-center text-lg opacity-70">
              No PDFs found.
            </p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`p-6 rounded-2xl shadow-lg border transition hover:shadow-2xl ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <h3 className="text-lg font-bold mb-3">
                      {product.name}
                    </h3>

                    <p className="text-sm opacity-80 mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    <button
                      onClick={() => openModal(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                    >
                      View PDFs
                    </button>
                  </div>
                ))}
              </div>

              {/* ================= PAGINATION ================= */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-3 flex-wrap">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentPage(index + 1);
                        window.scrollTo({ top: 500, behavior: "smooth" });
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white shadow-md"
                          : theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ================= MODAL ================= */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          className="relative bg-white dark:bg-gray-800 p-8 max-w-xl w-full mx-auto rounded-2xl shadow-2xl outline-none"
          overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <IoClose size={24} />
          </button>

          {selectedProduct && (
            <>
              <h3 className="text-xl font-bold mb-6 border-b pb-3">
                {selectedProduct.name} - PDFs
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {selectedProduct.pdfs.map((pdfUrl, index) => {
                  const filename = pdfUrl.split("/").pop();

                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-700"
                    >
                      <span className="text-sm truncate break-all">
                        {filename}
                      </span>

                      <div className="flex gap-2">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
                        >
                          View
                        </a>

                        <button
                          onClick={() =>
                            handleDownload(pdfUrl, filename)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
                        >
                          {downloading[filename]
                            ? "Downloading..."
                            : "Download"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-xs opacity-70">
                <p>PC/iOS: Click View to open PDF.</p>
                <p>Android: Use Download button.</p>
              </div>

              <div className="mt-6">
                <SocialBarAd />
              </div>
            </>
          )}
        </Modal>

        <PdfFormat />
        <Featurepdf />
        <PlatformInfoCard />
        <PdfSearchGuide />
        <Faq />
        <Featureimage />
      </div>
    </Layout>
  );
};

export default HomePage;