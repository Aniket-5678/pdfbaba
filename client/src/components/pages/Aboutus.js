// src/components/Aboutus.js

import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { ClipLoader } from "react-spinners";
import { useTheme } from "../context/ThemeContext";

import bannerImage from "../images/aboutusbanner.png";
import AboutownerImage from "../images/aniketsingh.jpg";
import graphicdesignerImage from "../images/ajit.jpg";
import joshuaImage from "../images/joshua.jpg";
import goldyImage from "../images/goldy.jpg";

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

  const team = [
    {
      name: "Aniket Singh",
      role: "Founder & MERN Developer",
      image: AboutownerImage,
      desc: "Founder of PDF Baba. Passionate about building learning platforms and providing digital products like study PDFs, quizzes, roadmaps and website source codes.",
    },
    {
      name: "Ajit Yadav",
      role: "Graphic Designer",
      image: graphicdesignerImage,
      desc: "Creates engaging banners, thumbnails and graphics for the platform.",
    },
    {
      name: "Gaurav Karkera",
      role: "UI/UX Designer",
      image: goldyImage,
      desc: "Designs smooth and modern user experiences to make learning simple.",
    },
    {
      name: "Joshua",
      role: "PDF & Content Expert",
      image: joshuaImage,
      desc: "Manages and verifies study materials including notes, guides and educational PDFs.",
    },
  ];

  return (
    <Layout>
      <div
        className={`transition-colors duration-500 ${
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
              A complete learning platform for PDFs, quizzes, career roadmaps,
              tech tutorials and affordable website source code projects.
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
            PDF Baba is an online platform designed to provide students,
            developers and learners with high quality study materials.
            Our website offers educational PDFs, technology notes, business
            and finance resources, quizzes and career roadmaps to help people
            improve their knowledge and skills.
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
            Our mission is to make learning easy and accessible for everyone.
            We provide free and premium resources including notes, study
            materials, career guidance and digital tools that help students
            grow faster in academics and professional careers.
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
                className={`p-6 rounded-2xl border transition hover:shadow-lg ${
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

        {/* TEAM */}

        <section className="max-w-7xl mx-auto px-4 py-16">

          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Meet Our Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {team.map((member, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border transition hover:shadow-xl ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6 text-center">

                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {member.name}
                  </h3>

                  <p className="text-blue-600 text-sm mb-3">
                    {member.role}
                  </p>

                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {member.desc}
                  </p>

                </div>
              </div>
            ))}

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
            If you have any questions, suggestions or business inquiries feel
            free to contact us.
          </p>

          <p className="text-blue-600 font-medium">
            📧pdfbaba07@gmail.com
          </p>

        

        </section>

        <SocialBarAd />

      </div>
    </Layout>
  );
};

export default Aboutus;