import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";
import SmallBannerAd from "./SmallBannerAd";

const QuizPlayList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDark = theme === "dark";

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
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

  return (
    <Layout>
      <div
        className={`min-h-screen mt-[100px] px-4 py-6 flex flex-col items-center ${
          isDark ? "bg-[#121212] text-white" : "bg-[#f5f5f5] text-black"
        }`}
      >
        <h2 className="text-center font-bold font-[Poppins] mb-4 text-[1.3rem] sm:text-[1.6rem]">
          🧠 Available Quizzes
        </h2>

        <div className="mb-4">
          <SmallBannerAd />
        </div>

        {/* Search Input */}
        <div className="w-full max-w-lg mb-6">
          <input
            type="text"
            placeholder="Search Quiz..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg font-[Poppins] outline-none border ${
              isDark ? "bg-[#2a2a2a] border-gray-600 text-white" : "bg-white border-gray-300 text-black"
            }`}
          />
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-6xl">
          {currentQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={`rounded-xl h-52 flex flex-col justify-between transition-all shadow-lg p-4 cursor-pointer ${
                isDark
                  ? "bg-white/5 backdrop-blur text-white hover:shadow-white/20"
                  : "bg-white text-black hover:shadow-xl"
              }`}
            >
              <div>
                <h3 className="font-bold font-[Poppins] text-[1rem] truncate">
                  {quiz.title}
                </h3>
                <p className="text-sm opacity-70 mt-1 truncate">{quiz.category}</p>
              </div>

              <button
                onClick={() => navigate(`/play/${quiz._id}`)}
                className="w-full py-2 rounded-lg font-semibold font-[Poppins] bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md font-semibold font-[Poppins] ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : isDark
                  ? "bg-[#2a2a2a] text-white"
                  : "bg-white text-black border"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <NativeAd />
    </Layout>
  );
};

export default QuizPlayList;
