import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const RoadmapSection = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex justify-center my-8 px-3">
      <div
        className={`
          w-full max-w-5xl text-center rounded-2xl p-6 sm:p-10 transition-all duration-300 font-[Poppins]
          ${isDark ? "bg-[#121212] text-gray-200 shadow-md shadow-white/10" : "bg-white text-gray-800 shadow-lg"}
        `}
      >
        <h2
          className={`
            font-bold mb-2 leading-snug
            ${isDark ? "text-gray-200" : "text-gray-900"}
            text-[1.1rem] sm:text-[1.6rem]
          `}
        >
          Your Career Path Starts Here 🚀
        </h2>

        <p
          className={`
            mb-6 leading-relaxed
            ${isDark ? "text-gray-400" : "text-gray-700"}
            text-[0.9rem] sm:text-[1.05rem]
          `}
        >
          Master Full-Stack, AI, Cybersecurity & More with Expert Roadmaps!
        </p>

        <Link
          to="/roadmapdata"
          className={`
            inline-block font-semibold px-6 py-3 rounded-lg text-sm sm:text-base transition-all duration-200
            ${isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
          `}
        >
          Explore Roadmaps →
        </Link>
      </div>
    </div>
  );
};

export default RoadmapSection;
