import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Code2,
  Braces,
  Box,
  GraduationCap,
  Zap,
  Users,
  LayoutDashboard,
  FolderCode,
  Layers,
  Check,
  Leaf,
} from "lucide-react";
import { FaReact, FaNodeJs, FaBootstrap } from "react-icons/fa";
export default function Banner() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-10 sm:px-10 lg:pt-16">
      <div className="pointer-events-none absolute right-0 top-12 h-[600px] w-[750px] max-w-full rounded-full bg-gradient-to-br from-orange-100/60 via-violet-200/60 to-blue-100/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-violet-50 px-4 py-2 text-[12px] font-medium text-slate-700">
            <Zap size={16} className="text-orange-500" />
            Premium Source Codes for Modern Developers
          </p>
          <h1 className="text-[46px] font-extrabold leading-[1.02] tracking-[-2.5px] text-slate-950 sm:text-[68px] xl:text-[82px]">
            Build Faster.
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              Create Bigger.
            </span>
          </h1>
          <div
            aria-hidden="true"
            className="mt-3 h-1 w-3/4 -rotate-1 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-500"
          />
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-slate-500 sm:text-[17px]">
            Get high-quality, ready-to-use source codes for your next project.{" "}
            <br className="hidden xl:block" />
            From web apps to full-stack solutions — everything you need, in one
            place.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/service"
              className="inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-orange-200/50 transition hover:-translate-y-1"
            >
              Explore Projects <ArrowRight size={20} />
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-violet-50"
            >
              <span className="rounded-full bg-orange-500 p-1 text-white">
                <Play size={14} fill="currentColor" />
              </span>
              Preview Projects
            </a>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["JS", "UI", "API", "DB"].map((name, i) => (
                <span
                  key={name}
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold " +
                    [
                      "bg-orange-100 text-orange-700",
                      "bg-violet-100 text-violet-700",
                      "bg-blue-100 text-blue-700",
                      "bg-emerald-100 text-emerald-700",
                    ][i]
                  }
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-xs leading-6 text-slate-500">
              <strong className="block text-sm text-slate-950">
                Your next idea starts here.
              </strong>
              Source code. Real learning. More possibilities.
            </p>
          </div>
        </motion.div>
        <div
          className="relative mx-auto w-full max-w-[650px] pb-12 pt-20 sm:pt-16"
          aria-hidden="true"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-10 bottom-12 top-16 rounded-full bg-gradient-to-br from-orange-200/50 via-violet-300/70 to-blue-100"
          />
          <motion.div
            animate={reduced ? {} : { y: [0, -9, 0], rotate: [-2, -1, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-[88%] rounded-[22px] border-[9px] border-slate-950 bg-white shadow-2xl shadow-violet-300/50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3 text-[10px]">
              <span className="flex items-center gap-1 font-bold text-slate-950">
                <Braces size={16} className="text-orange-500" />
                CodeBricket
              </span>
              <span className="text-slate-400">Your workspace, upgraded.</span>
              <span className="flex gap-1">
                <i className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                <i className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              </span>
            </div>
            <div className="grid min-h-[260px] grid-cols-[.28fr_1fr] sm:min-h-[320px]">
              <div className="space-y-5 border-r border-slate-100 bg-violet-50/50 p-3 text-[9px] text-slate-500">
                {[
                  [LayoutDashboard, "Dashboard"],
                  [FolderCode, "Projects"],
                  [Layers, "Components"],
                  [Code2, "Templates"],
                  [Users, "My Library"],
                ].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={12} />
                    <span className="hidden sm:block">{label}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 sm:p-7">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-violet-500">
                  Build & launch
                </p>
                <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
                  Modern Full-Stack
                  <br />
                  Dashboard Template
                </h2>
                <p className="mt-3 max-w-[260px] text-[10px] leading-relaxed text-slate-500">
                  A thoughtful starting point for your next big idea. Clean
                  interfaces. Powerful possibilities.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-md bg-orange-500 px-3 py-2 text-[9px] font-bold text-white">
                    Get inspired
                  </span>
                  <span className="rounded-md border border-slate-200 px-3 py-2 text-[9px] font-medium">
                    Live preview
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {["Clean code", "Responsive", "Customizable"].map((label) => (
                    <div
                      key={label}
                      className="rounded-lg bg-slate-50 p-2 text-center text-[8px] font-semibold text-slate-700"
                    >
                      <Check
                        size={14}
                        className="mx-auto mb-1 text-violet-500"
                      />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[3%] h-6 w-[94%] rounded-b-[50%] border-b-4 border-slate-300 bg-gradient-to-b from-slate-100 to-slate-400 shadow-xl"
          />
          {[
            [FaReact, "React", "text-cyan-500", "left-0 top-12"],
            [FaNodeJs, "Node.js", "text-green-600", "left-[30%] top-0"],
            [Code2, "Next.js", "text-slate-950", "right-[12%] top-0"],
            [FaBootstrap, "Bootstrap", "text-purple-600", "-right-1 top-28"],
            [Leaf, "MongoDB", "text-emerald-600", "right-0 bottom-20"],
          ].map(([Icon, label, color, position], i) => (
            <motion.div
              key={label}
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className={
                "absolute flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border border-white bg-white shadow-lg shadow-violet-100/70 sm:h-24 sm:w-24 " +
                position
              }
            >
              <Icon size={33} className={color} />
              <span className="text-[10px] font-semibold text-slate-700">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-8 grid max-w-[1360px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            Box,
            "Ready-to-Use Projects",
            "High-quality, well-structured source codes.",
            "bg-orange-50 text-orange-500",
          ],
          [
            GraduationCap,
            "Learn & Improve",
            "Understand real-world implementations.",
            "bg-violet-50 text-violet-600",
          ],
          [
            Zap,
            "Save Development Time",
            "Focus on your ideas, less on boilerplate.",
            "bg-pink-50 text-pink-500",
          ],
          [
            Users,
            "Built for Developers",
            "Start small. Experiment. Build something bigger.",
            "bg-blue-50 text-blue-500",
          ],
        ].map(([Icon, title, copy, color]) => (
          <div
            key={title}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-[0_8px_35px_-20px_rgba(40,45,80,0.25)]"
          >
            <div className={"rounded-2xl p-4 " + color}>
              <Icon size={28} />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
