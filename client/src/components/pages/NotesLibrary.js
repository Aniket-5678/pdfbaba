import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, SearchBox, Status, panel, Reveal } from "./PageKit";
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
const NOTES_PER_PAGE = 9;
const guidePanel = panel + " min-w-0 !p-4 sm:!p-6";
export default function NotesLibrary({ categoryOverride } = {}) {
  const params = useParams();
  const category = categoryOverride ?? params.category;
  const [notes, setNotes] = useState([]),
    [cats, setCats] = useState([]),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(1),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const c = new AbortController();
    setLoading(true);
    setError("");
    setNotes([]);
    setQuery("");
    setPage(1);
    Promise.all([
      axios.get("/api/notes", {
        params: category ? { category } : {},
        signal: c.signal,
      }),
      axios.get("/api/v1/category/get-category", { signal: c.signal }),
    ])
      .then(([n, r]) => {
        if (c.signal.aborted) return;
        setNotes(n.data.notes || []);
        setCats([
          ...new Map(
            [...(r.data.noteCategories || []), ...(r.data.category || [])].map(
              (c) => [c.slug, c],
            ),
          ).values(),
        ]);
      })
      .catch((e) => {
        if (!c.signal.aborted)
          setError(
            "Couldn't load the learning library. Please refresh to try again.",
          );
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [category]);
  const filtered = notes.filter((n) =>
    (n.title + " " + n.category + " " + (n.tags || []).join(" ")).toLowerCase().includes(query.toLowerCase()),
  );
  const pageCount = Math.ceil(filtered.length / NOTES_PER_PAGE);
  const visibleNotes = filtered.slice((page - 1) * NOTES_PER_PAGE, page * NOTES_PER_PAGE);
  return (
    <Layout>
      <Seo title={category ? category.replace(/-/g, " ") + " Study Notes" : "Study Notes"} />
      <PageHero
        eyebrow="READ. UNDERSTAND. BUILD."
        title={category ? category.replace(/-/g, " ") : "A library for"}
        accent={category ? "study notes." : "curious minds."}
        description="Explore clear explanations, practical examples and study notes. Find a topic and make it your own."
      >
        {category && (
          <Link to="/categories" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-violet-600">
            <ChevronLeft size={16} /> All learning categories
          </Link>
        )}
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            className={
              "rounded-full px-4 py-2 text-xs font-bold " +
              (!category ? "bg-violet-600 text-white" : "bg-slate-100")
            }
            to="/notes"
          >
            All notes
          </Link>
          {cats.map((c) => (
            <Link
              key={c.slug}
              className={
                "rounded-full px-4 py-2 text-xs font-bold " +
                (category === c.slug
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600")
              }
              to={"/notes-category/" + c.slug}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <SearchBox
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search study notes"
          label="Search study notes"
        />
        <section className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_45px_-32px_rgba(30,41,59,.35)]">
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-6 text-white sm:p-8"><div aria-hidden="true" className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"/><div className="relative"><span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em]">{category ? category.replace(/-/g, " ") : "The Codebricket notes desk"}</span><h2 className="mt-4 text-2xl font-extrabold tracking-tight">Study one idea at a time.</h2><p className="mt-3 text-sm leading-7 text-violet-100">Browse by category when you have a subject in mind, or search for a specific term. Each note is a starting point for your own examples and questions.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold">{loading ? "Loading notes" : `${filtered.length} ${filtered.length === 1 ? "note" : "notes"}${query ? " found" : " available"}`}</span>{pageCount > 1 && <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs">Page {page} of {pageCount}</span>}</div></div></div>
            <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">{[["Find the concept","Search by a note title or category. Narrow the list first when you are revising a particular subject."],["Read for the example","Look for the point where an explanation becomes concrete. Predict what will happen before reading the next step."],["Write a recall prompt","Turn a heading or tag into a question. Answer it later without reopening the explanation." ]].map(([title,text], index)=><article key={title} className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4"><span className="text-[10px] font-extrabold text-orange-500">0{index+1}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{text}</p></article>)}</div>
          </div>
        </section>
        <div className="mt-8">
          <Status loading={loading} error={error} empty={!filtered.length} />
          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleNotes.map((n) => (
                <Reveal key={n._id}>
                  <Link
                    to={"/note/" + n.slug}
                    className={
                      panel +
                      " group flex h-full flex-col transition hover:-translate-y-1 hover:border-violet-300"
                    }
                  >
                    <BookOpen className="mb-6 text-orange-500" size={28} />
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      {n.category}
                    </p>
                    <h2 className="text-xl font-bold">{n.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {n.excerpt ||
                        "Explore this note and build your understanding."}
                    </p>
                    <span className="mt-6 flex items-center justify-between text-sm font-bold text-violet-600">
                      Read note
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
        {!loading && !error && pageCount > 1 && (
          <nav aria-label="Study notes pages" className="mt-9 flex flex-wrap items-center justify-center gap-2">
            <button type="button" disabled={page === 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Previous notes page" className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-violet-300 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={16}/> Previous</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button type="button" key={pageNumber} aria-label={`Notes page ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined} onClick={() => { setPage(pageNumber); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={"h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition " + (page === pageNumber ? "bg-violet-600 text-white shadow-md shadow-violet-200" : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300")}>{pageNumber}</button>)}
            <button type="button" disabled={page === pageCount} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Next notes page" className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-violet-300 disabled:cursor-not-allowed disabled:opacity-40">Next <ChevronRight size={16}/></button>
          </nav>
        )}
        {!loading && !error && <section className="mt-14 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-orange-50 p-6 sm:p-9"><div className="grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">A more useful study session</span><h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">Read with a question in mind.</h2><p className="mt-3 text-sm leading-7 text-slate-600">Choose one idea you want to understand, then look for its definition, example and limits as you read.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["01","Pause and recall","After a section, explain the point without looking back."] , ["02","Try a small example","Change an input or condition and predict what should happen."] , ["03","Return with a purpose","Use tags and search to revisit a concept when it comes up in your work."]].map(([number,title,text])=><article key={number} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm"><span className="text-xs font-extrabold text-orange-500">{number}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{text}</p></article>)}</div></div></section>}
        {!loading && !error && (
          <section className="mt-14 overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-orange-50/60 p-4 shadow-sm sm:p-6 lg:p-8" aria-labelledby="programming-notes-guide">
            <div className="mb-6 max-w-3xl sm:mb-8">
              <p className="inline-flex rounded-full border border-violet-100 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700 sm:text-xs">A field guide for learners</p>
              <h2 id="programming-notes-guide" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">Turn programming notes into working knowledge</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Reading is a useful first pass. Durable understanding comes from explaining an idea, testing it in code, noticing where your understanding breaks, and trying again. Use these methods with any topic in the library.</p>
            </div>
            <div className="grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-2">
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">1. How to study programming notes effectively</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Read a concept slowly, then close the note and explain it in your own words. Ask why the idea exists and what problem it helps solve. A definition becomes more useful when you can connect it to a situation where you would choose that technique.</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">Work through examples line by line: identify each input, follow how values change, and predict the result before reading it. Run the example in a safe local environment, change an input, and observe what changes. Write down the part that remains confusing, return to it later, and finish by building a small example of your own. Understanding, implementation and problem-solving teach more than repeatedly rereading the same paragraph.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">2. How to approach a difficult concept</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
                  <li>Check the prerequisites and make sure basic terms are clear.</li>
                  <li>Describe the concept’s purpose before studying its advanced details.</li>
                  <li>Split it into smaller parts and learn one relationship at a time.</li>
                  <li>Start with a tiny example, then compare it with a realistic use.</li>
                  <li>Compare nearby ideas by asking what they share and where their behavior differs.</li>
                  <li>Trace execution step by step, explain the idea simply without looking, then implement it independently.</li>
                </ol>
                <p className="mt-3 text-sm leading-7 text-slate-600">For example, when learning a JavaScript promise, first understand that it represents a result that may arrive later. Follow a resolved value through <code>.then()</code>, then compare that with <code>await</code> inside an <code>async</code> function. The goal is to understand when control continues and where a failure is handled, not just memorize syntax.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">3. How to read and practise code examples</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Before running code, state the expected input and output. Trace each variable and function call, predict the result, and only then execute it. Compare your prediction with the actual output; the difference often shows which assumption needs attention.</p>
                <pre className="mt-4 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-6 text-slate-100 sm:p-4 sm:text-xs"><code>{`const prices = [4, 7, 9];
const withTax = prices.map((price) => price * 1.1);
console.log(withTax); // [4.4, 7.7, 9.9]`}</code></pre>
                <p className="mt-3 text-sm leading-7 text-slate-600">Try predicting the result first. Then change one price, replace multiplication with addition, or test an empty array. Explain why the output changed. Recreate the example from memory and adapt the same idea to a small independent task instead of copying it unchanged.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">4. A repeatable debugging method</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Debugging is evidence gathering. Change one thing at a time so you can tell which change affected the behavior.</p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-slate-600">
                  <li>Read the complete error message; note the file, line and operation.</li>
                  <li>Reproduce the issue and write down expected versus actual behavior.</li>
                  <li>Inspect input values, types and assumptions near the failing code.</li>
                  <li>Use targeted logs, browser DevTools or breakpoints to inspect values and execution order.</li>
                  <li>Follow the stack trace and reduce the issue to the smallest reproducible example.</li>
                  <li>Find the root cause, make one focused change, then retest the feature and nearby cases.</li>
                  <li>Check for regressions and record what caused the problem and how you confirmed the fix.</li>
                </ol>
                <p className="mt-3 text-sm leading-7 text-slate-600">A log is most useful when it answers a specific question, such as “Is this value already empty before the function runs?” Remove temporary logs when they are no longer needed, and avoid logging secrets or private user data.</p>
              </article>
              <article className={guidePanel + " lg:col-span-2"}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">5. Common JavaScript errors and how to reason about them</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">These are general teaching examples, not reports about this website. First identify the failing operation; then check the value and type the code actually received.</p>
                <div className="mt-5 grid min-w-0 gap-5 md:grid-cols-2">
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">ReferenceError: a name is not defined</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">This happens when code refers to a variable that is out of scope or was never declared. Check spelling and where the value is created.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`// Incorrect: total was never declared
console.log(totl);

// Correct
const total = 12;
console.log(total);`}</code></pre>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">TypeError: an operation does not fit the value</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Calling a method on <code>null</code> or on the wrong type can fail. Validate the value before using a type-specific method.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`const name = null;
// name.trim() throws
const cleanName = (name ?? "").trim();`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">The fallback handles nullish values; if input may be another type, validate or convert it deliberately too.</p>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">SyntaxError: the source cannot be parsed</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">A missing delimiter, unmatched bracket or invalid expression prevents JavaScript from starting that file. Read the reported location, then inspect the nearby opening and closing syntax.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`// Incorrect: missing closing parenthesis
console.log("Ready";

// Correct
console.log("Ready");`}</code></pre>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">Unexpected undefined or null</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600"><code>undefined</code> often means a value was not supplied or returned; <code>null</code> is commonly used to represent an intentionally empty value. Check where the value comes from and handle absence at that boundary.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`const label = record?.label ?? "Untitled";`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Optional chaining protects a missing object, and nullish coalescing supplies a fallback only for null or undefined.</p>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">Equality: <code>==</code> versus <code>===</code></h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600"><code>==</code> converts some values before comparison, which can hide type differences. Prefer <code>===</code> unless coercion is intentional and clearly explained.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`"5" == 5;  // true after coercion
"5" === 5; // false: different types`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">When comparing form or URL input with a number, parse and validate it first rather than relying on implicit conversion.</p>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">Array and object access mistakes</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Arrays are zero-indexed, so the first item is at index <code>0</code>; an out-of-range lookup returns undefined. A misspelled object property does the same. Check length, keys and the actual data shape.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`const items = [{ title: "Intro" }];
const first = items[0];
const item = items[0];
const title = item?.title;
if (first && typeof title === "string") {
  console.log(title);
}`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Use the correct index and property name, and validate data that comes from outside the current function.</p>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">Promise and async/await failures</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">A rejected promise can become an unhandled failure if no error path observes it. Put awaited work inside a <code>try/catch</code> when the function needs to respond to failure.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`async function loadItems() {
  try {
    const response = await fetch("/items");
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error("Could not load items", error);
    return [];
  }
}`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Check network status and response shape as well as JavaScript exceptions. Choose a fallback that makes sense for the caller.</p>
                  </div>
                  <div>
                    <h4 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">React events and state updates</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">React state is a snapshot for the current render. If the next value depends on the previous one, use the functional setter; pass an event handler rather than calling it during render.</p>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:text-xs"><code>{`const [count, setCount] = useState(0);
<button onClick={() => setCount((n) => n + 1)}>
  Add one
</button>`}</code></pre>
                    <p className="mt-2 text-xs leading-5 text-slate-500">This is a general React example. Keep state updates tied to user events and derive values from current state rather than mutating it directly.</p>
                  </div>
                </div>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">6. Investigating React and Node.js problems</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600"><strong>React adds rendering rules to JavaScript.</strong> For a missing list-key warning, give each item a stable identifier rather than its changing position. For an effect that uses stale values or repeats unexpectedly, compare every value read inside it with its dependency list; move event-specific work into the event handler. For failed API requests, inspect the network status, response body and loading/error branches. If a component shows the wrong information, trace the values passed through props and avoid mutating them. For conditional rendering, check whether the condition distinguishes an empty value from a valid one. For a screen that does not update, check whether state was mutated in place instead of replaced through its setter.</p>
                <p className="mt-3 text-sm leading-7 text-slate-600"><strong>Node.js adds a server runtime and its module/configuration environment.</strong> If an import fails, compare the imported name with the file’s actual named or default export and check whether the project uses ES modules or CommonJS. If a package cannot be found, check the project manifest and install dependencies using its documented workflow. For missing environment values, verify the expected variable name and runtime configuration without printing secrets. For API or database failures, validate inputs, inspect the underlying error, handle rejected async work, and check connection settings and service availability. Do not treat these generic checks as diagnosis of a particular application.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">7. A realistic daily learning routine</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">A useful session can be short and repeatable. Begin by recalling one previously learned idea, then choose one manageable new concept. Write a small example without copying, solve one related problem, and spend time understanding a real error if one appears. Record the cause and the evidence that confirmed your fix. End by improving a small part of a project or summarizing what you learned and what is still unclear. Consistency and feedback matter more than trying to cover too much in one sitting.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">8. Make technical notes useful later</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Write a compact record in your own words. Include the concept and its purpose, the problem it solves, essential syntax, a minimal example and its expected output. Add common mistakes, edge cases, related ideas and a practical situation where you might use it. Finish with questions you still need to investigate. A short explanation you understand is easier to use than a copied tutorial you have not processed.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">9. Revision and long-term retention</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Use active recall: try to explain the idea before opening the note. Revisit it after a gap, then again later, rather than rereading it several times in one sitting. Reimplement a small example from memory, answer a practice question, compare a similar concept, and revisit bugs you have already solved.</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">One flexible weekly rhythm is to learn a new topic early in the week, recall it the next day, apply it in an exercise later in the week, and use a final session to review mistakes and questions. Adjust the spacing to your schedule and how difficult the material feels; the routine is a prompt for practice, not a guarantee of mastery.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">10. Use notes to prepare for technical interviews</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Practise explaining what a concept means, why it is useful and what trade-offs it brings. Write a small example without assistance, talk through your reasoning, and test edge cases. Use debugging exercises to practise narrowing down a failure. Connect theory to projects you have actually built and be specific about your own decisions. Reading notes alone is not interview practice: combine review with coding and clear explanations of your reasoning.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">11. A problem-solving checklist</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>What should happen, and what happens instead?</li>
                  <li>Can I reproduce the issue consistently?</li>
                  <li>What do the error and stack trace tell me?</li>
                  <li>Which input, type or assumption might be wrong?</li>
                  <li>Can I create a smaller example that still fails?</li>
                  <li>Have I identified the root cause, not just hidden the symptom?</li>
                  <li>Does the fix handle relevant edge cases without breaking nearby behavior?</li>
                  <li>What did I learn, and how will I recognize this cause again?</li>
                </ul>
                <p className="mt-3 text-sm leading-7 text-slate-600">Record the root cause and the final working approach while the details are fresh. That turns a frustrating bug into a reference you can search and helps you notice the same pattern sooner next time.</p>
              </article>
              <article className={guidePanel + " lg:col-span-2"}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">12. Continue from notes to practical skill</h3>
                <ol className="mt-3 grid gap-2 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                  <li><strong>1.</strong> Explain the concept and its purpose in your own words.</li>
                  <li><strong>2.</strong> Trace a minimal example and predict its result.</li>
                  <li><strong>3.</strong> Change the example and explain the difference.</li>
                  <li><strong>4.</strong> Solve a related exercise without copying a solution.</li>
                  <li><strong>5.</strong> Use the idea in a small project or feature.</li>
                  <li><strong>6.</strong> Test normal, edge and invalid inputs; debug what fails.</li>
                  <li><strong>7.</strong> Write down the decision, result and remaining questions.</li>
                  <li><strong>8.</strong> Revisit the topic later and try to reproduce the idea from memory.</li>
                </ol>
                <p className="mt-3 text-sm leading-7 text-slate-600">Each step gives you a different kind of evidence: explanation checks understanding, implementation checks whether you can use the idea, and testing shows where it needs more work. Move through the sequence at a pace that leaves room to investigate mistakes.</p>
              </article>
            </div>
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">13. Trace a web request from input to screen</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">A useful way to understand a web application is to follow one piece of data across its boundaries. The exact architecture varies: a small site may have no server, while another project may call an API or store records in a database. For an application that does use those parts, sketch the journey before reading every file:</p>
                <ol className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[["1 · Input", "A person enters a value or chooses an action in the interface."], ["2 · Client", "The page checks what it can, then sends a request with the required data."], ["3 · Server", "A route receives the request; application code validates it and performs the required work."], ["4 · Result", "The server returns a success or error response; the interface updates to explain the outcome."]].map(([title, text]) => (
                    <li key={title} className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:p-4">
                      <h4 className="break-words text-sm font-bold leading-snug text-slate-900">{title}</h4>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm leading-7 text-slate-600">At each boundary ask: what shape is the data, what can fail, and how is that failure shown to the user? In browser DevTools, compare the request payload and response with the visible result. This makes it easier to locate whether a problem begins in the input, request, server response or rendering step. Treat this as a general tracing model; confirm which layers a particular project actually contains.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">14. Practice lab: filter and clean a list</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Suppose a page receives a list of people and needs names for active entries. Before running the example, predict which records should remain. Then trace how <code>filter</code> selects records and <code>map</code> transforms them.</p>
                <pre className="mt-4 max-w-full overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-6 text-slate-100 sm:p-4 sm:text-xs"><code>{`function activeNames(people) {
  return people
    .filter((person) => person && person.active === true)
    .map((person) => person.name)
    .filter((name) => typeof name === "string" && name.trim() !== "")
    .map((name) => name.trim());
}

const people = [
  { name: " Asha ", active: true },
  { name: "Ravi", active: false },
  { name: "", active: true },
  null,
];

console.log(activeNames(people)); // ["Asha"]`}</code></pre>
                <p className="mt-3 text-sm leading-7 text-slate-600">The first filter rejects missing records and inactive people. The next steps select the name, reject blank or non-string values, and trim surrounding spaces. Try adding a name with different capitalization, an object without a name, and an empty list. Decide whether this function should also handle a non-array input; if so, define that behavior explicitly and test it. This small exercise practises data shape checks, boolean conditions, transformations and edge cases together.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">15. Turn one concept into a small project</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">A focused project gives a concept a reason to exist. Keep the first version small enough that you can explain every part of it:</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
                  <li><strong>Describe the user and task.</strong> Write one sentence about who the page helps and what they need to do.</li>
                  <li><strong>Define a visible result.</strong> Choose the smallest screen or interaction that demonstrates the idea.</li>
                  <li><strong>List the data and states.</strong> Note what the feature receives and what should appear for empty, successful and failed cases.</li>
                  <li><strong>Build one complete path.</strong> Connect the interface to the behavior it needs; add a server or persistence only if the project requires it.</li>
                  <li><strong>Test and refine.</strong> Try normal and unusual inputs, inspect the result at narrow and wide sizes, and fix confusing feedback.</li>
                  <li><strong>Explain your decisions.</strong> Record what you kept simple, what trade-offs you made and what you would improve next.</li>
                </ol>
                <p className="mt-3 text-sm leading-7 text-slate-600">For example, practising array filtering could become a small directory with a search field and an active-only view. Start with local sample data; add other layers only when they serve a clear learning goal. A smaller project that is understandable and tested is more useful for learning than a larger one assembled from code you cannot explain.</p>
              </article>
              <article className={guidePanel}>
                <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">16. Review an implementation before calling it finished</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">After the main path works, review the code from the perspective of both another developer and the person using it. This is different from checking only whether one example passes.</p>
                <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
                  {[["Readability", "Can a reader understand names, function boundaries and the reason for each step without guessing?"], ["Data and edge cases", "What happens with missing, empty, malformed or unexpectedly large input? Are assumptions checked where data enters?"], ["User feedback", "Are loading, success and failure states distinguishable? Can a person recover when an action fails?"], ["Accessibility", "Can the core interaction be reached and understood with a keyboard? Do controls have clear labels and visible focus?"], ["Verification", "Did you retest the changed path and nearby behavior after the last edit? Are temporary logs and test data removed?"], ["Next step", "Which limitation is acceptable for this version, and what evidence would tell you it is time to improve it?"]].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-slate-100 p-4">
                      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">Keep a short review note with the change: what you expected, what you checked, what you found and what remains. That record makes future maintenance easier because the reasoning is preserved alongside the code.</p>
              </article>
            </div>
          </section>
        )}
      </section>
    </Layout>
  );
}
export function NoteDetail() {
  const { slug } = useParams(),
    [note, setNote] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    const c = new AbortController();
    setNote(null);
    setError("");
    axios
      .get("/api/notes/" + encodeURIComponent(slug), { signal: c.signal })
      .then((r) => setNote(r.data.note))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            e.response?.status === 404
              ? "This note could not be found."
              : "Couldn't load this note.",
          );
      });
    return () => c.abort();
  }, [slug]);
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-10">
        <Link
          to="/notes"
          className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-violet-600"
        >
          <ChevronLeft size={17} />
          Back to notes
        </Link>
        <Status loading={!note && !error} error={error} />
        {note && (
          <>
            <Seo title={note.title} description={note.excerpt} />
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-600">
              {note.category}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {note.title}
            </h1>
            <p className="mt-5 text-xs text-slate-400">
              Updated{" "}
              {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
            </p>
            <article
              className={
                panel +
                " mt-8 break-words text-sm leading-8 text-slate-700 [&_h1]:my-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:my-6 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:my-4 [&_h3]:font-bold [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-violet-600 [&_a]:underline [&_pre]:my-5 [&_pre]:overflow-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-5 [&_pre]:text-slate-100 [&_img]:max-w-full"
              }
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {note.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-violet-50 px-3 py-1 text-xs text-violet-600"
                >
                  {t}
                </span>
              ))}
            </div>
            <section className="mt-8 overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50/70 to-orange-50/70 p-6 sm:p-8">
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">Make this topic stick</span>
              <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">A short practice loop for {note.category || "this topic"}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">After reading “{note.title},” close the page and write down the central idea in your own words. Reopen the note to check what you missed, then create one small example or question that would help you recognize the idea in a different situation.</p>
              {note.tags?.length > 0 && <div className="mt-5 rounded-2xl border border-white bg-white/80 p-4"><h3 className="text-xs font-bold text-slate-900">Use the keywords as recall prompts</h3><ul className="mt-3 grid gap-2 sm:grid-cols-2">{note.tags.slice(0,6).map((tag)=><li key={tag} className="flex items-start gap-2 text-xs leading-5 text-slate-600"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"/>Explain “{tag}” without looking at the note, then connect it to one example.</li>)}</ul></div>}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
