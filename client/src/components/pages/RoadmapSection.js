import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const RoadmapSection = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);

  // Fake loading for premium feel
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // ================= Skeleton =================
  if (loading) {
    return (
      <section className="flex justify-center my-8 px-3">
        <div
          className={`w-full max-w-5xl rounded-2xl p-6 sm:p-10 animate-pulse
          ${isDark ? "bg-[#0f172a]" : "bg-white shadow-xl"}`}
        >
          <div className="space-y-4 flex flex-col items-center">
            <div className={`h-6 w-60 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
            <div className={`h-4 w-72 rounded ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
            <div className={`h-10 w-40 rounded-lg mt-4 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
          </div>
        </div>
      </section>
    );
  }

  // ================= Real UI =================
  return (
    <section className="flex justify-center my-8 px-3">
      <div
        className={`relative w-full max-w-5xl text-center rounded-2xl p-6 sm:p-12 overflow-hidden transition-all duration-500 font-[Poppins]
        ${
          isDark
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] border border-white/10 shadow-2xl shadow-black/40 text-gray-200"
            : "bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-gray-200 shadow-xl text-gray-800"
        }`}
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          <h2
            className={`font-bold mb-3 leading-snug tracking-tight
            ${isDark ? "text-white" : "text-gray-900"}
            text-[1.2rem] sm:text-[1.9rem]`}
          >
            Your Career Path Starts Here 🚀
          </h2>

          <p
            className={`mb-7 leading-relaxed max-w-2xl mx-auto
            ${isDark ? "text-gray-300" : "text-gray-600"}
            text-[0.9rem] sm:text-[1.05rem]`}
          >
            Master Full-Stack, AI, Cybersecurity & more with structured learning
            roadmaps designed to take you from beginner to job-ready step by step.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-7 text-xs sm:text-sm">
            <span className={`${isDark ? "bg-white/10" : "bg-white shadow"} px-3 py-1 rounded-full`}>
              💻 Full-Stack
            </span>
            <span className={`${isDark ? "bg-white/10" : "bg-white shadow"} px-3 py-1 rounded-full`}>
              🤖 AI/ML
            </span>
            <span className={`${isDark ? "bg-white/10" : "bg-white shadow"} px-3 py-1 rounded-full`}>
              🔐 Cybersecurity
            </span>
            <span className={`${isDark ? "bg-white/10" : "bg-white shadow"} px-3 py-1 rounded-full`}>
              📱 App Development
            </span>
          </div>

          <Link
            to="/roadmapdata"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            Explore Roadmaps →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;