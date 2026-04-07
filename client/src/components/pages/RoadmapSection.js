import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { PiPathBold } from "react-icons/pi";

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
        setRoadmaps(res.data.slice(0, 10));
      })
      .catch((err) => console.error("Error fetching roadmaps:", err))
      .finally(() => setLoading(false));
  }, []);

  const getRoadmapTitle = (roadmap) => {
    if (roadmap.title) return roadmap.title;
    if (roadmap.nodes && roadmap.nodes.length > 0) return roadmap.nodes[0].title;
    if (roadmap.slug) return roadmap.slug.replace(/-/g, " ");
    return roadmap.category || "Untitled Roadmap";
  };

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-[250px] sm:w-[290px] md:w-[330px] rounded-3xl p-5 sm:p-6 animate-pulse ${
        isDark
          ? "bg-white/5 border border-white/10"
          : "bg-white shadow border border-gray-200"
      }`}
    >
      <div className="h-5 w-28 rounded bg-gray-300/40 mb-4"></div>
      <div className="h-5 w-40 rounded bg-gray-300/40 mb-3"></div>
      <div className="h-4 w-full rounded bg-gray-300/40 mb-2"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300/40 mb-5"></div>
      <div className="flex gap-2 mb-5">
        <div className="h-7 w-20 rounded-full bg-gray-300/40"></div>
        <div className="h-7 w-24 rounded-full bg-gray-300/40"></div>
      </div>
      <div className="h-11 w-full rounded-xl bg-gray-300/40"></div>
    </div>
  );

  return (
    <section
      className={`w-full py-12 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-gray-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 md:mb-10">
          <div>
            <p className="text-blue-600 font-light tracking-[2px] uppercase text-[11px] sm:text-xs mb-2">
              Guided Learning
            </p>

            <h2
              className={`font-light leading-tight tracking-wide text-[1.1rem] sm:text-2xl md:text-4xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Your Career Path Starts Here
            </h2>

            <p
              className={`mt-3 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Follow structured roadmaps to learn step by step, stay focused,
              and build the right skills for your career in tech and development.
            </p>
          </div>

          <button
            onClick={() => navigate("/exam-roadmap")}
            className="w-fit px-4 sm:px-5 py-2.5 text-sm sm:text-base rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View All Roadmaps
          </button>
        </div>

        {/* Slider */}
        {loading ? (
          <div className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-2 hide-scrollbar">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-3 scroll-smooth hide-scrollbar"
          >
            {roadmaps.map((roadmap, index) => (
              <Link
                key={roadmap._id}
                to={`/roadmap/${roadmap._id}`}
                className={`group flex-shrink-0 w-[250px] sm:w-[290px] md:w-[330px] rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-blue-600 text-gray-200"
                    : "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-600 text-slate-900"
                }`}
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] sm:text-xs font-medium tracking-[2px] uppercase text-blue-500 group-hover:text-white transition">
                    Roadmap {index + 1}
                  </span>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition ${
                      isDark
                        ? "bg-white/10 text-blue-400 group-hover:bg-white/20 group-hover:text-white"
                        : "bg-blue-50 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    <PiPathBold />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-light tracking-wide text-[1rem] sm:text-[1.15rem] md:text-[1.25rem] leading-snug capitalize group-hover:text-white transition line-clamp-2 min-h-[58px]">
                  {getRoadmapTitle(roadmap)}
                </h3>

                {/* Description */}
                <p
                  className={`mt-3 text-[11px] sm:text-xs md:text-sm leading-relaxed line-clamp-3 transition ${
                    isDark
                      ? "text-gray-400 group-hover:text-blue-100"
                      : "text-slate-500 group-hover:text-blue-100"
                  }`}
                >
                  {roadmap.description
                    ? roadmap.description.slice(0, 120)
                    : "Follow this roadmap to build your knowledge step by step and grow your technical skills with a clear learning path."}
                  ...
                </p>

                {/* Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] sm:text-xs transition ${
                      isDark
                        ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    {roadmap.category || "Career Growth"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] sm:text-xs flex items-center gap-1 transition ${
                      isDark
                        ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    <HiOutlineSparkles size={14} />
                    Step by Step
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-5 w-full py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  Explore Roadmap <HiArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Hint */}
        {!loading && roadmaps.length > 0 && (
          <div className="md:hidden mt-5 text-center">
            <p
              className={`text-[11px] sm:text-xs ${
                isDark ? "text-gray-500" : "text-slate-500"
              }`}
            >
              Swipe to explore more roadmaps →
            </p>
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
      </div>
    </section>
  );
};

export default RoadmapSection;