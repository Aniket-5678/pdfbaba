import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, Status, panel } from "./PageKit";
import { Check, ArrowRight, Route, ChevronLeft } from "lucide-react";
export default function RoadmapDetail() {
  const { id } = useParams(),
    [roadmap, setRoadmap] = useState(null),
    [error, setError] = useState(""),
    [done, setDone] = useState([]);
  useEffect(() => {
    const c = new AbortController();
    setRoadmap(null);
    setError("");
    try {
      const saved = JSON.parse(
        localStorage.getItem("roadmap-progress-" + id) || "[]",
      );
      setDone(Array.isArray(saved) ? saved : []);
    } catch {
      setDone([]);
    }
    axios
      .get("/api/v1/roadmaps/" + id, { signal: c.signal })
      .then((r) => setRoadmap(r.data))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            e.response?.status === 404
              ? "This roadmap could not be found."
              : "Couldn't load this roadmap.",
          );
      });
    return () => c.abort();
  }, [id]);
  function toggle(key) {
    const next = done.includes(key)
      ? done.filter((x) => x !== key)
      : [...done, key];
    setDone(next);
    try {
      localStorage.setItem("roadmap-progress-" + id, JSON.stringify(next));
    } catch {}
  }
  const nodes = roadmap?.nodes || [],
    completed = nodes.filter((n, i) =>
      done.includes(n.id || n._id || String(i)),
    ).length;
  return (
    <Layout>
      {roadmap ? (
        <>
          <Seo
            title={(roadmap.title || roadmap.category) + " Roadmap"}
            description={roadmap.description}
          />
          <PageHero
            eyebrow="ONE STEP AT A TIME"
            title={roadmap.title || roadmap.category || "Your learning"}
            accent="roadmap."
            description={
              roadmap.description ||
              "A structured path to help you grow your skills."
            }
          >
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-xs text-violet-700">
                {nodes.length} learning steps
              </span>
              {roadmap.level && (
                <span className="rounded-full bg-white px-4 py-2 text-xs text-slate-500">
                  {roadmap.level}
                </span>
              )}
            </div>
          </PageHero>
          <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside>
              <Link
                to="/exam-roadmap"
                className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-violet-600"
              >
                <ChevronLeft size={16} />
                All roadmaps
              </Link>
              <div className={panel + " lg:sticky lg:top-6"}>
                <Route className="mb-5 text-violet-600" size={30} />
                <h2 className="font-bold">Your progress</h2>
                <p className="mt-3 text-3xl font-extrabold">
                  {nodes.length
                    ? Math.round((completed / nodes.length) * 100)
                    : 0}
                  %
                </p>
                <div
                  role="progressbar"
                  aria-label="Roadmap completion"
                  aria-valuemin={0}
                  aria-valuemax={nodes.length}
                  aria-valuenow={completed}
                  className="my-4 h-2 overflow-hidden rounded-full bg-violet-100"
                >
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-violet-600 transition-all"
                    style={{
                      width:
                        (nodes.length ? (completed / nodes.length) * 100 : 0) +
                        "%",
                    }}
                  />
                </div>
                <p className="text-xs leading-6 text-slate-500">
                  {completed} of {nodes.length} steps completed. Progress is
                  saved on this device.
                </p>
                <Link
                  to="/practice-quiz"
                  className="mt-6 flex items-center gap-2 text-xs font-bold text-violet-600"
                >
                  Put it into practice
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
            <div>
              {!nodes.length && (
                <p className={panel + " text-sm text-slate-500"}>
                  This roadmap has no steps yet.
                </p>
              )}
              <ol className="space-y-5">
                {nodes.map((n, i) => {
                  const key = n.id || n._id || String(i),
                    checked = done.includes(key);
                  return (
                    <li key={key} className={panel + " relative"}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-violet-600">
                          STEP {String(i + 1).padStart(2, "0")}
                        </span>
                        <button
                          aria-pressed={checked}
                          onClick={() => toggle(key)}
                          className={
                            "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold " +
                            (checked
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-50 text-slate-500")
                          }
                        >
                          {checked && <Check size={14} />}{" "}
                          {checked ? "Completed" : "Mark complete"}
                        </button>
                      </div>
                      <h2 className="text-xl font-bold">
                        {n.title || "Learning step"}
                      </h2>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-500">
                        {n.description ||
                          n.data?.description ||
                          "Explore this topic and practise what you learn."}
                      </p>
                      {n.type && (
                        <span className="mt-4 inline-block rounded-full bg-violet-50 px-3 py-1 text-[10px] font-semibold text-violet-600">
                          {n.type}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
              {roadmap.edges?.length > 0 && (
                <div className={panel + " mt-8"}>
                  <h2 className="mb-5 font-bold">How the steps connect</h2>
                  <div className="space-y-3">
                    {roadmap.edges.map((e, i) => (
                      <p
                        key={e._id || i}
                        className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 p-3 text-xs"
                      >
                        <span>
                          {nodes.find((n) => n.id === e.source)?.title ||
                            e.source}
                        </span>
                        <ArrowRight size={14} className="text-violet-500" />
                        <span>
                          {nodes.find((n) => n.id === e.target)?.title ||
                            e.target}
                        </span>
                        {e.label && (
                          <span className="text-slate-400">{e.label}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <div className="mx-auto max-w-6xl p-10">
          <Status loading={!error} error={error} />
        </div>
      )}
    </Layout>
  );
}
