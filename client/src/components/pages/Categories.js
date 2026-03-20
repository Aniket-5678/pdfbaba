import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { GoBook } from "react-icons/go";
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
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      } py-10 px-4`}
    >
      {/* 🔥 HEADING */}
      <div className="max-w-7xl mx-auto mb-6 px-1 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.1rem] sm:text-2xl font-light tracking-wide">
            Study Categories
          </h1>

          {/* arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="px-3 py-1 border rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="px-3 py-1 border rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 SKELETON LOADER */}
      {loading ? (
        <div className="flex gap-4 overflow-hidden max-w-7xl mx-auto px-1 sm:px-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`min-w-[140px] md:min-w-[160px] h-[100px] rounded-xl animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-center opacity-60">No Categories Found 😢</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar max-w-7xl mx-auto px-1 sm:px-0"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(`/notes-category/${cat}`)}
              className={`min-w-[140px] md:min-w-[170px] h-[110px] cursor-pointer border rounded-xl px-4 flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:bg-blue-600"
                  : "bg-white border-gray-200 hover:bg-blue-600"
              }`}
            >
              {/* ICON */}
              <div className="text-xl mb-1"><GoBook /></div>

              {/* NAME */}
              <h2 className="text-xs md:text-sm font-medium">
                {cat}
              </h2>

              {/* TEXT */}
              <p className="text-[10px] opacity-60 mt-1">
                View →
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;