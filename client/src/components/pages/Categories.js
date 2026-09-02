import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { GoBook } from "react-icons/go";
import {
  HiArrowRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { gsap } from "gsap";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonsRef = useRef(null);
  const hintRef = useRef(null);

  const [theme] = useTheme();

  const isDark = theme === "dark";

  /* =========================================
     FETCH CATEGORIES
  ========================================== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/notes");

        const uniqueCategories = [
          ...new Set(
            (res.data.notes || [])
              .map((note) => note?.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* =========================================
     GSAP ANIMATION
  ========================================== */

  useEffect(() => {
    if (loading || categories.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      // Initial state
      gsap.set(
        [
          headingRef.current,
          descriptionRef.current,
          buttonsRef.current,
          ...cards,
        ],
        {
          opacity: 0,
          y: 35,
        }
      );

      // Main entrance
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          hintRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.2"
        );

      /* =========================================
         CARD HOVER ANIMATION
      ========================================== */

      cards.forEach((card) => {
        const icon = card.querySelector(".category-icon");
        const arrow = card.querySelector(".category-arrow");

        const handleEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.015,
            duration: 0.35,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.08,
            rotate: 3,
            duration: 0.35,
            ease: "power2.out",
          });

          gsap.to(arrow, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(arrow, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        card._handleEnter = handleEnter;
        card._handleLeave = handleLeave;
      });

      /* =========================================
         SCROLL REVEAL
      ========================================== */

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          [
            headingRef.current,
            descriptionRef.current,
            buttonsRef.current,
            ...cards,
            hintRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );
      }

      return () => {
        cards.forEach((card) => {
          if (card._handleEnter) {
            card.removeEventListener(
              "mouseenter",
              card._handleEnter
            );
          }

          if (card._handleLeave) {
            card.removeEventListener(
              "mouseleave",
              card._handleLeave
            );
          }
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, categories]);

  /* =========================================
     HORIZONTAL SCROLL
  ========================================== */

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const amount = window.innerWidth < 640 ? 220 : 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`
      relative
    w-full
    py-14
    sm:py-16
    md:py-20
    lg:py-24
    px-4
    sm:px-6
    lg:px-8
    transition-colors
    duration-500
        ${
          isDark
            ? "bg-[#0b1120] text-white"
            : "bg-slate-50 text-slate-900"
        }
      `}
    >
      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className={`
          absolute
          inset-0
          pointer-events-none
          ${
            isDark
              ? "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.10),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.07),transparent_45%)]"
          }
        `}
      />

      {/* =========================================
          SUBTLE GRID
      ========================================== */}

      <div
        className={`
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
          ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]"
              : "bg-[linear-gradient(#2563eb_1px,transparent_1px),linear-gradient(90deg,#2563eb_1px,transparent_1px)]"
          }
          bg-[size:60px_60px]
        `}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* =========================================
            HEADER
        ========================================== */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-6
            mb-9
            md:mb-11
          "
        >
          <div className="max-w-3xl">

            {/* Small Label */}

            <div
              ref={headingRef}
              className="opacity-0"
            >
              <p
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-blue-600
                  font-medium
                  tracking-[0.2em]
                  uppercase
                  text-[10px]
                  sm:text-xs
                  mb-3
                "
              >
                <span className="w-5 h-px bg-blue-500" />
                Explore Topics
              </p>

              <h2
                className={`
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                  font-light
                  leading-tight
                  tracking-[-0.025em]
                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                Browse Study Categories
              </h2>
            </div>

            {/* Description */}

            <p
              ref={descriptionRef}
              className={`
                opacity-0
                mt-4
                max-w-2xl
                text-sm
                sm:text-base
                md:text-lg
                leading-relaxed
                ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-600"
                }
              `}
            >
              Discover notes and learning materials across
              programming, technology, development, and
              student-focused subjects.
            </p>
          </div>

          {/* =========================================
              SCROLL BUTTONS
          ========================================== */}

          <div
            ref={buttonsRef}
            className="
              hidden
              md:flex
              items-center
              gap-2
              opacity-0
            "
          >
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous categories"
              className={`
                group
                w-11
                h-11
                rounded-full
                border
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white shadow-sm"
                }
              `}
            >
              <HiOutlineChevronLeft
                size={21}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-0.5
                "
              />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next categories"
              className={`
                group
                w-11
                h-11
                rounded-full
                border
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white shadow-sm"
                }
              `}
            >
              <HiOutlineChevronRight
                size={21}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </button>
          </div>
        </div>

        {/* =========================================
            CONTENT
        ========================================== */}

        {loading ? (
          <div
            className="
              flex
              gap-4
              sm:gap-5
              overflow-hidden
              pb-2
            "
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`
                  shrink-0
                  w-[210px]
                  sm:w-[230px]
                  md:w-[250px]
                  h-[180px]
                  rounded-2xl
                  animate-pulse
                  ${
                    isDark
                      ? "bg-white/[0.05]"
                      : "bg-slate-200"
                  }
                `}
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center">
            <p
              className={`
                text-base
                sm:text-lg
                ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            >
              No Categories Found 😢
            </p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="
              flex
              gap-4
              sm:gap-5
              overflow-x-auto
              overflow-y-hidden
              scroll-smooth
              no-scrollbar
              pb-4
              px-1
              -mx-1
            "
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() =>
                  navigate(`/notes-category/${cat}`)
                }
                className={`
                  group
                  relative
                  shrink-0
                  w-[210px]
                  sm:w-[230px]
                  md:w-[250px]
                  min-h-[185px]
                  rounded-2xl
                  border
                  cursor-pointer
                  p-5
                  sm:p-6
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  transition-colors
                  duration-300
                  ${
                    isDark
                      ? "bg-white/[0.035] border-white/[0.08] hover:border-blue-400/30"
                      : "bg-white border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
                  }
                `}
              >
                {/* Card Glow */}

                <div
                  className={`
                    absolute
                    -top-20
                    -right-20
                    w-32
                    h-32
                    rounded-full
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    ${
                      isDark
                        ? "bg-blue-500/20"
                        : "bg-blue-400/10"
                    }
                  `}
                />

                {/* =====================================
                    ICON
                ====================================== */}

                <div
                  className={`
                    category-icon
                    relative
                    w-11
                    h-11
                    sm:w-12
                    sm:h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                    sm:text-2xl
                    transition-colors
                    duration-300
                    ${
                      isDark
                        ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
                        : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    }
                  `}
                >
                  <GoBook />
                </div>

                {/* =====================================
                    CONTENT
                ====================================== */}

                <div className="relative mt-5">

                  <h3
                    className={`
                      text-[15px]
                      sm:text-base
                      md:text-lg
                      font-medium
                      tracking-wide
                      truncate
                      ${
                        isDark
                          ? "text-slate-100"
                          : "text-slate-800"
                      }
                    `}
                  >
                    {cat}
                  </h3>

                  <p
                    className={`
                      mt-2
                      text-[11px]
                      sm:text-xs
                      md:text-sm
                      leading-relaxed
                      line-clamp-2
                      ${
                        isDark
                          ? "text-slate-500"
                          : "text-slate-500"
                      }
                    `}
                  >
                    Explore notes, PDFs and study materials
                    in this category.
                  </p>

                  <div
                    className={`
                      category-arrow
                      mt-4
                      flex
                      items-center
                      gap-2
                      text-[11px]
                      sm:text-xs
                      font-medium
                      ${
                        isDark
                          ? "text-blue-400"
                          : "text-blue-600"
                      }
                    `}
                  >
                    View Category
                    <HiArrowRight size={15} />
                  </div>

                </div>

                {/* Bottom Accent */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-500/30
                    to-transparent
                    scale-x-0
                    group-hover:scale-x-100
                    transition-transform
                    duration-500
                    origin-center
                  "
                />
              </div>
            ))}
          </div>
        )}

        {/* =========================================
            MOBILE HINT
        ========================================== */}

        {!loading && categories.length > 0 && (
          <div
            ref={hintRef}
            className="
              md:hidden
              mt-4
              text-center
              opacity-0
            "
          >
            <p
              className={`
                text-[10px]
                sm:text-xs
                tracking-wide
                ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Swipe to explore more categories
              <span className="ml-1">→</span>
            </p>
          </div>
        )}

      </div>

      {/* =========================================
          BOTTOM FADE
      ========================================== */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          right-0
          h-16
          pointer-events-none
          ${
            isDark
              ? "bg-gradient-to-t from-[#0b1120] to-transparent"
              : "bg-gradient-to-t from-slate-50 to-transparent"
          }
        `}
      />
    </section>
  );
};

export default Categories;