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

const CategoryCard = ({ title, description, icon, color, link }) => (
  <Link to={link} className="group">
    <div className="rounded-2xl p-7 bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-300 h-full">

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl bg-gradient-to-r ${color} mb-5 group-hover:scale-110 transition`}>
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </Link>
);

const StepCard = ({ title, description, icon, index }) => (
  <div className="relative flex gap-5 p-6 rounded-2xl bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/10 hover:shadow-lg transition">

    {/* Number */}
    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow">
      {index + 1}
    </div>

    <div className="text-indigo-600 dark:text-indigo-400 text-2xl mt-1">
      {icon}
    </div>

    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

const Featurepdf = () => {
  const [theme] = useTheme();

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-[#0f0f0f] dark:to-[#121212] font-[Poppins]">

      {/* CATEGORY SECTION */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Explore Learning Categories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          How It Works
        </h2>

        <div className="grid gap-8">
          {steps.map((step, i) => (
            <StepCard key={i} {...step} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Featurepdf;