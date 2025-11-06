import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";
import SmallBannerAd from "./SmallBannerAd";

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme] = useTheme();
  const navigate = useNavigate();

  const cardsPerPage = 15;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error("Error fetching roadmaps:", err));
  }, []);

  const filteredRoadmaps = roadmaps.filter((roadmap) =>
    roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoadmaps.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRoadmaps = filteredRoadmaps.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const cardStyle =
    theme === "dark"
      ? "bg-white/10 border border-white/10 shadow-lg text-gray-200"
      : "bg-white/70 border border-white/30 shadow-lg text-gray-800";

  return (
    <Layout>
      <div className="pt-24 px-4 max-w-6xl mx-auto">
        <h2
          className={`text-center font-bold mb-6 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          } text-2xl sm:text-3xl`}
        >
          📌 Explore Roadmaps
        </h2>

        <div className="flex justify-center mb-4">
          <SmallBannerAd />
        </div>

        <input
          type="text"
          placeholder="Search by category..."
          className={`w-full px-4 py-3 rounded-lg mb-6 outline-none border ${
            theme === "dark"
              ? "bg-[#1e1e1e] text-gray-200 border-gray-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        {currentRoadmaps.length === 0 ? (
          <p className="text-center mt-5 text-gray-400 text-lg">
            No roadmaps found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentRoadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className={`p-6 rounded-2xl cursor-pointer text-center backdrop-blur-md transition-transform duration-300 hover:scale-105 ${cardStyle}`}
                onClick={() => navigate(`/roadmap/${roadmap._id}`)}
              >
                <p className="font-semibold capitalize text-sm sm:text-base">
                  {roadmap.category}
                </p>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === idx + 1
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6">
          <NativeAd />
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;
