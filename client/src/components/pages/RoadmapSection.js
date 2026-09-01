
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { gsap } from "gsap";
import {
  HiArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi";
import { PiPathBold } from "react-icons/pi";

const RoadmapSection = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const navigate = useNavigate();

  /* =========================
     FETCH ROADMAPS
  ========================= */

  useEffect(() => {
    let isMounted = true;

    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get("/api/v1/roadmaps");

        if (isMounted) {
          setRoadmaps(res.data.slice(0, 10));
        }
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRoadmaps();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
     ROADMAP TITLE
  ========================= */

  const getRoadmapTitle = (roadmap) => {
    if (roadmap.title) return roadmap.title;

    if (roadmap.nodes && roadmap.nodes.length > 0) {
      return roadmap.nodes[0].title;
    }

    if (roadmap.slug) {
      return roadmap.slug.replace(/-/g, " ");
    }

    return roadmap.category || "Untitled Roadmap";
  };

  /* =========================
     GSAP SECTION ANIMATION
  ========================= */

  useEffect(() => {
    if (loading || roadmaps.length === 0) return undefined;

    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return undefined;

    const ctx = gsap.context(() => {
      const headerItems = header.children;

      // Initial state
      gsap.set(headerItems, {
        opacity: 0,
        y: 30,
      });

      gsap.set(".roadmap-card", {
        opacity: 0,
        y: 55,
        scale: 0.96,
      });

      // Header reveal
      gsap.to(headerItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards reveal
      gsap.to(".roadmap-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Background glow
      gsap.to(".roadmap-glow", {
        x: 45,
        y: -25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".roadmap-glow-two", {
        x: -35,
        y: 25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [loading, roadmaps.length]);

  /* =========================
     CARD HOVER
  ========================= */

  const handleCardEnter = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".roadmap-icon");
    const arrow = card.querySelector(".roadmap-arrow");
    const sparkles = card.querySelector(".roadmap-sparkles");

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

    if (sparkles) {
      gsap.to(sparkles, {
        rotate: 15,
        scale: 1.1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".roadmap-icon");
    const arrow = card.querySelector(".roadmap-arrow");
    const sparkles = card.querySelector(".roadmap-sparkles");

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

    if (sparkles) {
      gsap.to(sparkles, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  /* =========================
     SLIDER CONTROLS
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

  /* =========================
     SKELETON
  ========================= */

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-[270px] sm:w-[300px] md:w-[330px] rounded-3xl p-5 sm:p-6 animate-pulse ${
        isDark
          ? "bg-white/[0.04] border border-white/10"
          : "bg-white border border-slate-200 shadow-sm"
      }`}
    >
      <div className="h-5 w-28 rounded bg-gray-300/40 mb-5" />

      <div className="h-6 w-40 rounded bg-gray-300/40 mb-3" />

      <div className="h-4 w-full rounded bg-gray-300/40 mb-2" />
      <div className="h-4 w-4/5 rounded bg-gray-300/40 mb-5" />

      <div className="flex gap-2 mb-5">
        <div className="h-7 w-20 rounded-full bg-gray-300/40" />
        <div className="h-7 w-24 rounded-full bg-gray-300/40" />
      </div>

      <div className="h-11 w-full rounded-xl bg-gray-300/40" />
    </div>
  );

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
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`roadmap-glow absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-600" : "bg-blue-300"
          }`}
        />

        <div
          className={`roadmap-glow-two absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-15 ${
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
                Guided Learning
              </p>
            </div>

            {/* Heading */}
            <h2
              className={`font-light leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Your Career Path
              <span className="block mt-1 font-medium bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>

            {/* Description */}
            <p
              className={`mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Follow structured roadmaps to learn step by step, stay focused,
              and build the right skills for your career in tech and
              development.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={() => navigate("/exam-roadmap")}
            className="group w-fit inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300"
          >
            View All Roadmaps

            <HiArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* =========================
            CONTENT
        ========================= */}

        {loading ? (
          <div className="flex gap-4 sm:gap-5 overflow-hidden pb-3">
            {[...Array(5)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : roadmaps.length === 0 ? (
          /* Empty State */
          <div
            className={`rounded-3xl border p-10 text-center ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-200 bg-white"
            }`}
          >
            <PiPathBold className="mx-auto mb-4 text-4xl text-blue-500" />

            <h3 className="text-lg font-medium mb-2">
              No roadmaps available
            </h3>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-slate-500"
              }`}
            >
              New learning roadmaps will appear here soon.
            </p>
          </div>
        ) : (
          <>
            {/* =========================
                SLIDER TOP BAR
            ========================= */}

            <div className="flex items-center justify-between mb-4">
              <p
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-500" : "text-slate-500"
                }`}
              >
                Choose a path and start learning
              </p>

              {/* Desktop Controls */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  aria-label="Previous roadmaps"
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
                  aria-label="Next roadmaps"
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
                SLIDER
            ========================= */}

            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-5 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            >
              {roadmaps.map((roadmap, index) => (
                <Link
                  key={roadmap._id}
                  to={`/roadmap/${roadmap._id}`}
                  className={`roadmap-card group relative flex-shrink-0 snap-start w-[270px] sm:w-[300px] md:w-[330px] rounded-3xl p-5 sm:p-6 cursor-pointer border overflow-hidden transition-colors duration-300 ${
                    isDark
                      ? "bg-white/[0.045] border-white/10 hover:bg-blue-600 hover:border-blue-500"
                      : "bg-white border-slate-200 hover:bg-blue-600 hover:border-blue-500 shadow-sm hover:shadow-2xl"
                  }`}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                >
                  {/* Card Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative Line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:via-white/50 transition-all duration-500" />

                  {/* =========================
                      CARD TOP
                  ========================= */}

                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-[2px] uppercase text-blue-500 group-hover:text-white transition-colors duration-300">
                      Roadmap {index + 1}
                    </span>

                    <div
                      className={`roadmap-icon w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-blue-400 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-blue-50 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      <PiPathBold />
                    </div>
                  </div>

                  {/* =========================
                      TITLE
                  ========================= */}

                  <h3
                    className={`relative z-10 font-medium tracking-tight text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] leading-snug capitalize line-clamp-2 min-h-[58px] transition-colors duration-300 ${
                      isDark
                        ? "text-white"
                        : "text-slate-900 group-hover:text-white"
                    }`}
                  >
                    {getRoadmapTitle(roadmap)}
                  </h3>

                  {/* =========================
                      DESCRIPTION
                  ========================= */}

                  <p
                    className={`relative z-10 mt-3 text-[11px] sm:text-xs md:text-sm leading-relaxed line-clamp-3 min-h-[58px] transition-colors duration-300 ${
                      isDark
                        ? "text-gray-400 group-hover:text-blue-50"
                        : "text-slate-500 group-hover:text-blue-50"
                    }`}
                  >
                    {roadmap.description
                      ? roadmap.description.slice(0, 120)
                      : "Follow this roadmap to build your knowledge step by step and grow your technical skills with a clear learning path."}
                    ...
                  </p>

                  {/* =========================
                      CHIPS
                  ========================= */}

                  <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      {roadmap.category || "Career Growth"}
                    </span>

                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1.5 transition-colors duration-300 ${
                        isDark
                          ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      <HiOutlineSparkles
                        className="roadmap-sparkles"
                        size={13}
                      />
                      Step by Step
                    </span>
                  </div>

                  {/* =========================
                      CTA
                  ========================= */}

                  <div
                    className={`relative z-10 mt-5 w-full py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                      isDark
                        ? "bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-600"
                        : "bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-600"
                    }`}
                  >
                    Explore Roadmap

                    <HiArrowRight
                      className="roadmap-arrow"
                      size={18}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Hint */}
            <div className="sm:hidden mt-3 text-center">
              <p
                className={`text-[11px] ${
                  isDark ? "text-gray-500" : "text-slate-500"
                }`}
              >
                Swipe to explore more roadmaps →
              </p>
            </div>
          </>
        )}
      </div>

      {/* =========================
          HIDE SCROLLBAR
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

export default RoadmapSection;

