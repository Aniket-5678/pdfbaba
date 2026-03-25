import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { GoBook } from "react-icons/go";
import {
  HiArrowRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [theme] = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/notes");

        const uniqueCategories = [
          ...new Set(
            (res.data.notes || [])
              .map((note) => note?.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`py-12 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6 mb-8 md:mb-10">
          <div>
            <p className="text-blue-600 font-light tracking-[2px] uppercase text-[11px] sm:text-xs mb-2">
              Explore Topics
            </p>

         <h2 className="text-[1.1rem] sm:text-3xl md:text-4xl font-light leading-tight tracking-wide">
  Browse Study Categories
</h2>

            <p
              className={`mt-3 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Discover notes and learning materials across programming,
              technology, development, and student-focused subjects.
            </p>
          </div>

          {/* Scroll Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-900 hover:bg-blue-600 hover:border-blue-600"
                  : "border-gray-300 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              <HiOutlineChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll("right")}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-900 hover:bg-blue-600 hover:border-blue-600"
                  : "border-gray-300 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              <HiOutlineChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Skeleton Loader */}
        {loading ? (
          <div className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden no-scrollbar pb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`min-w-[160px] sm:min-w-[190px] md:min-w-[220px] h-[145px] sm:h-[150px] rounded-2xl animate-pulse ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10">
            <p
              className={`text-base sm:text-lg ${
                theme === "dark" ? "text-gray-400" : "text-slate-500"
              }`}
            >
              No Categories Found 😢
            </p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar pb-2"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/notes-category/${cat}`)}
                className={`group min-w-[170px] sm:min-w-[210px] md:min-w-[240px] h-[150px] sm:h-[160px] rounded-2xl border cursor-pointer p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-800 hover:bg-blue-600"
                    : "bg-white border-gray-200 hover:bg-blue-600"
                }`}
              >
                {/* Top Icon */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800 text-blue-400 group-hover:bg-white/20 group-hover:text-white"
                      : "bg-blue-50 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                  }`}
                >
                  <GoBook />
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-[15px] sm:text-base md:text-lg font-light tracking-wide group-hover:text-white transition">
                    {cat}
                  </h3>

                  <p
                    className={`mt-2 text-[11px] sm:text-xs md:text-sm leading-relaxed transition ${
                      theme === "dark"
                        ? "text-gray-400 group-hover:text-blue-100"
                        : "text-slate-500 group-hover:text-blue-100"
                    }`}
                  >
                    Explore notes, PDFs and study materials in this category.
                  </p>

                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-medium group-hover:text-white transition">
                    View Category <HiArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile scroll hint */}
        {!loading && categories.length > 0 && (
          <div className="md:hidden mt-5 text-center">
            <p
              className={`text-[11px] sm:text-xs ${
                theme === "dark" ? "text-gray-500" : "text-slate-500"
              }`}
            >
              Swipe to explore more categories →
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;