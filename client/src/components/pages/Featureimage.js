import React from "react";
import { Link } from "react-router-dom";
import FeatureImage from "../images/featuresbanner.png";
import { useTheme } from "../context/ThemeContext";

const Featureimage = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="px-4 sm:px-8 py-16 font-[Poppins]">
      <div
        className={`relative max-w-7xl mx-auto rounded-3xl overflow-hidden transition-all duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] border border-white/10 shadow-2xl shadow-black/40"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-gray-200 shadow-xl"
        }`}
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-10 items-center p-6 sm:p-12">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h2
              className={`text-2xl sm:text-4xl font-bold leading-tight mb-5 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Your Gateway to <span className="text-blue-600">Smart Learning</span>
            </h2>

            <p
              className={`mb-6 text-sm sm:text-base leading-relaxed max-w-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              PDF Baba brings structured learning resources in one place.
              Learn faster with organized study materials designed for students
              and self-learners.
            </p>

            {/* FEATURES */}
            <div className="space-y-3 mb-8 text-sm sm:text-base">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Tech Notes & Latest Development Concepts</span>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span>Personal Development & Motivation PDFs</span>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>Business, Finance & Startup Learning Materials</span>
              </div>
            </div>

            {/* CTA */}
            <Link to="/discover-more">
              <button className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                Discover More →
              </button>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>

            <img
              src={FeatureImage}
              alt="PDF Baba Learning"
              className="relative w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featureimage;