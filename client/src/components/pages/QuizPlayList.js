import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";
import SmallBannerAd from "./SmallBannerAd";

/* ---------------- Skeleton Card ---------------- */
const QuizSkeleton = ({ isDark }) => {
  return (
    <div
      className={`rounded-xl h-52 p-4 animate-pulse ${
        isDark ? "bg-white/5" : "bg-white"
      }`}
    >
      <div className="h-5 w-3/4 bg-gray-300/40 rounded mb-3"></div>
      <div className="h-4 w-1/2 bg-gray-300/30 rounded mb-8"></div>

      <div className="mt-auto">
        <div className="h-10 w-full bg-gray-300/40 rounded-lg"></div>
      </div>
    </div>
  );
};

const QuizPlayList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const scrollRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/v1/quizzes/all");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Unique Categories ---------------- */
  const categories = ["All", ...new Set(quizzes.map((q) => q.category))];

  /* ---------------- Filtering ---------------- */
  const filteredQuizzes = quizzes
    .filter((quiz) =>
      quiz.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((quiz) =>
      selectedCategory === "All" ? true : quiz.category === selectedCategory
    );

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Layout>
      <div
        className={`min-h-screen mt-[100px] px-4 py-6 flex flex-col items-center ${
          isDark ? "bg-[#121212] text-white" : "bg-[#f5f7fb] text-black"
        }`}
      >
        {/* Heading */}
      <h2 className="text-center font-medium font-[Poppins] mb-4 text-[1.3rem] sm:text-[1.7rem]">
  Practice MCQ Quizzes to Improve Your Skills
</h2>


        <div className="mb-5 w-full max-w-5xl">
          <SmallBannerAd />
        </div>

        {/* Category Slider */}
        <div className="w-full max-w-6xl mb-6 relative flex items-center">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center"
          >
            ◀
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-hidden px-10"
          >
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-[Poppins] whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : isDark
                    ? "bg-[#1e1e1e] hover:bg-[#2a2a2a]"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center"
          >
            ▶
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-8 relative">
          <input
            type="text"
            placeholder="Search quiz topic..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full px-5 py-3 rounded-full font-[Poppins] outline-none border shadow-sm transition-all focus:shadow-md ${
              isDark
                ? "bg-[#1e1e1e] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-500"
            }`}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-6xl">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <QuizSkeleton key={i} isDark={isDark} />
            ))
          ) : currentQuizzes.length === 0 ? (
            <div className="col-span-full text-center py-16 opacity-70">
              <p className="text-lg font-semibold">No quizzes found 😕</p>
              <p className="text-sm mt-2">Try another keyword</p>
            </div>
          ) : (
            currentQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className={`rounded-2xl h-52 flex flex-col justify-between transition-all duration-300 shadow-md p-5 cursor-pointer group hover:-translate-y-1 ${
                  isDark
                    ? "bg-white/5 backdrop-blur hover:shadow-white/10"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                <div>
                  <h3 className="font-bold font-[Poppins] text-[1rem] truncate group-hover:text-blue-500 transition">
                    {quiz.title}
                  </h3>

                  <p className="text-sm opacity-70 mt-1 truncate">
                    {quiz.category}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/play/${quiz._id}`)}
                  className="w-full py-2.5 rounded-xl font-semibold font-[Poppins] bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Start Quiz →
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex gap-2 mt-10 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white shadow"
                    : isDark
                    ? "bg-[#1e1e1e] hover:bg-[#2a2a2a]"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <NativeAd />
    </Layout>
  );
};

export default QuizPlayList;
