import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Layout from "../Layout/Layout";
import BannerAd from "./BannerAd";
import SocialBannerAd from "./SocialBarAd";
import { useTheme } from "../context/ThemeContext";

const Categoryworks = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);

    const getAllCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/category/get-category");
        setCategories(data.category);
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    getAllCategories();
  }, []);

  return (
    <Layout>
      {/* FULL SCREEN LOADER */}
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-[9999] ${
            theme === "dark" ? "bg-black/80" : "bg-white/80"
          }`}
        >
          <ClipLoader size={80} color="#007bff" />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        className={`py-10 px-4 text-center font-[Poppins] mt-28 ${
          theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#f9fcfc] text-gray-800"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Explore Categories</h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link key={category._id} to={`/category/${category.slug}`} className="no-underline">
              <div
                className={`p-4 rounded-lg h-[200px] flex flex-col justify-between transition-transform duration-300 hover:scale-105 shadow ${
                  theme === "dark"
                    ? "bg-[#333] shadow-white/10 hover:shadow-white/20"
                    : "bg-white shadow-black/10 hover:shadow-black/20"
                }`}
              >
                <h3 className="font-bold text-sm sm:text-lg">{category.name}</h3>

                <p
                  className={`text-xs sm:text-sm line-clamp-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {category.description || "Explore this category for more information."}
                </p>

                <button
                  className={`mt-3 py-1 text-sm font-medium rounded-md ${
                    theme === "dark"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3">Why Choose Us?</h3>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We provide the most comprehensive and up-to-date information in each category to help
            you achieve your goals. Our platform is designed to enhance your learning experience.
          </p>
        </div>

        {/* Ads */}
        <div className="mt-10">
          <BannerAd />
        </div>
        <div className="mt-4">
          <SocialBannerAd />
        </div>
      </div>
    </Layout>
  );
};

export default Categoryworks;
