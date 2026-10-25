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
        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_45px_-32px_rgba(30,41,59,.35)]">
          {quiz ? (
            <div className="grid min-w-0 gap-6 p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-8 lg:p-9">
              <div>
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-orange-700">A closer look at each question</span>
                <h2 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">Reason through the choices, not just the score.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">When a question feels difficult, turn it into a small reasoning exercise. Identify what it is asking, note any condition or exception, and eliminate choices only when you can explain why they do not fit.</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">For code questions, trace the values and execution order on paper before selecting an output. If two answers seem plausible, find the exact rule that distinguishes them and verify it with a fresh example.</p>
              </div>
              <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                {[["Read the task", "Underline the action or result the question asks for. Separate the facts given from assumptions you are adding."], ["Check every condition", "Look for words such as only, always, except or before. A small condition can change which choice is correct."], ["Explain the distractor", "For each tempting wrong answer, state the mistaken rule or missed condition that makes it look attractive."], ["Save the learning", "Record the concept behind uncertainty and write one new example that would test the same idea differently."]].map(([title, text], index) => (
                  <article key={title} className="min-w-0 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5">
                    <span className="text-[10px] font-extrabold tracking-wider text-violet-600">STEP 0{index + 1}</span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
                <div>
                  <span className="inline-flex rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-violet-700">Work with milestones</span>
                  <h2 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">Use a roadmap as a map, not a race.</h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">Roadmap topics often depend on earlier ideas. Move forward when you can use a step in a small example, but pause when a later topic exposes a gap. Returning to a prerequisite is a useful part of following the path.</p>
              </div>
              <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[["Find dependencies", "Before starting a step, note the concepts it assumes. Review only the prerequisite that is blocking you instead of restarting the whole path."], ["Define evidence", "Decide what you will be able to explain, build or solve when the step is familiar. A concrete result makes progress easier to judge."], ["Revisit with context", "When you reach a related topic, return to an earlier step and connect the ideas. Explain what the new topic adds and where the earlier one still applies."]].map(([title, text]) => (
                  <article key={title} className="min-w-0 rounded-2xl border border-slate-100 bg-gradient-to-br from-violet-50/70 to-white p-4 sm:p-5">
                    <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-xs leading-6 text-slate-600 sm:text-sm">A milestone is meaningful when you can use its idea and describe what you still need to practise. The pace is yours; the evidence of understanding is more useful than simply reaching the last step.</p>
            </div>
          )}
        </section>
        {quiz && (
          <section className="mt-6 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 p-5 text-white shadow-xl shadow-violet-950/10 sm:p-8 lg:p-10" aria-labelledby="quiz-code-tracing-guide">
            <div className="grid min-w-0 gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-10">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-orange-200">A worked code-tracing method</span>
                <h2 id="quiz-code-tracing-guide" className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Slow the code down before choosing an output.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">Output questions reward careful tracing more than quick pattern matching. Track what each operation receives and returns, and keep the original input separate from any new value created by a transformation.</p>
              </div>
              <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/50 p-4 sm:p-5">
                <p className="mb-3 text-xs font-semibold text-violet-200">Predict the result before reading the explanation</p>
                <pre className="max-w-full overflow-x-auto rounded-xl bg-black/30 p-3 text-[11px] leading-6 text-slate-100 sm:p-4 sm:text-xs"><code>{`const scores = [3, 6, 8, 10];
const selected = scores
  .filter((score) => score >= 6)
  .map((score) => score / 2);

console.log(selected); // ?`}</code></pre>
                <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">First, <code>filter</code> keeps <code>6</code>, <code>8</code> and <code>10</code>. Then <code>map</code> divides each kept value by two, so the output is <code>[3, 4, 5]</code>. Neither operation changes the original <code>scores</code> array.</p>
              </div>
            </div>
            <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-3">
              {[["1 · Trace", "Write down the array after each operation. Do not skip directly from the first line to the final output."], ["2 · Check the boundary", "Change the condition from >= 6 to > 6. The value 6 is now excluded, so the output becomes [4, 5]."], ["3 · Test an edge case", "Try an empty input. Filtering and mapping it still returns an empty array; this helps confirm the code handles that case." ]].map(([title, text]) => (
                <article key={title} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:p-5">
                  <h3 className="text-sm font-bold leading-snug text-white sm:text-base">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-white sm:text-base">Keep a small uncertainty log</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">For a question that took effort, note the concept, the point where your reasoning became uncertain, and the rule that resolved it. Add a different example and solve it later without looking at the explanation. This turns a missed or guessed answer into a specific practice target.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-white sm:text-base">Know when you are ready to move on</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">You do not need to answer every question immediately. A useful checkpoint is being able to explain the relevant rule, apply it to a new example, and recognize a case where it would not apply. If one part is missing, revisit that concept and try a fresh problem.</p>
              </article>
            </div>
          </section>
        )}
        {!quiz && (
          <section className="mt-6 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-5 shadow-sm sm:p-8 lg:p-10" aria-labelledby="roadmap-practice-flow">
            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-violet-700">A roadmap practice diagram</span>
                <h2 id="roadmap-practice-flow" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">Turn each roadmap step into something you can do.</h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">A roadmap gives you an order to explore. Practice makes each step usable. Move through the cycle below for one topic at a time, and use your own understanding—not speed—as the signal to continue.</p>
            </div>

            <div className="mt-7 flex min-w-0 flex-col items-stretch gap-3 xl:flex-row xl:items-stretch xl:gap-2" role="list" aria-label="Steps for practicing a roadmap">
              {[["01", "Choose a step", "Read the topic and description. Write one sentence about what you want to understand or be able to do."], ["02", "Check what it needs", "Identify prerequisite ideas. If a term or skill is unfamiliar, review that foundation before pushing ahead."], ["03", "Learn and trace", "Study a concise explanation or example. Predict what it does, then follow the steps and check your understanding."], ["04", "Practise independently", "Close the example and solve a small related task. Change an input or requirement and observe what needs to change."], ["05", "Review and decide", "Explain the idea, check an edge case, and write down any gap. Continue, practise more, or revisit a prerequisite based on what you found."]].map(([number, title, text], index) => (
                <React.Fragment key={number}>
                  <article role="listitem" className="min-w-0 flex-1 rounded-2xl border border-white bg-white/90 p-4 shadow-sm sm:p-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-xs font-extrabold text-violet-700">{number}</span>
                    <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900 sm:text-base">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  </article>
                  {index < 4 && <div aria-hidden="true" className="flex shrink-0 items-center justify-center text-violet-400"><ArrowRight size={18} className="rotate-90 xl:rotate-0" /></div>}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-violet-100 bg-white/80 p-4 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
                <div>
                  <h3 className="text-base font-extrabold text-slate-950 sm:text-lg">What should you do after a step?</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">Use the kind of difficulty you encountered to choose a useful next action.</p>
                </div>
                <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[["The idea is unclear", "Return to the prerequisite or find a simpler example."], ["I understand it, but cannot use it", "Try a smaller task without copying the worked example."], ["It works for one case", "Test a boundary or unusual input and inspect the result."], ["I can explain and apply it", "Record the evidence and move to the next related step."]].map(([signal, action], index) => (
                    <article key={signal} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
                      <span className={"text-[9px] font-extrabold uppercase tracking-wider " + ["text-orange-700", "text-violet-700", "text-blue-700", "text-emerald-700"][index]}>CHECK {index + 1}</span>
                      <h4 className="mt-2 text-xs font-bold leading-snug text-slate-900 sm:text-sm">{signal}</h4>
                      <p className="mt-1.5 text-xs leading-5 text-slate-600">{action}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-5 border-t border-violet-100 pt-4 text-xs leading-6 text-slate-500 sm:text-sm">A practical milestone record can be brief: the concept, a small example you completed, one edge case you checked, and the next question you have. It gives you a concrete starting point when you return to the roadmap.</p>
          </section>
        )}
      </section>
    </Layout>
  );
}
