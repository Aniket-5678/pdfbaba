import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const QuizIntro = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);

  // Fake load for premium feel
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // ================= Skeleton UI =================
  if (loading) {
    return (
      <section className="flex justify-center px-3 sm:px-6 my-6 sm:my-10">
        <div
          className={`w-full max-w-6xl rounded-2xl p-6 sm:p-10 animate-pulse
          ${isDark ? "bg-[#0f172a]" : "bg-white shadow-xl"}`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            
            <div className="flex-1 space-y-4 w-full">
              <div className={`h-6 w-52 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
              <div className={`h-4 w-full max-w-md rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
              <div className={`h-4 w-4/5 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>

              <div className="flex gap-3 mt-6">
                <div className={`h-6 w-24 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
                <div className={`h-6 w-24 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
                <div className={`h-6 w-24 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
              </div>
            </div>

            <div className={`h-12 w-40 rounded-xl ${isDark ? "bg-white/10" : "bg-gray-200"}`}></div>
          </div>
        </div>
      </section>
    );
  }

  // ================= Real UI =================
  return (
    <section className="flex justify-center px-3 sm:px-6 my-6 sm:my-10">
      <div
        className={`relative w-full max-w-6xl overflow-hidden rounded-2xl transition-all duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] border border-white/10 shadow-2xl shadow-black/40"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-gray-200 shadow-xl"
        }`}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-10">
          
          <div className="flex-1 text-center md:text-left">
            <h2 className={`font-[Poppins] font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"} text-xl sm:text-3xl`}>
              Start Your Quiz Journey 🚀
            </h2>

            <p className={`mt-4 max-w-xl font-[Poppins] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"} text-sm sm:text-base`}>
              Explore interactive quizzes designed to sharpen your knowledge and
              boost confidence. Track your performance, improve daily, and learn smarter — not harder.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start text-xs sm:text-sm">
              <span className={`px-3 py-1 rounded-full ${isDark ? "bg-white/10" : "bg-white shadow"}`}>📊 Track Progress</span>
              <span className={`px-3 py-1 rounded-full ${isDark ? "bg-white/10" : "bg-white shadow"}`}>⚡ Instant Results</span>
              <span className={`px-3 py-1 rounded-full ${isDark ? "bg-white/10" : "bg-white shadow"}`}>🎯 Real Exam Practice</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Link
              to="/quizplaylist"
              className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
              shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              Practice Now →
            </Link>

            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Free • No Registration Required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizIntro;