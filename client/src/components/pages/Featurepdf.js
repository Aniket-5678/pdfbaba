import React from "react";
import { FaLaptopCode, FaBook, FaSearch, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categories = [
  {
    title: "TechZone",
    description:
      "Learn ReactJS, NodeJS, HTML, CSS and modern web development with structured notes.",
    icon: <FaLaptopCode />,
    color: "from-blue-500 to-indigo-500",
    link: "categoryworks",
  },
  {
    title: "Business & Finance",
    description:
      "Understand money, marketing, startups and financial concepts in simple language.",
    icon: <FaChartLine />,
    color: "from-emerald-500 to-teal-500",
    link: "categoryworks",
  },
];

const steps = [
  {
    title: "Search for Notes",
    description:
      "Quickly find any topic using our smart search system.",
    icon: <FaSearch />,
  },
  {
    title: "Select & Download",
    description:
      "Open the PDF and download instantly for offline learning.",
    icon: <FaBook />,
  },
];

const CategoryCard = ({ title, description, icon, color, link, isDark }) => (

  <Link to={link} className="group">

    <div
      className={`rounded-2xl p-7 transition-all duration-300 h-full hover:shadow-xl
      ${
        isDark
          ? "bg-[#1b1b1b] border border-white/10"
          : "bg-white border border-gray-200 shadow-md"
      }`}
    >

      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-r ${color} mb-5 group-hover:scale-110 transition`}
      >
        {icon}
      </div>

      <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h3>

      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm leading-relaxed`}>
        {description}
      </p>

    </div>

  </Link>
);

const StepCard = ({ title, description, icon, index, isDark }) => (

  <div
    className={`relative flex gap-5 p-6 rounded-2xl transition
    ${
      isDark
        ? "bg-[#1b1b1b] border border-white/10"
        : "bg-white border border-gray-200 shadow-md"
    }`}
  >

    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow">
      {index + 1}
    </div>

    <div className="text-indigo-500 text-2xl mt-1">
      {icon}
    </div>

    <div>

      <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h4>

      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
        {description}
      </p>

    </div>

  </div>
);

const Featurepdf = () => {

  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (

    <section
      className={`py-20 px-4 sm:px-8 font-[Poppins] transition-colors duration-500
      ${
        isDark
          ? "bg-gradient-to-b from-[#0d0d0d] to-[#121212]"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >

      {/* CATEGORY SECTION */}

      <div className="max-w-6xl mx-auto mb-20">

        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-12 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        bg-clip-text text-transparent">

          Explore Learning Categories

        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} isDark={isDark} />
          ))}

        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="max-w-4xl mx-auto">

        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-12 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        bg-clip-text text-transparent">

          How It Works

        </h2>

        <div className="grid gap-8">

          {steps.map((step, i) => (
            <StepCard key={i} {...step} index={i} isDark={isDark} />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Featurepdf;