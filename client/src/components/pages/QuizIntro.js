
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";
import {
  HiOutlineLightningBolt,
  HiArrowRight,
} from "react-icons/hi";
import { PiExamLight } from "react-icons/pi";

const QuizIntroSlider = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const sliderRef = useRef(null);

  const navigate = useNavigate();

  /* =========================
     FETCH QUIZZES
  ========================= */

  useEffect(() => {
    let isMounted = true;

    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("/api/v1/quizzes/all");

        if (isMounted) {
          setQuizzes(res.data.slice(0, 10));
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuizzes();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
     GSAP ANIMATION
  ========================= */

  useEffect(() => {
    if (loading || quizzes.length === 0) return undefined;

    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return undefined;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(header.children, {
        opacity: 0,
        y: 30,
      });

      gsap.set(".quiz-card", {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      // Header animation
      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards animation
      gsap.to(".quiz-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      // Floating glow animation
      gsap.to(".quiz-glow", {
        x: 40,
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [loading, quizzes.length]);

  /* =========================
     CARD HOVER ANIMATION
  ========================= */

  const handleCardEnter = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".quiz-icon");
    const arrow = card.querySelector(".quiz-arrow");

    gsap.to(card, {
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });

    if (icon) {
      gsap.to(icon, {
        rotate: 8,
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".quiz-icon");
    const arrow = card.querySelector(".quiz-arrow");

    gsap.to(card, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  /* =========================
     SLIDER
  ========================= */

  const scrollLeft = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-14 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${
        isDark
          ? "bg-gray-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`quiz-glow absolute -top-32 -left-32 h-72 w-72 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-600" : "bg-blue-300"
          }`}
        />

        <div
          className={`quiz-glow absolute -bottom-40 -right-32 h-80 w-80 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-indigo-600" : "bg-indigo-300"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_45%)]"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =========================
            HEADER
        ========================= */}

        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-9 md:mb-12"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-blue-600" />

              <p className="text-blue-600 font-medium tracking-[3px] uppercase text-[10px] sm:text-xs">
                Practice & Improve
              </p>
            </div>

            {/* Heading */}
            <h2
              className={`font-light leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Sharpen Your Knowledge
              <span className="block mt-1 font-medium bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                with Interactive Quizzes
              </span>
            </h2>

            {/* Description */}
            <p
              className={`mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Test what you’ve learned with interactive quizzes across
              programming, technology, and study topics. Learn faster,
              identify your weak areas, and improve with focused practice.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={() => navigate("/practice-quiz")}
            className="group w-fit inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300"
          >
            View All Quizzes

            <HiArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={18}
            />
          </button>
        </div>

        {/* =========================
            QUIZ CONTENT
        ========================= */}

        {loading ? (
          <div className="flex gap-4 sm:gap-5 overflow-hidden pb-3">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[270px] sm:w-[300px] md:w-[330px] rounded-3xl p-5 sm:p-6 animate-pulse ${
                  isDark
                    ? "bg-white/[0.04] border border-white/10"
                    : "bg-white border border-slate-200 shadow-sm"
                }`}
              >
                <div className="h-5 w-24 rounded bg-gray-300/40 mb-5" />

                <div className="h-6 w-40 rounded bg-gray-300/40 mb-3" />

                <div className="h-4 w-full rounded bg-gray-300/40 mb-2" />
                <div className="h-4 w-4/5 rounded bg-gray-300/40 mb-5" />

                <div className="flex gap-2 mb-5">
                  <div className="h-7 w-20 rounded-full bg-gray-300/40" />
                  <div className="h-7 w-24 rounded-full bg-gray-300/40" />
                </div>

                <div className="h-11 w-full rounded-xl bg-gray-300/40" />
              </div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          /* Empty State */
          <div
            className={`rounded-3xl border p-10 text-center ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-200 bg-white"
            }`}
          >
            <PiExamLight className="mx-auto mb-4 text-4xl text-blue-500" />

            <h3 className="text-lg font-medium mb-2">
              No quizzes available
            </h3>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-slate-500"
              }`}
            >
              New quizzes will appear here soon.
            </p>
          </div>
        ) : (
          <>
            {/* =========================
                SLIDER HEADER
            ========================= */}

            <div className="flex items-center justify-between mb-4">
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-500" : "text-slate-500"
                }`}
              >
                Explore popular quizzes
              </p>

              {/* Desktop Controls */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  aria-label="Previous quizzes"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? "border-white/10 bg-white/5 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  }`}
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={scrollRight}
                  aria-label="Next quizzes"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? "border-white/10 bg-white/5 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  }`}
                >
                  →
                </button>
              </div>
            </div>

            {/* =========================
                QUIZ SLIDER
            ========================= */}

            <div
              ref={(el) => {
                sliderRef.current = el;
                cardsRef.current = el;
              }}
              className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-5 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            >
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz._id}
                  className={`quiz-card group relative flex-shrink-0 snap-start w-[270px] sm:w-[300px] md:w-[330px] rounded-3xl p-5 sm:p-6 cursor-pointer border overflow-hidden transition-colors duration-300 ${
                    isDark
                      ? "bg-white/[0.045] border-white/10 hover:bg-blue-600 hover:border-blue-500"
                      : "bg-white border-slate-200 hover:bg-blue-600 hover:border-blue-500 shadow-sm hover:shadow-2xl"
                  }`}
                  onClick={() => navigate(`/play/${quiz._id}`)}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                >
                  {/* Card Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold tracking-[2px] uppercase text-blue-500 group-hover:text-white transition-colors duration-300">
                        Quiz {index + 1}
                      </span>
                    </div>

                    <div
                      className={`quiz-icon w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-blue-400 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-blue-50 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      <PiExamLight />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`relative z-10 font-medium tracking-tight text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] leading-snug line-clamp-2 min-h-[58px] transition-colors duration-300 ${
                      isDark
                        ? "text-white"
                        : "text-slate-900 group-hover:text-white"
                    }`}
                  >
                    {quiz.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`relative z-10 mt-3 text-[11px] sm:text-xs md:text-sm leading-relaxed line-clamp-3 min-h-[55px] transition-colors duration-300 ${
                      isDark
                        ? "text-gray-400 group-hover:text-blue-50"
                        : "text-slate-500 group-hover:text-blue-50"
                    }`}
                  >
                    Practice this quiz to strengthen your understanding and
                    test your knowledge in{" "}
                    {quiz.category || "general learning"}.
                  </p>

                  {/* Chips */}
                  <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      {quiz.category || "General"}
                    </span>

                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1.5 transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      <HiOutlineLightningBolt size={13} />
                      Quick Practice
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/play/${quiz._id}`);
                    }}
                    className="relative z-10 mt-5 w-full py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-600 transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  >
                    Start Quiz

                    <HiArrowRight
                      className="quiz-arrow"
                      size={18}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Hint */}
            <div className="sm:hidden mt-3 text-center">
              <p
                className={`text-[11px] ${
                  isDark ? "text-gray-500" : "text-slate-500"
                }`}
              >
                Swipe to explore more quizzes →
              </p>
            </div>
          </>
        )}
      </div>

      {/* =========================
          SCROLLBAR CSS
      ========================= */}

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default QuizIntroSlider;

