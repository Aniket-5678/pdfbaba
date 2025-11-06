import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const QuizIntro = () => {
  const [theme] = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex justify-center px-2 sm:px-4 my-4 sm:my-6">
      <div
        className={`w-full max-w-[95vw] sm:max-w-[90vw] text-center p-4 sm:p-6 rounded-xl transition-all duration-300
        ${isDark ? "bg-[#121212] shadow-md shadow-white/10" : "bg-white shadow-md"}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Text Section */}
          <div className="flex-1 text-center sm:text-left">
            <h2
              className={`font-bold font-[Poppins] leading-snug 
              ${isDark ? "text-gray-200" : "text-gray-900"} 
              text-lg sm:text-2xl`}
            >
              Start Your Quiz Journey
            </h2>

            <p
              className={`mt-3 font-[Poppins] leading-relaxed max-w-xl mx-auto sm:mx-0
              ${isDark ? "text-gray-400" : "text-gray-700"}
              text-sm sm:text-base`}
            >
              Explore a variety of quizzes designed to challenge and expand your knowledge.
              Test your skills, track your progress, and enjoy learning in an interactive way!
            </p>
          </div>

          {/* Button */}
          <Link
            to="/quizplaylist"
            className={`w-full sm:w-[250px] text-center font-[Poppins] rounded-lg py-3 text-sm sm:text-base
            transition-all duration-200 font-semibold
            ${isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            Practice Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;
