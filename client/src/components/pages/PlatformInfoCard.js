import React from "react";
import { FaReact, FaDatabase, FaLaptopCode } from "react-icons/fa";
import exploreImage from "../images/explore.png";
import { useNavigate } from "react-router-dom";

const PlatformInfoCard = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => navigate("/explore");

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-lg flex flex-col md:flex-row gap-8 transition">
      
      {/* Image Section */}
      <div className="flex justify-center md:w-1/2">
        <img
          src={exploreImage}
          alt="Learning Platform"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold font-[Poppins] text-gray-900 dark:text-white mb-4">
          Welcome to PDF Baba Learning Hub
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-[Poppins] mb-5">
          Discover high-quality study materials, notes and educational PDFs.
          Whether you're learning 12th Science subjects, exploring tech like
          React or Node, or diving into Space & Spiritual knowledge — we’ve got
          you covered.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-[Poppins]">
            <FaLaptopCode className="text-blue-500 dark:text-blue-300 text-xl" />
            <span>12th Science - Comprehensive Notes</span>
          </div>

          <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-[Poppins]">
            <FaDatabase className="text-green-500 dark:text-green-300 text-xl" />
            <span>Tech Zone - React JS, Node JS, JavaScript</span>
          </div>

          <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-[Poppins]">
            <FaReact className="text-purple-500 dark:text-purple-300 text-xl" />
            <span>Spiritual Insights - Chakra Practices</span>
          </div>

          <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-[Poppins]">
            <FaReact className="text-orange-500 dark:text-orange-300 text-xl" />
            <span>Space Studies - Earth and Beyond</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleExploreClick}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-[Poppins] rounded-lg shadow-md transition active:scale-95"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default PlatformInfoCard;
