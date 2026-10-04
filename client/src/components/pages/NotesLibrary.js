import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, SearchBox, Status, panel, Reveal } from "./PageKit";
import { BookOpen, ArrowRight, ChevronLeft } from "lucide-react";
export default function NotesLibrary() {
  const { category } = useParams(),
    [notes, setNotes] = useState([]),
    [cats, setCats] = useState([]),
    [query, setQuery] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const c = new AbortController();
    setLoading(true);
    setError("");
    Promise.all([
      axios.get("/api/notes", {
        params: category ? { category } : {},
        signal: c.signal,
      }),
      axios.get("/api/v1/category/get-category", { signal: c.signal }),
    ])
      .then(([n, r]) => {
        setNotes(n.data.notes || []);
        setCats(r.data.category || []);
      })
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            "Couldn't load the learning library. Please refresh to try again.",
          );
      })
      .finally(() => setLoading(false));
    return () => c.abort();
  }, [category]);
  const filtered = notes.filter((n) =>
    (n.title + " " + n.category).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Layout>
      <PageHero
        eyebrow="READ. UNDERSTAND. BUILD."
        title={category ? category.replace(/-/g, " ") : "A library for"}
        accent={category ? "study notes." : "curious minds."}
        description="Explore clear explanations, practical examples and study notes. Find a topic and make it your own."
      />
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
              key={c._id}
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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search study notes"
          label="Search study notes"
        />
        <div className="mt-8">
          <Status loading={loading} error={error} empty={!filtered.length} />
          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((n) => (
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
          </>
        )}
      </div>
    </Layout>
  );
}
