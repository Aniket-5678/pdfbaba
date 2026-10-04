import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Laptop,
  ArrowRight,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import Layout from "../Layout/Layout";
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
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
            animate={reduced ? {} : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative mx-auto flex h-[310px] w-full max-w-[430px] flex-col items-center justify-end pb-4"
          >
            <div className="absolute inset-5 rounded-full border border-dashed border-violet-200 bg-gradient-to-br from-orange-100/50 to-violet-200/40" />
            <GraduationCap
              size={140}
              strokeWidth={1.1}
              className="absolute -top-4 z-10 -rotate-12 fill-slate-900 text-slate-900 drop-shadow-xl"
            />
            {[
              [
                "Programming",
                "bg-gradient-to-r from-orange-500 to-orange-400",
                "-rotate-3",
              ],
              [
                "Technology",
                "bg-gradient-to-r from-violet-600 to-violet-400",
                "rotate-2",
              ],
              [
                "Practice & Learn",
                "bg-gradient-to-r from-blue-600 to-blue-400",
                "-rotate-1",
              ],
              [
                "Your next chapter",
                "bg-gradient-to-r from-slate-200 to-white",
                "rotate-1",
              ],
            ].map(([title, color, rotate], i) => (
              <div
                key={title}
                className={
                  "relative mb-1 flex h-14 w-[78%] items-center justify-between rounded-l-xl rounded-r-md border-b-[5px] border-black/15 pl-5 text-[17px] font-bold shadow-lg " +
                  color +
                  " " +
                  rotate +
                  " " +
                  (i === 3 ? "text-slate-700" : "text-white")
                }
              >
                <span>{title}</span>
                <span className="mr-1 h-10 w-14 rounded-l-xl border-y-4 border-white/80 bg-[repeating-linear-gradient(0deg,#f8fafc_0px,#f8fafc_3px,#e2e8f0_4px)]" />
              </div>
            ))}
            <span className="absolute -left-2 top-14 -rotate-12 rounded-2xl bg-white p-4 shadow-lg">
              <Code2 size={32} className="text-violet-500" />
            </span>
            <span className="absolute right-0 top-24 rotate-12 rounded-2xl bg-white p-4 shadow-lg">
              <Lightbulb size={32} className="text-orange-400" />
            </span>
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
                    "group relative block h-full overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-[0_12px_32px_-24px_rgba(35,50,90,.3)] transition hover:-translate-y-2 hover:shadow-xl " +
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
  const data = learningTopics.find((x) => x.slug === topic);
  return (
    <Layout>
      {data ? (
        <section className="mx-auto max-w-4xl px-5 py-16">
          <Link
            to="/categories"
            className="text-sm font-medium text-violet-600"
          >
            ← All learning categories
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
            {data.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            {data.description}
          </p>
          <div className="my-9 space-y-4">
            {data.lessons.map((text, i) => (
              <div
                key={text}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6"
              >
                <CheckCircle className="shrink-0 text-violet-500" />
                <div>
                  <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Step {i + 1}
                  </h2>
                  <p className="text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {data.links.map(([title, path]) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
              >
                {title}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="p-16 text-center">
          <h1 className="text-3xl font-bold">Topic not found</h1>
          <Link to="/categories" className="mt-5 block text-violet-600">
            Browse learning categories
          </Link>
        </section>
      )}
    </Layout>
  );
}
