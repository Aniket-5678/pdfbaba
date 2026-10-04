import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Route, Brain, ArrowRight, Layers, Clock3 } from "lucide-react";
import { PageHero, SearchBox, Status, Reveal, panel } from "./PageKit";
export default function LearningCatalog({ quiz = false }) {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [page, setPage] = useState(1);
  useEffect(() => {
    const c = new AbortController();
    axios
      .get(quiz ? "/api/v1/quizzes/all" : "/api/v1/roadmaps", {
        signal: c.signal,
      })
      .then((r) => setItems(Array.isArray(r.data) ? r.data : []))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            "Couldn't load " +
              (quiz ? "quizzes" : "roadmaps") +
              ". Please refresh to try again.",
          );
      })
      .finally(() => setLoading(false));
    return () => c.abort();
  }, [quiz]);
  const categories = [
    "All",
    ...new Set(items.map((x) => x.category).filter(Boolean)),
  ];
  const filtered = items.filter(
    (x) =>
      (category === "All" || x.category === category) &&
      [x.title, x.category, x.description, x.slug]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const count = Math.ceil(filtered.length / 9);
  const Icon = quiz ? Brain : Route;
  return (
    <Layout>
      <PageHero
        eyebrow={quiz ? "PRACTICE & GROW" : "YOUR LEARNING JOURNEY"}
        title={quiz ? "Small challenges." : "A clear path."}
        accent={quiz ? "Bigger skills." : "Real progress."}
        description={
          quiz
            ? "Put your knowledge to the test. Choose a topic, take a focused quiz, and learn from every answer."
            : "Turn curiosity into skills with structured roadmaps. Find your starting point and work through the next steps at your own pace."
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-semibold text-violet-700">
            {loading
              ? "Loading..."
              : items.length +
                " " +
                (quiz ? "practice quizzes" : "learning paths")}
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-xs text-slate-500">
            {quiz ? "Review your answers" : "Learn step by step"}
          </span>
        </div>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-10">
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row">
          <SearchBox
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={
              quiz ? "Search quizzes and topics" : "Search roadmaps and skills"
            }
            label={quiz ? "Search quizzes" : "Search roadmaps"}
          />
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={c === category}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold " +
                  (c === category
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-200 bg-white text-slate-500")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <Status loading={loading} error={error} empty={!filtered.length} />
        {!loading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice((page - 1) * 9, page * 9).map((x, i) => (
              <Reveal key={x._id}>
                <Link
                  to={(quiz ? "/play/" : "/roadmap/") + x._id}
                  className={
                    panel +
                    " group flex h-full flex-col transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
                  }
                >
                  <div className="mb-6 flex justify-between">
                    <span
                      className={
                        "rounded-2xl p-4 " +
                        (i % 3 === 0
                          ? "bg-orange-50 text-orange-500"
                          : i % 3 === 1
                            ? "bg-violet-50 text-violet-600"
                            : "bg-blue-50 text-blue-600")
                      }
                    >
                      <Icon size={28} />
                    </span>
                    <span className="h-fit rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase text-slate-500">
                      {x.category || "Learning"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-950">
                    {x.title ||
                      x.nodes?.[0]?.title ||
                      x.category ||
                      "Learning roadmap"}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {x.description ||
                      (quiz
                        ? "Practice your knowledge and review the correct answers."
                        : "A structured path to build your understanding, one skill at a time.")}
                  </p>
                  <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers size={14} />
                      {(quiz ? x.questions : x.nodes)?.length || 0}{" "}
                      {quiz ? "questions" : "steps"}
                    </span>
                    {quiz ? (
                      <span className="flex items-center gap-1">
                        <Clock3 size={14} />
                        30 minutes
                      </span>
                    ) : (
                      x.level && <span>{x.level}</span>
                    )}
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-violet-600">
                    {quiz ? "Start quiz" : "Explore roadmap"}
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
        {count > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                aria-current={page === i + 1 ? "page" : undefined}
                onClick={() => setPage(i + 1)}
                className={
                  "rounded-lg px-4 py-2 text-sm " +
                  (page === i + 1 ? "bg-violet-600 text-white" : "bg-slate-100")
                }
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </section>
    </Layout>
  );
}
