import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const RoadmapSection = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps")
      .then((res) => {

        // only show 10 roadmaps
        setRoadmaps(res.data.slice(0, 10));

      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80 rounded-2xl p-5 animate-pulse ${
        isDark
          ? "bg-white/5 border border-white/10"
          : "bg-white shadow border-gray-200"
      }`}
    >
      <div className="h-5 w-32 rounded bg-gray-300/40 mb-3"></div>
      <div className="h-3 w-full rounded bg-gray-300/40 mb-2"></div>
      <div className="h-3 w-3/4 rounded bg-gray-300/40"></div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto my-12 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <h2
          className={`font-light tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          } text-[0.95rem] sm:text-[1.4rem] md:text-[1.9rem]`}
        >
          Your Career Path Starts Here
        </h2>

        {/* View All Button */}
        <button
          onClick={() => navigate("/roadmapdata")}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-[0.75rem] sm:text-sm md:text-base rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition whitespace-nowrap"
        >
          View All
        </button>

      </div>

      {/* Slider */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {roadmaps.map((roadmap) => (
            <Link
              key={roadmap._id}
              to={`/roadmap/${roadmap._id}`}
              className={`flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-200"
                  : "bg-white border-gray-200 hover:border-indigo-400 text-gray-900"
              }`}
            >
              <div className="text-xs font-semibold mb-2 text-indigo-500">
                ROADMAP
              </div>

              <h3 className="font-semibold text-lg sm:text-xl capitalize">
                {roadmap.category}
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500 line-clamp-3">
                {roadmap.description?.slice(0, 120)}...
              </p>

            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoadmapSection;
