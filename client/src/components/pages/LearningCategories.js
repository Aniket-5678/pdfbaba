import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Laptop,
  ArrowRight,
} from "lucide-react";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, Reveal, panel, primary } from "./PageKit";
export const learningTopics = [
  {
    slug: "technology",
    title: "Technology",
    description:
      "Explore web development, modern tools, and the fundamentals behind great software.",
    icon: Laptop,
    color: "orange",
    lessons: [
      "Understand how browsers, HTTP, and APIs work together.",
      "Build a small interface with semantic HTML and Tailwind CSS.",
      "Connect your interface to an API and handle loading and error states.",
      "Use Git to track changes and deploy your first application.",
    ],
    links: [
      ["Explore website projects", "/service"],
      ["Developer roadmaps", "/exam-roadmap"],
    ],
  },
  {
    slug: "code-errors",
    title: "Code Errors",
    description:
      "Learn to debug common issues and understand why your code behaves the way it does.",
    icon: Code2,
    color: "violet",
    lessons: [
      "Read the first error and its stack trace before changing code.",
      "Create a minimal example that reproduces the issue.",
      "Check inputs, network responses, and environment configuration.",
      "Fix the root cause and verify both success and failure cases.",
    ],
    links: [
      ["Practice your skills", "/practice-quiz"],
      ["Explore source code", "/service"],
    ],
  },
  {
    slug: "bachelors",
    title: "Bachelors",
    description:
      "Build your foundations with programming practice and structured learning paths.",
    icon: GraduationCap,
    color: "blue",
    lessons: [
      "Start with programming fundamentals, data types, and control flow.",
      "Practice data structures and explain the trade-offs of your approach.",
      "Learn database modeling, relationships, and basic queries.",
      "Apply what you learn to a real project and document your decisions.",
    ],
    links: [
      ["Learning roadmaps", "/exam-roadmap"],
      ["Practice quizzes", "/practice-quiz"],
    ],
  },
  {
    slug: "exam-prep",
    title: "Exam Preparation",
    description:
      "Practice, revise, and prepare with quizzes and step-by-step study roadmaps.",
    icon: BookOpen,
    color: "emerald",
    lessons: [
      "Break your syllabus into small topics and plan regular revision.",
      "Practice with quizzes and review the reasoning behind each answer.",
      "Track weak areas and revisit them before moving forward.",
      "Use a roadmap to organize your next learning steps.",
    ],
    links: [
      ["Start practicing", "/practice-quiz"],
      ["Browse roadmaps", "/exam-roadmap"],
    ],
  },
];
const palettes = {
  orange: "from-orange-50 to-white border-orange-100",
  violet: "from-violet-50 to-white border-violet-100",
  blue: "from-blue-50 to-white border-blue-100",
  emerald: "from-emerald-50 to-white border-emerald-100",
};
const ink = {
  orange: "text-orange-500 bg-orange-100",
  violet: "text-violet-600 bg-violet-100",
  blue: "text-blue-600 bg-blue-100",
  emerald: "text-emerald-600 bg-emerald-100",
};
export default function LearningCategories({ standalone = false }) {
  const reduced = useReducedMotion();
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="learning"
      className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-violet-50/50 px-5 py-14 sm:px-10"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 rounded-full bg-blue-50 px-5 py-2 text-xs font-semibold tracking-[3px] text-blue-600">
              <BookOpen size={19} />
              EXPLORE TOPICS
            </p>
            <Heading className="text-[40px] font-extrabold leading-[1.03] tracking-[-2px] text-slate-950 sm:text-[64px]">
              Browse{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Study
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Categories
              </span>
            </Heading>
            <div className="mt-3 h-1 w-2/3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
            <p className="mt-5 max-w-[620px] text-base leading-relaxed text-slate-500">
              Explore programming, technology, development, and student-focused
              learning paths. Build your understanding, then put it into
              practice.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                [BookOpen, "Practical Learning", "Understand the fundamentals"],
                [Code2, "Real Source Code", "Learn by building"],
                [Laptop, "Wide Categories", "Find your next topic"],
                [GraduationCap, "For Students", "And developers"],
              ].map(([Icon, title, text], i) => (
                <div key={title} className="flex items-center gap-3">
                  <div className={"rounded-xl p-3 " + Object.values(ink)[i]}>
                    <Icon size={23} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold">{title}</h3>
                    <p className="mt-1 text-[10px] text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            aria-hidden="true"
            animate={reduced ? {} : { y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-[660px]"
          >
            <img
              src="/images/learning-chapters.png"
              alt=""
              width="1536"
              height="1024"
              loading={standalone ? "eager" : "lazy"}
              decoding="async"
              className="h-auto w-full rounded-[32px] mix-blend-multiply"
            />
          </motion.div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {learningTopics.map(
            ({ slug, title, description, icon: Icon, color }, i) => (
              <motion.div
                key={slug}
                initial={reduced ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  to={"/learn/" + slug}
                  className={
                    "group relative block h-full overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-[0_12px_32px_-24px_rgba(35,50,90,.3)] transition duration-300 motion-safe:hover:-translate-y-2 hover:shadow-xl " +
                    palettes[color]
                  }
                >
                  <div
                    className={"mb-5 inline-flex rounded-2xl p-4 " + ink[color]}
                  >
                    <Icon size={31} />
                  </div>
                  <h3 className="text-[24px] font-extrabold tracking-tight text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-2 min-h-[64px] text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Explore learning paths
                    </span>
                    <span
                      className={
                        "rounded-full p-3 transition group-hover:translate-x-1 " +
                        ink[color]
                      }
                    >
                      <ArrowRight size={21} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
export function LearningPage() {
  const { topic } = useParams();
  const data = learningTopics.find((item) => item.slug === topic);
  const Icon = data?.icon || BookOpen;
  return (
    <Layout>
      {data ? (
        <>
          <Seo
            title={data.title + " Learning Guide"}
            description={data.description}
          />
          <PageHero
            eyebrow="CURIOUS MINDS START HERE"
            title={data.title}
            accent="Made approachable."
            description={data.description}
          >
            <Link
              to="/categories"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-violet-600"
            >
              ← All learning categories
            </Link>
          </PageHero>
          <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight">
                A little structure. A lot of possibility.
              </h2>
              <p className="mb-7 text-sm leading-7 text-slate-500">
                Start with these foundations, then explore a project or
                challenge to bring them to life.
              </p>
              <ol className="space-y-4">
                {data.lessons.map((text, index) => (
                  <li key={text}>
                    <Reveal>
                      <div
                        className={
                          panel +
                          " group flex gap-4 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                        }
                      >
                        <span
                          className={
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold " +
                            ink[data.color]
                          }
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
                            Your next foundation
                          </p>
                          <h3 className="text-sm font-semibold leading-7 text-slate-700">
                            {text}
                          </h3>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
            <aside>
              <div className="rounded-3xl bg-slate-950 p-7 text-white lg:sticky lg:top-6">
                <span className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-violet-300">
                  <Icon size={28} />
                </span>
                <h2 className="text-xl font-bold">Make learning hands-on.</h2>
                <p className="mb-6 mt-3 text-xs leading-7 text-slate-400">
                  Reading is a starting point. Build something, test your
                  understanding, and keep exploring.
                </p>
                {data.links.map(([title, path]) => (
                  <Link
                    key={path}
                    to={path}
                    className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold transition hover:border-violet-400 hover:bg-violet-600"
                  >
                    {title}
                    <ArrowRight size={16} />
                  </Link>
                ))}
                <Link
                  to="/notes"
                  className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold transition hover:border-violet-400 hover:bg-violet-600"
                >
                  Explore study notes
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-xl px-5 py-20 text-center">
          <BookOpen className="mx-auto mb-5 text-violet-400" size={40} />
          <h1 className="text-3xl font-bold">Topic not found</h1>
          <Link to="/categories" className={primary + " mt-6"}>
            Browse learning categories
            <ArrowRight size={16} />
          </Link>
        </section>
      )}
    </Layout>
  );
}
