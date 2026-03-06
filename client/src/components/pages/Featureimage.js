import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Featureimage = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="px-4 sm:px-8 py-14 font-[Poppins]">
      <div
        className={`max-w-6xl mx-auto rounded-2xl p-8 sm:p-12 transition
        ${
          isDark
            ? "bg-[#0f172a] border border-gray-800"
            : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <h2
              className={`text-2xl sm:text-3xl font-light leading-snug mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Smart Learning Resources in One Place
            </h2>

            <p
              className={`text-sm sm:text-base mb-6 leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Access organized study materials, technology notes, business
              guides and personal growth resources designed to help you learn
              faster and build real skills.
            </p>

            <Link to="/discover-more">
              <button className="px-6 py-2.5 text-sm font-medium text-white rounded-lg
              bg-blue-600 hover:bg-blue-700 transition">
                Explore Resources
              </button>
            </Link>
          </div>

          {/* RIGHT FEATURES */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            
            <div
              className={`p-4 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              📘 1200+ Study PDFs
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              🚀 Tech & Career Guides
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              💼 Business Resources
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              🌱 Self Growth Materials
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Featureimage;