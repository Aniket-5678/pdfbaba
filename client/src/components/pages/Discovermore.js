import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import SmallBannerAd from "../pages/SmallBannerAd";
import NativeAd from "../pages/NativeAd";
import SocialBarAd from "./SocialBarAd";

import {
  GraduationCap,
  BookOpen,
  Clock,
  TrendingUp,
  Lightbulb,
  Users,
  FileText
} from "lucide-react";

const Discovermore = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cards = [
    {
      icon: <GraduationCap size={40} />,
      title: "Effective Study Tips",
      desc: "Learn smart techniques to manage time and retain concepts better."
    },
    {
      icon: <BookOpen size={40} />,
      title: "Best Learning PDFs",
      desc: "Access high quality study PDFs including technology, business and finance resources."
    },
    {
      icon: <Clock size={40} />,
      title: "Smart Time Management",
      desc: "Master scheduling and productivity techniques for better learning."
    }
  ];

  const growthCards = [
    {
      icon: <TrendingUp size={40} />,
      title: "Growth Mindset",
      desc: "Develop a powerful mindset to improve learning and career success."
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Learning Hacks",
      desc: "Discover powerful tips to enhance comprehension and knowledge retention."
    }
  ];

  const insights = [
    {
      icon: <FileText size={40} />,
      title: "Expert Guides",
      desc: "Read detailed guides curated by experts to improve your skills."
    },
    {
      icon: <Users size={40} />,
      title: "Community Learning",
      desc: "Connect with other learners and explore valuable discussions."
    }
  ];

  return (
    <Layout>

      <div
        className={`max-w-5xl mx-auto px-4 pt-32 pb-10 text-center ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <div className="mb-8">
          <SmallBannerAd />
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold mb-3">
          Smart Learning Starts Here
        </h1>

        <p className="text-sm sm:text-base max-w-2xl mx-auto opacity-80">
          Explore the best resources to enhance your learning experience with
          PDF Baba including study notes, quizzes, career roadmaps and digital
          learning materials.
        </p>

        {/* FIRST SECTION */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {cards.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border transition hover:shadow-lg ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-center mb-4 text-blue-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-medium mb-2">{item.title}</h3>

              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}

        </div>

        {/* GROWTH SECTION */}

        <h2 className="text-xl sm:text-2xl font-semibold mt-16 mb-6">
          Enhance Your Learning Journey
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {growthCards.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border transition hover:shadow-lg ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-center mb-4 text-blue-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-medium mb-2">{item.title}</h3>

              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}

        </div>

        {/* BUTTON */}

        <div className="mt-8">

          <Link
            to="/exam-pdf-explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base transition"
          >
            Explore More Notes
          </Link>

        </div>

        {/* INSIGHTS */}

        <h2 className="text-xl sm:text-2xl font-semibold mt-16 mb-4">
          Exclusive Learning Insights
        </h2>

        <p className="text-sm sm:text-base opacity-80 max-w-2xl mx-auto mb-8">
          Gain deeper knowledge from expert guides and learn with a growing
          community of students and professionals.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {insights.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border transition hover:shadow-lg ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-center mb-4 text-blue-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-medium mb-2">{item.title}</h3>

              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}

        </div>

      </div>

      {/* ADS */}

      <div className="max-w-5xl mx-auto px-4">
        <NativeAd />
      </div>

      <div>
        <SocialBarAd />
      </div>

    </Layout>
  );
};

export default Discovermore;