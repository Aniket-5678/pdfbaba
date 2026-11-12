import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CirclePlay,
  Search,
  X,
  Youtube,
} from "lucide-react";
import Layout from "../Layout/Layout";

const PAGE_SIZE = 20;

export default function LearningHub() {
  const [tutorials, setTutorials] = useState([]);
  const [language, setLanguage] = useState("All languages");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    axios
      .get("/api/v1/learning-tutorials")
      .then(({ data }) => {
        if (active) setTutorials(data);
      })
      .catch(() => {
        if (active) setError("Tutorial guides could not be loaded. Please try again in a moment.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const languages = useMemo(
    () => ["All languages", ...new Set(tutorials.map((item) => item.language))],
    [tutorials],
  );
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tutorials.filter((item) => {
      const matchesLanguage = language === "All languages" || item.language === language;
      const searchable = `${item.language} ${item.title} ${item.description} ${item.channelName}`.toLowerCase();
      return matchesLanguage && (!term || searchable.includes(term));
    });
  }, [tutorials, language, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const firstVisiblePage = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const visiblePageNumbers = Array.from(
    { length: Math.min(pageCount, 5) },
    (_, index) => firstVisiblePage + index,
  );
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rangeStart = filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  return (
    <Layout>
      <div className="min-h-[75vh] bg-[#f8f9fc]">
        <section className="relative isolate overflow-hidden border-b border-violet-100 bg-white">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-violet-100/70 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-20 -z-10 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-12 lg:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-700 sm:text-xs"><BookOpen size={15} /> Your free programming learning hub</span>
              <h1 className="mt-5 max-w-3xl text-[2.15rem] font-extrabold leading-[1.08] tracking-[-.045em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">Find a course worth watching. <span className="text-violet-600">Start learning today.</span></h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">Skip the endless YouTube search. Choose a programming language, explore curated learning guides and channels, then open the lessons directly on YouTube—free and at your own pace.</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-semibold text-slate-600 sm:text-sm"><span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-600" /> Browse by language</span><span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-600" /> Curated channels</span><span className="inline-flex items-center gap-2"><CirclePlay size={15} className="text-red-600" /> Go straight to YouTube</span></div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_-35px_rgba(57,37,100,.3)] backdrop-blur-sm sm:flex sm:items-center sm:gap-4 sm:p-5 lg:block lg:rounded-3xl lg:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600"><Youtube size={23} /></div>
              <div className="mt-3 sm:mt-0 lg:mt-5"><p className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{tutorials.length}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">curated learning guides</p></div>
              <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500 sm:ml-auto sm:mt-0 sm:border-0 sm:pt-0 lg:mt-4 lg:border-t lg:pt-4">Pick a language below and find a clear place to start.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-9 sm:px-10 sm:py-12">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-700">Explore the collection</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Programming tutorials</h2><p className="mt-2 text-sm text-slate-500">Find a language, topic, or channel to begin.</p></div>
            <p aria-live="polite" className="text-xs font-medium text-slate-500">{filtered.length} {filtered.length === 1 ? "guide" : "guides"} {query || language !== "All languages" ? "found" : "to explore"}</p>
          </div>

          {!loading && !error && languages.length > 1 && <div className="mb-4 flex min-w-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]" aria-label="Quick language filters">
            {languages.slice(0, 7).map((item) => <button key={item} type="button" onClick={() => updateFilter(setLanguage, item)} aria-pressed={language === item} className={"shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 " + (language === item ? "border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-200" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700")}>{item === "All languages" ? "All languages" : item}</button>)}
            {languages.length > 7 && <span className="flex shrink-0 items-center px-2 text-[11px] font-medium text-slate-400">More languages in filters</span>}
          </div>}

          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_240px]">
            <label className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 focus-within:ring-2 focus-within:ring-violet-200"><Search size={17} className="shrink-0 text-slate-400" /><span className="sr-only">Search tutorials</span><input value={query} onChange={(e) => updateFilter(setQuery, e.target.value)} placeholder="Search language, topic, or channel" className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" />{query && <button type="button" onClick={() => updateFilter(setQuery, "")} aria-label="Clear search" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"><X size={15} /></button>}</label>
            <label className="relative flex items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-violet-400"><span className="mr-3 text-xs font-semibold text-slate-500">Language</span><span className="sr-only">Filter by language</span><select value={language} onChange={(e) => updateFilter(setLanguage, e.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent py-3 text-sm font-bold text-slate-800 outline-none"><option>All languages</option>{languages.slice(1).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} className="pointer-events-none text-slate-400" /></label>
          </div>

          {error && <p role="alert" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</p>}
          {loading && <div role="status" aria-label="Loading tutorial guides" className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="min-w-0 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div className="h-6 w-24 rounded-full bg-violet-50" /><div className="h-9 w-9 rounded-xl bg-red-50" /></div><div className="mt-5 h-5 w-3/4 rounded bg-slate-100" /><div className="mt-4 space-y-2"><div className="h-3 rounded bg-slate-100" /><div className="h-3 rounded bg-slate-100" /><div className="h-3 w-4/5 rounded bg-slate-100" /></div><div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4"><div className="space-y-2"><div className="h-2.5 w-28 rounded bg-slate-100" /><div className="h-3.5 w-36 rounded bg-slate-100" /></div><div className="h-10 w-28 rounded-xl bg-slate-100" /></div></div>)}</div>}

          {!loading && !error && pageItems.length > 0 && <>
            <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {pageItems.map((item) => <article key={item._id} className="group flex min-w-0 min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_-20px_rgba(15,23,42,.4)] transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_45px_-25px_rgba(76,29,149,.28)] sm:min-h-[270px] sm:p-6">
                <div className="flex items-start justify-between gap-3"><span className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-violet-700">{item.language}</span><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white"><Youtube size={18} /></span></div>
                <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-5 flex flex-col items-stretch gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Recommended channel</p><p className="mt-1 truncate text-sm font-bold text-slate-800">{item.channelName}</p></div><a href={item.channelUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.channelName} YouTube channel`} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2">Visit channel <ArrowUpRight size={14} /></a></div>
              </article>)}
            </div>

            {filtered.length > PAGE_SIZE && <div className="mt-8 flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs font-medium text-slate-500">Showing <span className="font-bold text-slate-800">{rangeStart}–{rangeEnd}</span> of <span className="font-bold text-slate-800">{filtered.length}</span> guides</p>
              <nav aria-label="Tutorial pages" className="flex min-w-0 items-center justify-between gap-1 sm:justify-end sm:gap-2">
                <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-1.5 sm:px-3"><ArrowLeft size={14} /> <span className="hidden sm:inline">Previous</span></button>
                <div className="flex min-w-0 items-center justify-center gap-1">{visiblePageNumbers.map((number) => <button key={number} aria-current={number === currentPage ? "page" : undefined} aria-label={`Go to page ${number}`} onClick={() => setPage(number)} className={"h-9 min-w-9 rounded-lg px-2 text-xs font-bold transition " + (number === currentPage ? "bg-violet-600 text-white" : "text-slate-600 hover:bg-violet-50 hover:text-violet-700")}>{number}</button>)}</div>
                <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount} className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-1.5 sm:px-3"><span className="hidden sm:inline">Next</span><ArrowRight size={14} /></button>
              </nav>
            </div>}
          </>}

          {!loading && !error && pageItems.length === 0 && <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600"><Search size={22} /></span><h3 className="mt-5 text-lg font-bold text-slate-900">No matching guides</h3><p className="mt-2 text-sm text-slate-500">Try another search or choose a different language.</p><button onClick={() => { setQuery(""); setLanguage("All languages"); setPage(1); }} className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700">Clear filters</button></div>}
        </section>
      </div>
    </Layout>
  );
}
