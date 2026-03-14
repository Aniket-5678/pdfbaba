import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const QuizIntroSlider = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("/api/v1/quizzes/all");

        // only 10 quizzes
        setQuizzes(res.data.slice(0, 10));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl p-5 animate-pulse ${
        isDark
          ? "bg-white/5 border border-white/10"
          : "bg-white shadow border-gray-200"
      }`}
    >
      <div className="h-5 w-32 rounded bg-gray-300/40 mb-3"></div>
      <div className="h-4 w-full rounded bg-gray-300/40 mb-2"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300/40"></div>
      <div className="mt-4 h-10 w-full rounded bg-gray-300/40"></div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto my-12 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

  <h2
    className={`font-light tracking-tight ${
      isDark ? "text-white" : "text-gray-900"
    } text-[0.85rem] sm:text-[1.4rem] md:text-[1.9rem]`}
  >
    Sharpen Your Knowledge with Quizzes
  </h2>

  <button
    onClick={() => navigate("/quizplaylist")}
    className="px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-sm md:text-base rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition whitespace-nowrap"
  >
    View All
  </button>

</div>


      {/* Slider */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        >
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl p-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-200"
                  : "bg-white border-gray-200 hover:border-indigo-400 text-gray-900"
              }`}
              onClick={() => navigate(`/play/${quiz._id}`)}
            >
              <div className="text-xs font-semibold mb-2 text-indigo-500">
                QUIZ
              </div>

              <h3 className="font-semibold text-lg sm:text-xl truncate">
                {quiz.title}
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500 line-clamp-3">
                {quiz.category}
              </p>

              <button className="mt-4 w-full py-2.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
                Start Quiz →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hide Scrollbar */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

    </section>
  );
};

export default QuizIntroSlider;
