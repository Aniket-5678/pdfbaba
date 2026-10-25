import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Laptop,
  ArrowRight,
} from "lucide-react";
import NotesLibrary from "./NotesLibrary";
import { Status } from "./PageKit";
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    axios.get("/api/v1/category/get-category", { signal: controller.signal })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        const items = [...new Map(
          [...(data.noteCategories || []), ...(data.category || [])]
            .filter((item) => item.slug && item.name)
            .map((item) => [item.slug, item]),
        ).values()];
        setCategories(items.map((item, index) => {
          const style = learningTopics.find((entry) =>
            entry.slug === item.slug ||
            (entry.slug === "exam-prep" && item.slug === "exam-preparation"),
          );
          return {
            slug: item.slug,
            title: item.name,
            description: style?.description || "Explore study notes and practical explanations for this topic.",
            icon: style?.icon || BookOpen,
            color: style?.color || Object.keys(palettes)[index % 4],
          };
        }));
      })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError("Couldn't load categories. Please refresh to try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);
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
        <div className="mt-10">
          <Status loading={loading} error={error} empty={!categories.length} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {!loading && !error && categories.map(
            ({ slug, title, description, icon: Icon, color }, i) => (
              <motion.div
                key={slug}
                initial={reduced ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  to={"/notes-category/" + encodeURIComponent(slug)}
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
                      Explore study notes
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
        <section className="mt-14 overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-white via-blue-50/65 to-violet-50/80 p-6 sm:p-9 lg:p-10" aria-labelledby="learning-category-guide">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
            <div><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-blue-700"><BookOpen size={13}/> Make a topic actionable</span><h2 id="learning-category-guide" className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">A category is a doorway.<br/><span className="text-violet-600">Your practice makes it stick.</span></h2><p className="mt-4 text-sm leading-7 text-slate-600">Pick one subject you want to understand, then use its notes to build a small learning loop. A clear question gives each reading session a purpose.</p><div className="mt-6 flex flex-wrap gap-2"><Link to="/exam-roadmap" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700">Find a roadmap <ArrowRight size={14}/></Link><Link to="/practice-quiz" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-violet-300">Try a quiz <ArrowRight size={14}/></Link></div></div>
            <div className="grid gap-3 sm:grid-cols-3">{[[Code2,"Connect the idea","For technology topics, follow a concept across the browser, an API and the interface. Sketch how information moves before you try to build it."],[Laptop,"Investigate the error","For debugging, reproduce the issue with the smallest example you can make. Read the first useful error message, check the input and change one cause at a time."],[GraduationCap,"Prepare with recall","For study and exam topics, split a broad subject into smaller questions. Practise recalling the answer before checking notes, then revisit the parts that remain unclear."]].map(([Icon,title,text])=><article key={title} className="rounded-2xl border border-white bg-white/85 p-5 shadow-sm"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={19}/></span><h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-600">{text}</p></article>)}</div>
          </div>
          <p className="mt-7 border-t border-blue-100 pt-5 text-xs leading-6 text-slate-500">A helpful checkpoint is being able to explain the concept, show one example, and describe a case where it would not apply. If one of those is hard, return to the note or choose a smaller step.</p>
        </section>
        {standalone && (
          <section className="relative mt-8 overflow-hidden rounded-[30px] border border-violet-100 bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 p-5 text-white shadow-xl shadow-violet-950/10 sm:mt-10 sm:p-8 lg:p-10" aria-labelledby="learning-path-guide">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-200 sm:text-xs">A practical learning system</span>
                <h2 id="learning-path-guide" className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">Turn a category into a learning path you can follow</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">A topic becomes easier to study when you know what question you are trying to answer, what to practise, and how you will check your understanding. Use this simple structure to make the notes and learning materials in a category more useful.</p>
              </div>

              <div className="mt-7 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["01", "Choose a question", "Replace a broad goal like “learn web development” with a question you can investigate, such as how a browser turns a request into a page."],
                  ["02", "Find the prerequisites", "List the terms or smaller ideas the question depends on. Review those first if the explanation relies on unfamiliar vocabulary."],
                  ["03", "Make the idea observable", "Predict what a small example will do, run it, and change one input or condition. Compare the result with your prediction."],
                  ["04", "Apply and explain", "Use the idea in a small exercise, then describe your approach and its limits without copying the note."],
                ].map(([number, title, text]) => (
                  <article key={number} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm sm:p-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-xs font-extrabold text-orange-300">{number}</span>
                    <h3 className="mt-4 text-sm font-bold leading-snug text-white sm:text-base">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{text}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
                <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:p-6">
                  <h3 className="text-base font-bold text-white sm:text-lg">When a topic feels confusing, use the signal</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      ["The words feel unfamiliar", "Pause and define the terms. Identify which earlier concept each one assumes before continuing."],
                      ["You understand the words but cannot predict the output", "Trace the example one statement at a time. Write down how each important value changes."],
                      ["The example makes sense, but you cannot build it yourself", "Hide the solution and recreate a smaller version. Use the error message to find the step you do not yet understand."],
                    ].map(([signal, response]) => (
                      <div key={signal} className="rounded-xl border border-white/10 bg-slate-950/20 p-3 sm:p-4">
                        <h4 className="text-sm font-semibold leading-snug text-violet-100">{signal}</h4>
                        <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">{response}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:p-6">
                  <h3 className="text-base font-bold text-white sm:text-lg">A flexible review cycle</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">Space your practice so you have to retrieve the idea again, rather than only recognizing it from a recent reread.</p>
                  <ol className="mt-4 space-y-3">
                    {[
                      ["First session", "Read for one clear question and write a short explanation from memory."],
                      ["Next review", "Recreate the smallest example without looking, then check what you missed."],
                      ["Later practice", "Solve a related problem or change the example to cover a different case."],
                      ["End-of-week check", "Summarize what you can now explain, what still causes errors, and what to revisit."],
                    ].map(([time, activity]) => (
                      <li key={time} className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0 sm:grid-cols-[120px_minmax(0,1fr)]">
                        <span className="text-xs font-bold text-orange-300">{time}</span>
                        <p className="text-xs leading-5 text-slate-300 sm:text-sm">{activity}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-xs leading-6 text-slate-400">Treat this as a starting rhythm, not a deadline. Give difficult ideas more time and revisit them when you meet them in practice.</p>
                </article>
              </div>

              <p className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-400/10 p-4 text-xs leading-6 text-violet-100 sm:p-5 sm:text-sm">A useful learning record is small: the question you started with, the example you tried, what surprised you, and the next question you want to answer. That gives your next study session a clear place to begin.</p>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
export function LearningPage() {
  const { topic } = useParams();
  return <NotesLibrary categoryOverride={topic === "exam-prep" ? "exam-preparation" : topic} />;
}
