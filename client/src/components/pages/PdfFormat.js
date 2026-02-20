import React from "react";
import { FaReact, FaDatabase, FaLaptopCode, FaGlobe } from "react-icons/fa";
import exploreImage from "../images/explore.png";
import { useNavigate } from "react-router-dom";

const PlatformInfoCard = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => navigate("/explore");

  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#121212] font-[Poppins]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* IMAGE SIDE */}
        <div className="relative flex justify-center">
          <div className="absolute -z-10 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

          <img
            src={exploreImage}
            alt="Learning Platform"
            className="w-full max-w-md rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* CONTENT SIDE */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <span className="inline-block mb-5 px-4 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
            All-in-One Learning Platform
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-semibold leading-tight mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Welcome to PDF Baba Learning Hub
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Access structured study materials, exam-ready notes and premium
            educational PDFs. From academic subjects to modern technologies and
            deep knowledge topics — everything is organized in one platform to
            help you learn faster and smarter.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm font-medium">
              <FaLaptopCode /> 12th Science Notes
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-300 text-sm font-medium">
              <FaDatabase /> React • Node • JS
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-sm font-medium">
              <FaReact /> Chakra Knowledge
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-300 text-sm font-medium">
              <FaGlobe /> Space Studies
            </div>

          </div>

          {/* CTA */}
          <button
            onClick={handleExploreClick}
            className="px-8 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 active:scale-95 transition shadow-lg"
          >
            Explore Learning Content
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlatformInfoCard;