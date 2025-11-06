import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import SmallBannerAd from "../pages/SmallBannerAd";
import SocialBarAd from "./SocialBarAd";
import NativeAd from "./NativeAd";
import { useTheme } from "../context/ThemeContext";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [downloading, setDownloading] = useState({});
  const [page, setPage] = useState(1);
  const [theme] = useTheme();

  const productsPerPage = 9;
  const paginatedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/questionpaper/product-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
      setLoading(false);
    };
    fetchData();
  }, [params.slug]);

  const handleDownload = async (url, filename) => {
    try {
      setDownloading((prev) => ({ ...prev, [filename]: true }));
      const secureUrl = url.replace("http://", "https://");
      const response = await fetch(secureUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.log("Download error:", err);
    } finally {
      setDownloading((prev) => ({ ...prev, [filename]: false }));
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={70} color="#3b82f6" />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div
            className={`text-center py-10 mt-24 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-semibold">{category.name}</h2>
            <p className="text-sm opacity-75">Explore resources for {category.name}</p>
          </div>

          {/* PRODUCT GRID */}
          <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => setModalOpen(true) || setSelectedProduct(product)}
                className={`cursor-pointer p-4 rounded-xl shadow transition-transform duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white shadow-black/40"
                    : "bg-white text-gray-900 shadow-gray-300"
                }`}
              >
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs opacity-70 line-clamp-2">{product.description}</p>

                {product.pdfs?.length > 0 && (
                  <button
                    className={`mt-3 w-full py-1 text-sm rounded-md ${
                      theme === "dark"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-700 hover:bg-blue-800 text-white"
                    }`}
                  >
                    View PDFs
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded-md border ${
                  page === idx + 1
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 border-gray-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <SmallBannerAd />

          {/* MODAL */}
          {modalOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
              <div
                className={`w-[90%] max-w-lg p-5 rounded-lg ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">{selectedProduct.name}</h3>
                  <button className="text-xl" onClick={() => setModalOpen(false)}>
                    ✖
                  </button>
                </div>

                {selectedProduct.pdfs.map((pdf, i) => {
                  const filename = pdf.split("/").pop();
                  return (
                    <div key={i} className="mb-3 p-3 border rounded-md flex flex-col gap-2">
                      <a
                        href={pdf}
                        target="_blank"
                        className="text-blue-500 underline text-sm break-all"
                        rel="noreferrer"
                      >
                        {filename}
                      </a>

                      <button
                        onClick={() => handleDownload(pdf, filename)}
                        className="py-1 text-sm bg-blue-600 text-white rounded-md"
                      >
                        {downloading[filename] ? "Downloading..." : "Download"}
                      </button>
                    </div>
                  );
                })}

                <SocialBarAd />
              </div>
            </div>
          )}

          <NativeAd />
        </>
      )}
    </Layout>
  );
};

export default CategoryProduct;
