import React from "react";
import { Link } from "react-router-dom";
import FeatureImage from "../images/featuresbanner.png";
import { useTheme } from "../context/ThemeContext";

const Featureimage = () => {
  const [theme] = useTheme();

  return (
    <div
      className={`flex flex-col-reverse sm:flex-row items-center justify-between w-[90%] max-w-[1200px] mx-auto my-12 rounded-lg overflow-hidden shadow-lg transition-all 
      ${theme === "dark" ? "bg-[#2d2d2d] text-white" : "bg-[#f8f8f8] text-[#333]"}`}
    >
      {/* Left Content Section */}
      <div className="flex-1 p-8 text-center sm:text-left font-[Poppins]">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Your Gateway to Smart Learning
        </h2>

        <p className="text-sm sm:text-lg leading-relaxed mb-6">
          At PDF Baba, we provide a one-stop solution for students and learners. Explore an extensive collection of educational resources across various categories, all tailored for your learning needs.
        </p>

        <p className="text-sm sm:text-lg leading-relaxed mb-4">
          Our platform includes:
        </p>

        <ul className="list-disc pl-6 text-sm sm:text-lg leading-relaxed mb-6">
          <li>Space Notes and Exploration</li>
          <li>Spiritual Insights and Guidance</li>
          <li>Tech Notes and Latest Innovations</li>
          <li>Health Education and Wellness Resources</li>
          <li>Personal Development and Motivational PDFs</li>
        </ul>

        <Link to="/discover-more">
          <button
            className="px-6 py-3 rounded-full text-white font-semibold transition-all
            bg-blue-600 hover:bg-blue-700 active:scale-95"
          >
            Discover More
          </button>
        </Link>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={FeatureImage}
          alt="PDF Baba"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Featureimage;
