import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";

const Banner = () => {
  const [theme] = useTheme();

  const heroRef = useRef(null);

  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  const visualRef = useRef(null);

  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const isDark = theme === "dark";

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return undefined;

    /* =========================================
       INITIAL STATE
    ========================================== */

    gsap.set(badgeRef.current, {
      opacity: 0,
      y: 25,
      scale: 0.9,
    });

    gsap.set(titleRef.current, {
      opacity: 0,
      y: 60,
    });

    gsap.set(textRef.current, {
      opacity: 0,
      y: 25,
    });

    gsap.set(lineRef.current, {
      opacity: 0,
      scaleX: 0,
    });

    /* =========================================
       HERO ENTRY ANIMATION
    ========================================== */

    const entryTimeline = gsap.timeline();

    entryTimeline
      .to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.35"
      )
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.55"
      )
      .to(
        lineRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    /* =========================================
       FLOATING ORBS
    ========================================== */

    const orb1Animation = gsap.to(orb1Ref.current, {
      x: 70,
      y: 35,
      scale: 1.12,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const orb2Animation = gsap.to(orb2Ref.current, {
      x: -60,
      y: -35,
      scale: 1.15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const orb3Animation = gsap.to(orb3Ref.current, {
      x: 35,
      y: 40,
      scale: 1.1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* =========================================
       FLOATING CARDS
    ========================================== */

    const card1Animation = gsap.to(card1Ref.current, {
      y: -12,
      rotation: 2,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const card2Animation = gsap.to(card2Ref.current, {
      y: 15,
      rotation: -2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const card3Animation = gsap.to(card3Ref.current, {
      y: -10,
      rotation: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* =========================================
       MOUSE PARALLAX
    ========================================== */

    const handleMouseMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left) / rect.width - 0.5;

      const mouseY =
        (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(visualRef.current, {
        x: mouseX * 12,
        y: mouseY * 8,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb1Ref.current, {
        x: mouseX * 50,
        y: mouseY * 30,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb2Ref.current, {
        x: mouseX * -45,
        y: mouseY * -25,
        duration: 1.3,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb3Ref.current, {
        x: mouseX * 30,
        y: mouseY * 25,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(visualRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb1Ref.current, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb2Ref.current, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(orb3Ref.current, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    /* =========================================
       CLEANUP
    ========================================== */

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);

      entryTimeline.kill();

      orb1Animation.kill();
      orb2Animation.kill();
      orb3Animation.kill();

      card1Animation.kill();
      card2Animation.kill();
      card3Animation.kill();

      gsap.killTweensOf([
        badgeRef.current,
        titleRef.current,
        textRef.current,
        lineRef.current,
        visualRef.current,
        orb1Ref.current,
        orb2Ref.current,
        orb3Ref.current,
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
      ]);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`
        relative
        w-full
        min-h-[560px]
        sm:min-h-[620px]
        md:min-h-[680px]
        lg:min-h-[720px]
        mt-28
        overflow-hidden
        flex
        items-center
        justify-center
        transition-colors
        duration-500
        ${
          isDark
            ? "bg-[#0b1120] text-white"
            : "bg-white text-slate-900"
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
              ? "bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.12),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.07),transparent_45%)]"
          }
        `}
      />

      {/* =========================================
          GRID
      ========================================== */}

      <div
        className={`
          absolute
          inset-0
          pointer-events-none
          opacity-[0.035]
          ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]"
              : "bg-[linear-gradient(#2563eb_1px,transparent_1px),linear-gradient(90deg,#2563eb_1px,transparent_1px)]"
          }
          bg-[size:60px_60px]
        `}
      />

      {/* =========================================
          ORB 1
      ========================================== */}

      <div
        ref={orb1Ref}
        className={`
          absolute
          -top-40
          -left-40
          w-[300px]
          h-[300px]
          sm:w-[450px]
          sm:h-[450px]
          rounded-full
          blur-[110px]
          pointer-events-none
          ${
            isDark
              ? "bg-blue-600/20"
              : "bg-blue-400/10"
          }
        `}
      />

      {/* =========================================
          ORB 2
      ========================================== */}

      <div
        ref={orb2Ref}
        className={`
          absolute
          -bottom-40
          -right-40
          w-[330px]
          h-[330px]
          sm:w-[470px]
          sm:h-[470px]
          rounded-full
          blur-[120px]
          pointer-events-none
          ${
            isDark
              ? "bg-indigo-600/20"
              : "bg-indigo-400/10"
          }
        `}
      />

      {/* =========================================
          ORB 3
      ========================================== */}

      <div
        ref={orb3Ref}
        className={`
          absolute
          top-[25%]
          right-[15%]
          w-[180px]
          h-[180px]
          rounded-full
          blur-[90px]
          pointer-events-none
          ${
            isDark
              ? "bg-cyan-500/10"
              : "bg-cyan-300/10"
          }
        `}
      />

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          mx-auto
          px-5
          sm:px-8
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* =========================================
            BADGE
        ========================================== */}

        <div
          ref={badgeRef}
          className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            backdrop-blur-md
            mb-6
            ${
              isDark
                ? "border-blue-400/20 bg-blue-500/10"
                : "border-blue-100 bg-blue-50/70"
            }
          `}
        >
          <span
            className="
              w-2
              h-2
              rounded-full
              bg-blue-500
              shadow-[0_0_12px_rgba(59,130,246,0.7)]
              animate-pulse
            "
          />

          <span
            className={`
              text-[10px]
              sm:text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              ${
                isDark
                  ? "text-blue-300"
                  : "text-blue-600"
              }
            `}
          >
            Learn • Build • Grow
          </span>
        </div>

        {/* =========================================
            TITLE
        ========================================== */}

        <div
          ref={titleRef}
          className="will-change-transform"
        >
          <h1
            className={`
              font-extrabold
              tracking-[-0.045em]
              leading-[0.98]
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
              ${
                isDark
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            Learn something

            <span
              className="
                block
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-cyan-500
                bg-clip-text
                text-transparent
              "
            >
              new every day.
            </span>
          </h1>
        </div>

        {/* =========================================
            DESCRIPTION
        ========================================== */}

        <p
          ref={textRef}
          className={`
            mt-7
            max-w-2xl
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            leading-relaxed
            ${
              isDark
                ? "text-slate-400"
                : "text-slate-500"
            }
          `}
        >
          Explore knowledge, build real skills and
          grow your potential with a modern learning
          experience designed for curious minds.
        </p>

        {/* =========================================
            LEARNING VISUAL
        ========================================== */}

        <div
          ref={visualRef}
          className="
            relative
            mt-12
            sm:mt-14
            w-full
            max-w-3xl
            h-[130px]
            sm:h-[160px]
            md:h-[180px]
            will-change-transform
          "
        >
          {/* Center Line */}

          <div
            className={`
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[75%]
              h-px
              ${
                isDark
                  ? "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                  : "bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              }
            `}
          />

          {/* =========================================
              CARD 1
          ========================================== */}

          <div
            ref={card1Ref}
            className={`
              absolute
              left-[3%]
              sm:left-[8%]
              top-1/2
              -translate-y-1/2
              w-28
              sm:w-36
              md:w-40
              p-3
              sm:p-4
              rounded-2xl
              border
              backdrop-blur-xl
              shadow-xl
              ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-slate-200 bg-white/80 shadow-slate-200/50"
              }
            `}
          >
            <div
              className="
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-xl
                bg-blue-500/10
                flex
                items-center
                justify-center
                mb-2
              "
            >
              <span className="text-blue-500 text-sm sm:text-base">
                📚
              </span>
            </div>

            <div
              className={`
                h-1.5
                w-16
                sm:w-20
                rounded-full
                ${
                  isDark
                    ? "bg-white/10"
                    : "bg-slate-200"
                }
              `}
            />

            <div
              className={`
                mt-2
                h-1
                w-10
                sm:w-14
                rounded-full
                ${
                  isDark
                    ? "bg-white/5"
                    : "bg-slate-100"
                }
              `}
            />
          </div>

          {/* =========================================
              CENTER CARD
          ========================================== */}

          <div
            ref={card2Ref}
            className={`
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-36
              sm:w-44
              md:w-52
              p-4
              sm:p-5
              rounded-2xl
              border
              backdrop-blur-xl
              shadow-2xl
              z-10
              ${
                isDark
                  ? "border-blue-400/20 bg-blue-500/[0.06]"
                  : "border-blue-100 bg-white/90 shadow-blue-100"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-500
                  to-indigo-500
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                ✦
              </div>

              <div className="flex-1">
                <div
                  className={`
                    h-2
                    w-20
                    sm:w-24
                    rounded-full
                    ${
                      isDark
                        ? "bg-white/20"
                        : "bg-slate-200"
                    }
                  `}
                />

                <div
                  className={`
                    mt-2
                    h-1.5
                    w-14
                    sm:w-18
                    rounded-full
                    ${
                      isDark
                        ? "bg-white/10"
                        : "bg-slate-100"
                    }
                  `}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-blue-500" />

              <span
                className={`
                  h-1.5
                  w-8
                  rounded-full
                  ${
                    isDark
                      ? "bg-white/10"
                      : "bg-slate-100"
                  }
                `}
              />

              <span
                className={`
                  h-1.5
                  w-5
                  rounded-full
                  ${
                    isDark
                      ? "bg-white/10"
                      : "bg-slate-100"
                  }
                `}
              />
            </div>
          </div>

          {/* =========================================
              CARD 3
          ========================================== */}

          <div
            ref={card3Ref}
            className={`
              absolute
              right-[3%]
              sm:right-[8%]
              top-1/2
              -translate-y-1/2
              w-28
              sm:w-36
              md:w-40
              p-3
              sm:p-4
              rounded-2xl
              border
              backdrop-blur-xl
              shadow-xl
              ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-slate-200 bg-white/80 shadow-slate-200/50"
              }
            `}
          >
            <div
              className="
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-xl
                bg-indigo-500/10
                flex
                items-center
                justify-center
                mb-2
              "
            >
              <span className="text-indigo-500 text-sm sm:text-base">
                ✎
              </span>
            </div>

            <div
              className={`
                h-1.5
                w-16
                sm:w-20
                rounded-full
                ${
                  isDark
                    ? "bg-white/10"
                    : "bg-slate-200"
                }
              `}
            />

            <div
              className={`
                mt-2
                h-1
                w-10
                sm:w-14
                rounded-full
                ${
                  isDark
                    ? "bg-white/5"
                    : "bg-slate-100"
                }
              `}
            />
          </div>
        </div>

        {/* =========================================
            BOTTOM LINE
        ========================================== */}

        <div
          ref={lineRef}
          className="
            mt-5
            flex
            items-center
            gap-3
          "
        >
          <div
            className={`
              w-16
              sm:w-24
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              ${
                isDark
                  ? "via-blue-400/50"
                  : "via-blue-500/50"
              }
            `}
          />

          <span
            className={`
              text-[9px]
              sm:text-[10px]
              uppercase
              tracking-[0.35em]
              font-medium
              whitespace-nowrap
              ${
                isDark
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Your journey starts here
          </span>

          <div
            className={`
              w-16
              sm:w-24
              h-[2px]
              rounded-full
              bg-gradient-to-l
              from-transparent
              ${
                isDark
                  ? "via-blue-400/50"
                  : "via-blue-500/50"
              }
            `}
          />
        </div>
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
          h-28
          pointer-events-none
          ${
            isDark
              ? "bg-gradient-to-t from-[#0b1120] to-transparent"
              : "bg-gradient-to-t from-white to-transparent"
          }
        `}
      />
    </section>
  );
};

export default Banner;