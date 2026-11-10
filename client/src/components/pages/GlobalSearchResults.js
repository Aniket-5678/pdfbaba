import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import Layout from "../Layout/Layout";

export default function GlobalSearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return undefined; }
    const controller = new AbortController();
    setLoading(true);
    axios.get("/api/v1/search", { params: { q: query, limit: 8 }, signal: controller.signal })
      .then(({ data }) => setResults(data.results || []))
      .catch((error) => { if (!controller.signal.aborted) setResults([]); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [query]);

  return <Layout>
    <section className="mx-auto min-h-[60vh] max-w-6xl px-5 py-12 sm:px-8">
      <div className="mb-8 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600"><Search /></span>
        <div><p className="text-xs font-bold uppercase tracking-widest text-orange-600">Global search</p><h1 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">Results for “{query}”</h1></div>
      </div>
      {loading ? <p className="py-10 text-sm text-slate-500">Searching across Codebricket…</p> : results.length ? <>
        <p className="mb-4 text-sm text-slate-500">{results.length} matching results</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((item, index) => <Link key={`${item.type}-${item.path}-${index}`} to={item.path} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4"><div><span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">{item.type}</span><h2 className="mt-2 text-base font-bold text-slate-900">{item.title}</h2></div><ArrowRight size={17} className="mt-1 shrink-0 text-slate-400 transition group-hover:text-orange-500" /></div>
            {item.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>}
          </Link>)}
        </div>
      </> : <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center"><h2 className="font-bold text-slate-800">No results found</h2><p className="mt-2 text-sm text-slate-500">Try another title, topic, language, or category.</p></div>}
    </section>
  </Layout>;
}
