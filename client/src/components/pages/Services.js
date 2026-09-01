
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Services = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const navigate = useNavigate();

  /* =========================
     FETCH SERVICES
  ========================= */

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/v1/sourcecode");

        if (isMounted) {
          setServices(res.data.slice(0, 10));
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
     GSAP ANIMATION
  ========================= */

  useEffect(() => {
    if (loading || services.length === 0) return undefined;

    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return undefined;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(header.children, {
        opacity: 0,
        y: 25,
      });

      gsap.set(".service-card", {
        opacity: 0,
        y: 45,
        scale: 0.97,
      });

      // Header animation
      gsap.to(header.children, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards animation
      gsap.to(".service-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Background glow
      gsap.to(".service-glow-one", {
        x: 45,
        y: -25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".service-glow-two", {
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
  }, [loading, services.length]);

  /* =========================
     CARD HOVER
  ========================= */

  const handleCardEnter = (e) => {
    const card = e.currentTarget;

    const image = card.querySelector(".service-image");
    const arrow = card.querySelector(".service-arrow");
    const icon = card.querySelector(".service-icon");

    gsap.to(card, {
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });

    if (image) {
      gsap.to(image, {
        scale: 1.07,
        duration: 0.6,
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

    if (icon) {
      gsap.to(icon, {
        rotate: 8,
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;

    const image = card.querySelector(".service-image");
    const arrow = card.querySelector(".service-arrow");
    const icon = card.querySelector(".service-icon");

    gsap.to(card, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
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

    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  /* =========================
     SLIDER
  ========================= */

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const amount = direction === "left" ? -350 : 350;

    sliderRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  /* =========================
     SKELETON
  ========================= */

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-[270px] sm:w-[300px] md:w-[330px] rounded-3xl overflow-hidden animate-pulse ${
        isDark
          ? "bg-white/[0.04] border border-white/10"
          : "bg-white border border-slate-200 shadow-sm"
      }`}
    >
      <div className="w-full aspect-[16/10] bg-gray-300/30" />

      <div className="p-5">
        <div className="h-3 w-20 rounded bg-gray-300/40 mb-4" />
        <div className="h-5 w-4/5 rounded bg-gray-300/40 mb-3" />
        <div className="h-4 w-20 rounded bg-gray-300/40 mb-5" />
        <div className="h-10 w-full rounded-xl bg-gray-300/40" />
      </div>
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
          BACKGROUND DECORATION
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`service-glow-one absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-600" : "bg-blue-300"
          }`}
        />

        <div
          className={`service-glow-two absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-indigo-600" : "bg-indigo-300"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_45%)]"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =========================
            HEADER
        ========================= */}

        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9 md:mb-12"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-blue-600" />

              <p className="text-blue-600 font-medium tracking-[3px] uppercase text-[10px] sm:text-xs">
                Build & Launch
              </p>
            </div>

            {/* Heading */}
            <h2
              className={`font-light leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Ready-Made
              <span className="block mt-1 font-medium bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Website Projects
              </span>
            </h2>

            <p
              className={`mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Explore professionally built website projects that you can
              customize, use, and launch faster.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={() => navigate("/service")}
            className="group w-fit inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300"
          >
            View All

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* =========================
            SLIDER
        ========================= */}

        <div className="relative">
          {/* Desktop Left Arrow */}
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            aria-label="Previous projects"
            className={`hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-gray-900/80 border-white/10 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
                : "bg-white/90 border-slate-200 text-slate-600 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
            }`}
          >
            <ChevronLeft size={21} />
          </button>

          {/* Desktop Right Arrow */}
          <button
            type="button"
            onClick={() => scrollSlider("right")}
            aria-label="Next projects"
            className={`hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-gray-900/80 border-white/10 text-gray-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
                : "bg-white/90 border-slate-200 text-slate-600 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
            }`}
          >
            <ChevronRight size={21} />
          </button>

          {/* Loading */}
          {loading ? (
            <div className="flex gap-4 sm:gap-5 overflow-hidden pb-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : services.length === 0 ? (
            /* Empty State */
            <div
              className={`rounded-3xl border p-10 text-center ${
                isDark
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-slate-200"
              }`}
            >
              <Sparkles className="mx-auto mb-4 text-blue-500" size={34} />

              <h3 className="text-lg font-medium mb-2">
                No projects available
              </h3>

              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-slate-500"
                }`}
              >
                New website projects will appear here soon.
              </p>
            </div>
          ) : (
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-5 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            >
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => navigate(`/service/${service._id}`)}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                  className={`service-card group relative flex-shrink-0 snap-start w-[270px] sm:w-[300px] md:w-[330px] overflow-hidden rounded-3xl cursor-pointer border transition-colors duration-300 ${
                    isDark
                      ? "bg-white/[0.045] border-white/10 hover:bg-[#202020] hover:border-blue-500/40"
                      : "bg-white border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-2xl"
                  }`}
                >
                  {/* =========================
                      IMAGE
                  ========================= */}

                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-gray-900">
                    <img
                      src={
                        service.thumbnail || "/default-thumbnail.png"
                      }
                      alt={service.title || "Website project"}
                      loading="lazy"
                      className="service-image absolute inset-0 w-full h-full object-cover object-center will-change-transform"
                      onError={(e) => {
                        e.currentTarget.src = "/default-thumbnail.png";
                      }}
                    />

                    {/* Dark image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Top Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-xs font-medium">
                        <Sparkles size={12} />
                        Ready to Launch
                      </span>
                    </div>

                    {/* Image Bottom Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-[2px] mb-1">
                        Website Project
                      </p>

                      <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* =========================
                      CONTENT
                  ========================= */}

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className={`text-[10px] sm:text-xs uppercase tracking-[1.5px] mb-1 ${
                            isDark
                              ? "text-gray-500"
                              : "text-slate-400"
                          }`}
                        >
                          Project Price
                        </p>

                        <p className="text-blue-600 font-bold text-lg sm:text-xl">
                          ₹{service.price}
                        </p>
                      </div>

                      <div
                        className={`service-icon flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                          isDark
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <ArrowRight size={18} />
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className={`mt-4 w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 text-gray-300 group-hover:bg-blue-600 group-hover:text-white"
                          : "bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      Explore Project

                      <ArrowRight
                        className="service-arrow"
                        size={16}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hint */}
        {!loading && services.length > 0 && (
          <div className="md:hidden mt-3 text-center">
            <p
              className={`text-[11px] ${
                isDark ? "text-gray-500" : "text-slate-500"
              }`}
            >
              Swipe to explore more projects →
            </p>
          </div>
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

export default Services;

