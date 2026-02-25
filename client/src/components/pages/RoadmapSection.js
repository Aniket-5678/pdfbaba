import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const RoadmapSection = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps")
      .then((res) => setRoadmaps(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80 rounded-2xl p-5 animate-pulse ${
        isDark ? "bg-white/5 border border-white/10" : "bg-white shadow border-gray-200"
      }`}
    >
      <div className="h-5 w-32 rounded bg-gray-300/40 mb-3"></div>
      <div className="h-3 w-full rounded bg-gray-300/40 mb-2"></div>
      <div className="h-3 w-3/4 rounded bg-gray-300/40"></div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* Heading */}
      <h2
        className={`mb-6 font-light tracking-tight ${
          isDark ? "text-white" : "text-gray-900"
        } text-[0.9rem] sm:text-[1.5rem] md:text-[2rem]`}
      >
         Your Career Path Starts Here
      </h2>

      {/* Slider Container */}
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
              <div className="text-xs font-semibold mb-2 text-indigo-500">ROADMAP</div>
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