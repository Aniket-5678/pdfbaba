import React from "react";
import { FaLaptopCode, FaBook, FaFreeCodeCamp, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categories = [
  {
    title: "TechZone",
    description:
      "Explore learning materials on ReactJS, NodeJS, HTML, CSS, and web development technologies. Perfect for aspiring developers!",
    icon: <FaLaptopCode size={40} />,
    link: "categoryworks",
  },
  {
    title: "Space Studies",
    description:
      "Explore the universe with PDFs on space exploration, satellite technology, astronomy, and space missions.",
    icon: <FaBook size={40} />,
    link: "categoryworks",
  },
  {
    title: "Spiritual Insights",
    description:
      "Dive into spiritual teachings, meditation practices, and wisdom for personal growth and inner peace.",
    icon: <FaFreeCodeCamp size={40} />,
    link: "categoryworks",
  },
];

const steps = [
  {
    title: "Search for Notes",
    description:
      "Use the search bar to find PDFs across categories like TechZone, Space Studies, and Spiritual Insights.",
    icon: <FaSearch size={40} />,
    link: "howitworks",
  },
  {
    title: "Select and Download",
    description:
      "Pick the PDF you need — whether tech, space or spirituality.",
    icon: <FaBook size={40} />,
  },
];

const GlassCard = ({ title, description, icon, link, theme }) => (
  <Link to={link || "#"} className="w-full sm:w-1/2 md:w-1/3 p-3">
    <div
      className={`
        rounded-2xl p-6 text-center transition transform hover:scale-105 h-full
        backdrop-blur-lg border
        ${theme === "dark"
          ? "bg-white/10 border-white/20 text-white shadow-[0_8px_24px_rgba(255,255,255,0.05)]"
          : "bg-white/60 border-black/10 text-black shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
        }
      `}
    >
      <div className={`${theme === "dark" ? "text-blue-300" : "text-blue-600"} mb-3`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold font-[Poppins]">{title}</h3>
      <p className="text-sm mt-2 font-[Poppins] opacity-80">{description}</p>
    </div>
  </Link>
);

const Featurepdf = () => {
  const [theme] = useTheme();

  return (
    <div className={`${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"} min-h-screen py-12 px-4`}>
      
      {/* Featured Categories */}
      <h2 className="text-center text-2xl font-bold font-[Poppins] mb-8">Featured PDF Categories</h2>
      <div className="flex flex-wrap justify-center max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <GlassCard key={index} {...cat} theme={theme} />
        ))}
      </div>

      {/* How It Works */}
      <h2 className="text-center text-2xl font-bold font-[Poppins] mt-16 mb-8">How It Works</h2>
      <div className="flex flex-wrap justify-center max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <GlassCard key={index} {...step} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default Featurepdf;
