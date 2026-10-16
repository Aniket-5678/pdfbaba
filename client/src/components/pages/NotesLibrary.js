import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, SearchBox, Status, panel, Reveal } from "./PageKit";
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
const NOTES_PER_PAGE = 9;
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
