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
      <section className="mx-auto max-w-7xl px-5 pt-9 sm:px-10">
        <div className="overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-orange-50/70 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-violet-700">{quiz ? "Practice with purpose" : "A path you can actually follow"}</span><h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">{quiz ? "Turn each question into useful feedback." : "Move from a first concept to confident practice."}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{quiz ? "A quiz is most useful when you slow down enough to understand why an answer fits. Use each attempt to decide what to study next." : "A roadmap gives topics an order. Your own examples and small projects turn that sequence into working knowledge."}</p></div>
            <div className="grid gap-3 sm:grid-cols-3">{(quiz ? [["01 · Before","Recall first","Try to answer from what you know before looking for clues in the options."],["02 · During","Read precisely","Notice words that set conditions, limits or exceptions in the question."],["03 · After","Review the idea","For every miss, identify the concept and practise it again in a fresh example."]] : [["01 · Orient","Find the starting point","Check the level and early steps; revisit prerequisites that are unfamiliar."],["02 · Practise","Make each step concrete","Turn a new idea into a short example and write down what surprised you."],["03 · Connect","Use the skill in context","Combine related steps in a small project and return to gaps you discover."]]).map(([label,title,text])=><article key={label} className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"><span className="text-[9px] font-extrabold uppercase tracking-[.12em] text-orange-600">{label}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{text}</p></article>)}</div>
          </div>
        </div>
      </section>
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
        <section className="mt-12 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_45px_-32px_rgba(30,41,59,.35)]">
          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="bg-slate-950 p-6 text-white sm:p-8"><span className="text-[10px] font-bold uppercase tracking-[.17em] text-orange-300">{quiz ? "Make the review count" : "Build a sustainable routine"}</span><h2 className="mt-3 text-2xl font-extrabold tracking-tight">{quiz ? "The useful part starts after the score." : "Progress comes from returning to the ideas."}</h2><p className="mt-4 text-sm leading-7 text-slate-300">{quiz ? "A correct answer can still be a guess. Explain the reasoning to yourself, and revisit any topic that felt uncertain." : "You do not need to finish every topic in one sitting. A steady loop of learning, trying and reviewing helps you remember more."}</p><p className="mt-4 border-t border-white/10 pt-4 text-xs leading-6 text-slate-400">{quiz ? "Keep a short list of concepts to revisit instead of repeating questions until the choices feel familiar." : "Use completed steps as a record of what you have covered, then let practice reveal where more time is useful."}</p></div>
            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">{quiz ? <><article className="rounded-2xl bg-violet-50/70 p-5"><h3 className="font-bold text-slate-900">When an answer is incorrect</h3><p className="mt-2 text-sm leading-6 text-slate-600">Name the misconception, find a clear explanation, then make a new example that would distinguish the right idea from the tempting wrong one.</p></article><article className="rounded-2xl bg-orange-50/70 p-5"><h3 className="font-bold text-slate-900">When an answer is correct</h3><p className="mt-2 text-sm leading-6 text-slate-600">Check whether you knew why it was correct. If you relied on elimination or a guess, mark that concept for another review.</p></article></> : <><article className="rounded-2xl bg-violet-50/70 p-5"><h3 className="font-bold text-slate-900">Revisit prerequisites</h3><p className="mt-2 text-sm leading-6 text-slate-600">If a step feels opaque, identify the smaller concept it assumes. Briefly review that foundation before pushing ahead.</p></article><article className="rounded-2xl bg-orange-50/70 p-5"><h3 className="font-bold text-slate-900">Keep evidence of learning</h3><p className="mt-2 text-sm leading-6 text-slate-600">Save a code example, diagram or explanation for each milestone. These concrete notes make later revision faster and more specific.</p></article></>}</div>
          </div>
        </section>
        <section className="mt-6 rounded-[28px] border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-orange-50 p-6 sm:p-8">
          {quiz ? <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">A quick answer debrief</span><h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">Sort questions into three useful groups.</h2><p className="mt-3 text-sm leading-7 text-slate-600">A score alone cannot show whether an answer was certain or lucky. A short debrief makes the next study session more focused.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["Knew it","Explain why the correct answer fits, in one sentence."],["Guessed it","Review the clue or concept that would have made the choice clear."],["Need to learn it","Find the underlying idea in your notes and make a fresh example."]].map(([title,text],i)=><article key={title} className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"><span className={"text-[9px] font-extrabold uppercase tracking-wider " + ["text-emerald-700","text-orange-700","text-violet-700"][i]}>{String(i+1).padStart(2,"0")} / REVIEW</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{text}</p></article>)}</div></div> : <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">A manageable weekly rhythm</span><h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">Turn roadmap steps into learning sessions.</h2><p className="mt-3 text-sm leading-7 text-slate-600">A roadmap is easier to use when a milestone has a small, visible outcome. Adjust the pace to your schedule and leave room to revisit difficult foundations.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["Session 1 · Learn","Read the first unfamiliar concept and write down the question it answers."],["Session 2 · Practise","Make a short example that uses the concept. Keep the input and expected result beside it."],["Session 3 · Connect","Combine it with an earlier skill, review what was confusing and choose your next milestone."]].map(([title,text],i)=><article key={title} className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"><span className="text-[9px] font-extrabold uppercase tracking-wider text-orange-600">WEEKLY CHECKPOINT 0{i+1}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{text}</p></article>)}</div></div>}
        </section>
      </section>
    </Layout>
  );
}
