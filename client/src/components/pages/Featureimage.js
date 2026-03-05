import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Featureimage = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="px-4 sm:px-8 py-20 font-[Poppins]">
      <div
        className={`relative max-w-7xl mx-auto rounded-3xl overflow-hidden transition-all duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] border border-white/10 shadow-2xl shadow-black/40"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-gray-200 shadow-xl"
        }`}
      >
        {/* Soft Glow Effects */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="relative grid md:grid-cols-2 gap-16 items-center p-8 sm:p-16">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h2
              className={`text-3xl sm:text-5xl font-semibold leading-tight mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Your Gateway to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Smart Learning
              </span>
            </h2>

            <p
              className={`mb-8 text-sm sm:text-lg leading-relaxed max-w-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Structured study resources designed to accelerate your learning.
              Explore categorized PDFs, tech notes, business materials and
              self-growth content — all in one place.
            </p>

            {/* FEATURES LIST */}
            <div className="space-y-4 mb-10 text-sm sm:text-base">
              {[
                "Tech Notes & Development Concepts",
                "Personal Growth & Motivation PDFs",
                "Business, Finance & Startup Resources",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/discover-more">
              <button className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                Discover More →
              </button>
            </Link>
          </div>

          {/* RIGHT VISUAL UI DESIGN (NO IMAGE) */}
          <div className="relative flex justify-center items-center">

            {/* Floating Card 1 */}
            <div className={`absolute top-0 left-8 w-44 h-28 rounded-2xl backdrop-blur-lg border 
              ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}
              flex items-center justify-center text-sm font-medium animate-float`}
            >
              📘 1200+ PDFs
            </div>

            {/* Floating Card 2 */}
            <div className={`absolute bottom-0 right-8 w-52 h-32 rounded-2xl backdrop-blur-lg border 
              ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}
              flex items-center justify-center text-sm font-medium animate-float delay-200`}
            >
              🚀 Smart Categorization
            </div>

            {/* Main Center Card */}
            <div
              className={`relative w-72 sm:w-96 h-56 sm:h-64 rounded-3xl flex items-center justify-center text-center text-lg font-semibold
              ${
                isDark
                  ? "bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-white/10 backdrop-blur-xl"
                  : "bg-white shadow-2xl border border-gray-200"
              }`}
            >
              📚 Learn • Grow • Build
            </div>

          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Featureimage;