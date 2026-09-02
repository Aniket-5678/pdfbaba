
// src/components/Aboutus.js

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { ClipLoader } from "react-spinners";
import { useTheme } from "../context/ThemeContext";

import bannerImage from "../images/aboutusbanner.png";
import AboutownerImage from "../images/aniketsingh.jpg";

import SocialBarAd from "./SocialBarAd";

const Aboutus = () => {
  const [loading, setLoading] = useState(true);
  const [theme] = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#2563eb" size={50} />
      </div>
    );
  }

  return (
    <Layout>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          isDark ? "bg-[#0b0f19]" : "bg-gray-50"
        }`}
      >
        {/* HERO */}
        <div className="relative h-[320px] sm:h-[420px] flex items-center justify-center text-center mt-24">
          <img
            src={bannerImage}
            alt="PDF Baba Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 px-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Welcome to PDF Baba
            </h1>

            <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto">
              A complete learning platform for PDFs, quizzes, career
              roadmaps, tech tutorials and affordable website source code
              projects.
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            About PDF Baba
          </h2>

          <p
            className={`text-center leading-relaxed max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            PDF Baba is an online learning and digital resources platform
            created to help students, developers and learners access useful
            educational content, technology resources, quizzes, career
            roadmaps and digital products in one place.
          </p>

          <p
            className={`text-center leading-relaxed max-w-3xl mx-auto mt-5 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The complete PDF Baba website has been designed, developed and
            maintained by its founder, Aniket Singh, using modern full-stack
            web development technologies.
          </p>
        </section>

        {/* MISSION */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our Mission
          </h2>

          <p
            className={`text-center leading-relaxed max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Our mission is to make learning easy, accessible and affordable
            for everyone. PDF Baba provides free and premium educational
            resources, study materials, career guidance, digital tools and
            website source code projects to help learners and developers grow
            their skills.
          </p>
        </section>

        {/* WHAT WE OFFER */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            What You Will Find On PDF Baba
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Educational PDF Notes for multiple subjects",
              "Technology and programming learning resources",
              "Business, finance and career development materials",
              "Practice quizzes for technology, UPSC and general knowledge",
              "Career roadmaps for digital skills and online careers",
              "Affordable website source code projects for developers",
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-300"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER & DEVELOPER */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Founder & Developer
          </h2>

          <div
            className={`max-w-3xl mx-auto rounded-3xl overflow-hidden border transition duration-300 hover:shadow-xl ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-2 items-center">
              {/* IMAGE */}
              <div className="h-full">
                <img
                  src={AboutownerImage}
                  alt="Aniket Singh - Founder & Full Stack Web Developer"
                  className="w-full h-80 md:h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 md:p-10">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Aniket Singh
                </h3>

                <p className="text-blue-600 font-medium mb-5">
                  Founder & Full Stack Web Developer
                </p>

                <p
                  className={`leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  I am the founder and full stack web developer behind PDF
                  Baba. I designed and developed the complete PDF Baba
                  platform from the ground up, including the frontend,
                  backend, database, APIs, authentication, user experience
                  and overall website functionality.
                </p>

                <p
                  className={`leading-relaxed mt-4 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  My goal is to build useful, modern and scalable web
                  applications that provide real value to students, learners,
                  developers and businesses.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "JavaScript",
                    "Tailwind CSS",
                    "REST APIs",
                    "Full Stack Development",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Contact Us
          </h2>

          <p
            className={`mb-4 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            If you have any questions, suggestions or business inquiries,
            feel free to contact us.
          </p>

          <p className="text-blue-600 font-medium">
            📧 pdfbaba07@gmail.com
          </p>
        </section>

        <SocialBarAd />
      </div>
    </Layout>
  );
};

export default Aboutus;

