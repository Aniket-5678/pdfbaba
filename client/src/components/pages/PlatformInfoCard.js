import React from "react";
import { FaReact, FaDatabase, FaLaptopCode } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import exploreImage from "../images/explore.png";
import { useNavigate } from "react-router-dom";

const PlatformInfoCard = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="relative flex justify-center">

          <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full -z-10"></div>

          <img
            src={exploreImage}
            alt="Learning Platform"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* Heading */}
          <h2 className="text-[1.1rem] sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 dark:text-white leading-snug mb-5">
            Explore Knowledge with{" "}
            <span className="text-blue-600">PDF Baba</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            PDF Baba is a free learning platform where you can access structured
            study notes, technology tutorials and educational resources.
            Improve your skills with curated PDFs designed for students,
            developers and self learners.
          </p>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/10">
              <FaLaptopCode className="text-blue-600 text-lg" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                buisness finance 
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/10">
              <FaDatabase className="text-green-600 text-lg" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                Tech Tutorials
              </span>
            </div>

      
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={handleExploreClick}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-lg transition duration-300 active:scale-95"
          >
            Explore Learning →
          </button>

        </div>

      </div>

    </section>
  );
};

export default PlatformInfoCard;