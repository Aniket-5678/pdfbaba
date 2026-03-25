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
import Faq from "./Faq";
import Featureimage from "./Featureimage";
import Services from "./Services";
import QuizIntro from "./QuizIntro";
import SocialBarAd from "./SocialBarAd";
import RoadmapSection from "./RoadmapSection";
import Categories from "./Categories";

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

  {/* ================= CATEGORY SECTION ================= */}
<section className=" py-12">
  <Categories />
</section>

{/* Heading */}
{/* Categories Section */}
<div className="mt-12 sm:mt-14 md:mt-16">
  {/* Heading */}
  <div className="mb-6 sm:mb-8">
    <p className="text-blue-600 font-light tracking-[2px] uppercase text-[11px] sm:text-xs mb-2">
      Study Resources
    </p>

    <h3
      className={`text-[1rem] sm:text-2xl md:text-3xl font-light tracking-wide leading-tight ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}
    >
      Browse Study PDF Notes by Category
    </h3>

    <p
      className={`mt-2 text-[12px] sm:text-sm md:text-base max-w-2xl leading-relaxed ${
        theme === "dark" ? "text-gray-400" : "text-slate-500"
      }`}
    >
      Explore well-organized study PDF notes, learning materials, and academic
      resources across multiple subjects and technical categories.
    </p>
  </div>

  {/* Horizontal Scroll */}
  <div className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar pb-2">
    {categories.map((category, index) => (
      <Link
        key={category._id}
        to={`/category/${category.slug}`}
        className="flex-shrink-0 w-[145px] sm:w-[180px] md:w-[210px] group"
      >
        <div
          className={`h-[100px] sm:h-[120px] md:h-[130px] rounded-2xl border px-4 py-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            theme === "dark"
              ? "bg-gray-900 border-gray-800 hover:bg-blue-600"
              : "bg-white border-gray-200 hover:bg-blue-600"
          }`}
        >
          {/* Top Tag */}
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] sm:text-[11px] tracking-[1.5px] uppercase transition ${
                theme === "dark"
                  ? "text-blue-400 group-hover:text-white"
                  : "text-blue-600 group-hover:text-white"
              }`}
            >
              Category
            </span>

            <span
              className={`text-[10px] sm:text-xs transition ${
                theme === "dark"
                  ? "text-gray-500 group-hover:text-blue-100"
                  : "text-slate-400 group-hover:text-blue-100"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Category Name */}
          <div>
          <h4
  className={`text-[0.78rem] sm:text-[0.85rem] md:text-[0.9rem] font-light tracking-wide leading-snug transition line-clamp-2 ${
    theme === "dark"
      ? "text-white group-hover:text-white"
      : "text-slate-900 group-hover:text-white"
  }`}
>
  {category.name}
</h4>

            <p
              className={`text-[10px] sm:text-[11px] mt-2 transition ${
                theme === "dark"
                  ? "text-gray-400 group-hover:text-blue-100"
                  : "text-slate-500 group-hover:text-blue-100"
              }`}
            >
              Explore notes and PDFs →
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>

  {/* Mobile Hint */}
  {categories.length > 0 && (
    <div className="md:hidden mt-4 text-center">
      <p
        className={`text-[11px] sm:text-xs ${
          theme === "dark" ? "text-gray-500" : "text-slate-500"
        }`}
      >
        Swipe to explore more categories →
      </p>
    </div>
  )}
</div>
</div>

        <RoadmapSection />
        <QuizIntro />
        <Services />

        {/* ================= PRODUCTS ================= */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {paginatedProducts.length === 0 ? (
            <p className="text-center text-lg opacity-70">
              No PDFs found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {paginatedProducts.map((product) => (
    <div
      key={product._id}
      className={`p-4 sm:p-6 rounded-2xl shadow-lg border transition hover:shadow-2xl ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">
        {product.name}
      </h3>

      <p className="text-xs sm:text-sm opacity-80 mb-4 sm:mb-6 line-clamp-3">
        {product.description}
      </p>

      <button
        onClick={() => openModal(product)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold transition"
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