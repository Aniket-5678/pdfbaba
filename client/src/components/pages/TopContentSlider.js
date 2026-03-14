import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const TopContentSlider = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const contentList = [
    " Explore Free Programming Roadmaps & Start Your Tech Career Today",
    " Download High-Quality Study PDFs & Programming Notes for Free",
    " Test Your Skills with Interactive Quizzes & MCQ Practice",
    " Learn JavaScript, React, Node.js & Modern Web Development",
    " Discover Ready-Made Website Templates & Source Codes",
    " Access 100+ Board Question Papers for Exam Preparation",
    " Boost Your Coding Skills with Practical Learning Resources",
    " Master Frontend & Backend Development Step-by-Step",
    " Get Complete Website Projects & Developer Resources",
    " Improve Your Interview Preparation with Coding Notes",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contentList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full h-[44px] flex items-center justify-center text-center font-semibold tracking-wide transition-all duration-300
      ${
        isDark
          ? "bg-black text-white border-b border-gray-800"
          : "bg-sky-500 text-white border-b border-sky-600"
      }`}
    >
      <p className="text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] uppercase opacity-90 px-2 pt-[2px]">
        {contentList[currentIndex]}
      </p>
    </div>
  );
};

export default TopContentSlider;
