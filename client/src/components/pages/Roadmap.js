import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";
import SmallBannerAd from "./SmallBannerAd";
import { Search } from "lucide-react";

/* ================= Skeleton Card ================= */
const SkeletonCard = ({ dark }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 border ${
      dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
    }`}
  >
    <div className="animate-pulse space-y-4">
      <div className="h-3 w-20 bg-indigo-400/40 rounded"></div>
      <div className="h-5 w-3/4 bg-gray-300/40 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-300/40 rounded"></div>
    </div>
  </div>
);

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme] = useTheme();
  const navigate = useNavigate();

  const cardsPerPage = 12;
  const dark = theme === "dark";

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error("Error fetching roadmaps:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRoadmaps = useMemo(() => {
    return roadmaps.filter((roadmap) =>
      roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roadmaps, searchQuery]);

  const totalPages = Math.ceil(filteredRoadmaps.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentRoadmaps = filteredRoadmaps.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="pt-24 mt-5 pb-16 px-4 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-[1.1rem] sm:text-4xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Developer Learning Roadmaps
          </h1>
          <p className={`mt-3 max-w-2xl mx-auto text-[1.1rem] sm:text-base ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Step-by-step structured paths to master technologies faster with clear learning direction.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <SmallBannerAd />
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${dark ? "text-gray-400" : "text-gray-500"}`} />
          <input
            disabled={loading}
            type="text"
            placeholder="Search roadmap (React, Node, Java, Python...)"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
              dark
                ? "bg-white/5 border-white/10 text-gray-200 placeholder:text-gray-500"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[...Array(cardsPerPage)].map((_, i) => <SkeletonCard key={i} dark={dark} />)}
          </div>
        ) : currentRoadmaps.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-10">No roadmaps found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {currentRoadmaps.map((roadmap, i) => (
              <div
                key={roadmap._id}
                onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                className={`group relative cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border ${
                  dark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 hover:border-indigo-400"
                }`}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

                <div className="text-xs font-semibold mb-3 text-indigo-500">
                  ROADMAP {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className={`font-semibold capitalize text-base sm:text-lg leading-snug ${dark ? "text-white" : "text-gray-900"}`}>
                  {roadmap.category}
                </h3>

                <div className={`mt-6 text-xs font-medium flex items-center justify-between ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  <span>View Path</span>
                  <span className="group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`min-w-[38px] h-10 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === idx + 1
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : dark
                      ? "bg-white/5 text-gray-300 hover:bg-white/10"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14">
          <NativeAd />
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;