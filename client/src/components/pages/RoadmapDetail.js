import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { Reveal, Status, panel, primary } from "./PageKit";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  GraduationCap,
  Map,
  Play,
  Route,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
const nodeKey = (node, index) => String(node.id || node._id || index);
const stepId = (key) => "roadmap-step-" + encodeURIComponent(key);
const types = {
  start: {
    label: "Start here",
    color: "bg-orange-50 text-orange-600",
    icon: Flag,
  },
  normal: {
    label: "Build your foundation",
    color: "bg-blue-50 text-blue-600",
    icon: BookOpen,
  },
  advanced: {
    label: "Go deeper",
    color: "bg-violet-50 text-violet-600",
    icon: Sparkles,
  },
  optional: {
    label: "Explore further",
    color: "bg-slate-100 text-slate-500",
    icon: Map,
  },
};
export default function RoadmapDetail() {
  const { id } = useParams();
  const reduced = useReducedMotion();
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState([]);
  const [filter, setFilter] = useState("all");
  const [attempt, setAttempt] = useState(0);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setRoadmap(null);
    setError("");
    setFilter("all");
    setStorageError(false);
    try {
      const saved = JSON.parse(
        localStorage.getItem("roadmap-progress-" + id) || "[]",
      );
      setDone(Array.isArray(saved) ? saved.map(String) : []);
    } catch {
      setDone([]);
    }
    axios
      .get("/api/v1/roadmaps/" + id, { signal: controller.signal })
      .then((response) => setRoadmap(response.data))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            e.response?.status === 404
              ? "This roadmap could not be found."
              : "Couldn't load this roadmap. Please try again.",
          );
      });
    return () => controller.abort();
  }, [id, attempt]);
  function toggle(key) {
    const next = done.includes(key)
      ? done.filter((value) => value !== key)
      : [...done, key];
    setDone(next);
    try {
      localStorage.setItem("roadmap-progress-" + id, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  const nodes = Array.isArray(roadmap?.nodes) ? roadmap.nodes : [];
  const completed = nodes.filter((node, index) =>
    done.includes(nodeKey(node, index)),
  ).length;
  const percent = nodes.length
    ? Math.round((completed / nodes.length) * 100)
    : 0;
  const nextIndex = nodes.findIndex(
    (node, index) => !done.includes(nodeKey(node, index)),
  );
  const nextStep = nodes[nextIndex];
  const title =
    roadmap?.title ||
    (roadmap?.slug
      ? roadmap.slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase())
          .replace(/ Roadmap$/i, "")
          .replace(/\b(Upsc|Ssc|Html|Css|Sql|Api|Ui|Ux|Mern)\b/g, (word) =>
            word.toUpperCase(),
          )
      : roadmap?.category) ||
    "Learning";
  function goToStep(index) {
    setFilter("all");
    requestAnimationFrame(() => {
      const element = document.getElementById(
        stepId(nodeKey(nodes[index], index)),
      );
      element?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      element?.focus({ preventScroll: true });
    });
  }
  return (
    <Layout>
      {roadmap ? (
        <>
          <Seo title={title + " Roadmap"} description={roadmap.description} />
          <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-br from-orange-50/60 via-white to-violet-100/70 px-5 py-9 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-7xl">
              <Link
                to="/exam-roadmap"
                className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-violet-600"
              >
                <ChevronLeft size={16} /> Explore all roadmaps
              </Link>
              <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_340px]">
                <Reveal>
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-[10px] font-bold tracking-[2px] text-violet-700">
                    <Route size={14} /> YOUR PATH, YOUR PACE
                  </p>
                  <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                    {title}
                    <span className="mt-2 block bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                      A clearer way forward.
                    </span>
                  </h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                    {roadmap.description ||
                      "Turn your goals into small, achievable steps. Follow this path and build confidence along the way."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-2 text-slate-600">
                      <GraduationCap size={15} />
                      {roadmap.category || "Learning path"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-2 text-slate-600">
                      <Flag size={15} />
                      {nodes.length} steps
                    </span>
                    {roadmap.level && (
                      <span className="rounded-full border border-slate-100 bg-white px-3 py-2 capitalize text-violet-600">
                        {roadmap.level}
                      </span>
                    )}
                  </div>
                  {nextStep && (
                    <button
                      onClick={() => goToStep(nextIndex)}
                      className={primary + " mt-7"}
                    >
                      <Play size={15} />
                      {completed
                        ? "Continue your journey"
                        : "Start your journey"}
                      <ArrowRight size={17} />
                    </button>
                  )}
                </Reveal>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative rounded-[32px] bg-slate-950 p-7 text-white shadow-2xl shadow-violet-200/60"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-xl bg-white/10 p-3">
                      <Target className="text-orange-300" size={23} />
                    </span>
                    <span className="text-xs text-slate-400">
                      Learning in motion
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-medium uppercase tracking-[2px] text-violet-300">
                    Your progress
                  </p>
                  <div className="my-3 flex items-end justify-between">
                    <p className="text-5xl font-extrabold tracking-tight">
                      {percent}
                      <span className="text-2xl text-slate-400">%</span>
                    </p>
                    <p className="pb-1 text-xs text-slate-400">
                      {completed} / {nodes.length} steps
                    </p>
                  </div>
                  <div
                    role="progressbar"
                    aria-label="Roadmap completion"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percent}
                    className="h-2 overflow-hidden rounded-full bg-white/10"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 transition-all duration-500 motion-reduce:transition-none"
                      style={{ width: percent + "%" }}
                    />
                  </div>
                  <p
                    className="mt-5 text-xs leading-6 text-slate-400"
                    aria-live="polite"
                  >
                    {percent === 100
                      ? "Every step complete. Take a moment to celebrate!"
                      : completed
                        ? "Keep going. Every small step moves you forward."
                        : "Big goals start with one small step."}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:px-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="order-last min-w-0 lg:order-first">
              <div className="space-y-5 lg:sticky lg:top-6">
                <div className={panel}>
                  <h2 className="mb-1 flex items-center gap-2 text-sm font-bold">
                    <Map size={18} className="text-violet-500" /> Your journey
                    at a glance
                  </h2>
                  <p className="mb-5 text-xs leading-6 text-slate-500">
                    Jump to a topic. Move at your own pace.
                  </p>
                  <nav
                    aria-label="Roadmap steps"
                    className="max-h-80 space-y-1 overflow-y-auto pr-1"
                  >
                    {nodes.map((node, index) => {
                      const checked = done.includes(nodeKey(node, index));
                      return (
                        <button
                          key={nodeKey(node, index)}
                          onClick={() => goToStep(index)}
                          className={
                            "flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-xs transition hover:bg-slate-50 " +
                            (index === nextIndex
                              ? "bg-violet-50 text-violet-700"
                              : "text-slate-500")
                          }
                        >
                          <span
                            className={
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold " +
                              (checked
                                ? "bg-emerald-100 text-emerald-600"
                                : index === nextIndex
                                  ? "bg-violet-600 text-white"
                                  : "bg-slate-100 text-slate-500")
                            }
                          >
                            {checked ? <Check size={12} /> : index + 1}
                          </span>
                          <span className="min-w-0 leading-5">
                            {node.title || "Learning step"}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                  <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-6 text-slate-400">
                    {storageError
                      ? "Progress is available this session. Your browser couldn't save it."
                      : "Progress is saved on this device. Sign-in isn't required."}
                  </p>
                </div>
                <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-pink-50 p-6">
                  <span className="mb-3 inline-flex rounded-xl bg-white p-2.5 text-orange-500">
                    <BookOpen size={20} />
                  </span>
                  <h2 className="text-sm font-bold">
                    Learn. Practice. Repeat.
                  </h2>
                  <p className="my-3 text-xs leading-6 text-slate-500">
                    Turn what you learn into confidence with notes and practice
                    quizzes.
                  </p>
                  <Link
                    to="/practice-quiz"
                    className="flex items-center justify-between text-xs font-bold text-orange-600"
                  >
                    Try a practice quiz
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to="/notes"
                    className="mt-4 flex items-center justify-between text-xs font-bold text-slate-600"
                  >
                    Browse study notes
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </aside>
            <div className="min-w-0">
              {nextStep && (
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-white p-2 text-violet-600">
                      <Play size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                        Up next · Step {nextIndex + 1}
                      </p>
                      <p className="mt-1 text-sm font-bold">{nextStep.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(nextIndex)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet-600"
                  >
                    Jump in
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">
                    Your learning path
                  </h2>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    One milestone at a time. Check off each step as you learn.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
                  {[
                    ["all", "All"],
                    ["remaining", "To do"],
                    ["completed", "Done"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      aria-pressed={filter === key}
                      onClick={() => setFilter(key)}
                      className={
                        "rounded-lg px-3 py-2 text-xs font-bold transition " +
                        (filter === key
                          ? "bg-white text-violet-600 shadow-sm"
                          : "text-slate-500")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {!nodes.length && (
                <p className={panel + " text-sm text-slate-500"}>
                  This roadmap has no steps yet.
                </p>
              )}
              {nodes.length > 0 &&
                !nodes.some(
                  (node, index) =>
                    filter === "all" ||
                    (filter === "completed"
                      ? done.includes(nodeKey(node, index))
                      : !done.includes(nodeKey(node, index))),
                ) && (
                  <div className={panel + " text-center"}>
                    <Trophy className="mx-auto mb-4 text-violet-500" />
                    <p className="text-sm text-slate-500">
                      {filter === "completed"
                        ? "Your first completed step will appear here."
                        : "All steps completed. Great work!"}
                    </p>
                  </div>
                )}
              <ol className="relative space-y-5">
                {nodes.map((node, index) => {
                  const key = nodeKey(node, index),
                    checked = done.includes(key);
                  if (
                    (filter === "completed" && !checked) ||
                    (filter === "remaining" && checked)
                  )
                    return null;
                  const type = types[node.type] || types.normal,
                    Icon = type.icon;
                  return (
                    <li
                      key={key}
                      id={stepId(key)}
                      tabIndex={-1}
                      className="relative scroll-mt-6 pl-10 outline-none sm:pl-14"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[-20px] left-[15px] top-8 w-px bg-gradient-to-b from-violet-200 to-slate-100 sm:left-[19px]"
                      />
                      <span
                        aria-hidden="true"
                        className={
                          "absolute left-0 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-[11px] font-bold shadow-sm sm:h-10 sm:w-10 " +
                          (checked
                            ? "bg-emerald-500 text-white"
                            : index === nextIndex
                              ? "bg-violet-600 text-white"
                              : "bg-slate-100 text-slate-500")
                        }
                      >
                        {checked ? <Check size={16} /> : index + 1}
                      </span>
                      <Reveal>
                        <article
                          className={
                            panel +
                            " relative transition duration-300 hover:shadow-lg " +
                            (checked
                              ? "border-emerald-100"
                              : index === nextIndex
                                ? "border-violet-200 bg-gradient-to-br from-white to-violet-50/40"
                                : "")
                          }
                        >
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <span
                              className={
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold " +
                                type.color
                              }
                            >
                              <Icon size={12} />
                              {type.label}
                            </span>
                            <span className="text-[10px] font-semibold tracking-[2px] text-slate-400">
                              STEP {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold leading-7 tracking-tight sm:text-xl">
                            {node.title || "Learning step"}
                          </h3>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-500">
                            {node.description ||
                              node.data?.description ||
                              "Explore this topic and practise what you learn."}
                          </p>
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                            <span className="text-[11px] text-slate-400">
                              {checked
                                ? "Milestone reached"
                                : "Learn it. Try it. Make it stick."}
                            </span>
                            <button
                              aria-pressed={checked}
                              aria-label={
                                (checked
                                  ? "Mark incomplete: "
                                  : "Mark complete: ") +
                                (node.title || "Step " + (index + 1))
                              }
                              onClick={() => toggle(key)}
                              className={
                                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition " +
                                (checked
                                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-slate-950 text-white hover:bg-violet-600")
                              }
                            >
                              <CheckCircle2 size={15} />
                              {checked ? "Completed" : "Mark complete"}
                            </button>
                          </div>
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
              {percent === 100 && nodes.length > 0 && (
                <div className="mt-7 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 p-8 text-center text-white">
                  <Trophy size={36} className="mx-auto mb-4 text-amber-300" />
                  <h2 className="text-2xl font-bold">
                    You made it to the finish line.
                  </h2>
                  <p className="my-4 text-sm text-violet-100">
                    Keep your momentum. Put your knowledge into practice.
                  </p>
                  <Link
                    to="/practice-quiz"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-600"
                  >
                    Practice your skills
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
              {roadmap.edges?.length > 0 && (
                <details className={panel + " mt-8"}>
                  <summary className="cursor-pointer text-sm font-bold text-slate-700">
                    Explore how the steps connect{" "}
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      ({roadmap.edges.length} connections)
                    </span>
                  </summary>
                  <div className="mt-5 space-y-3">
                    {roadmap.edges.map((edge, index) => (
                      <div
                        key={edge._id || index}
                        className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-6 text-slate-500"
                      >
                        <span>
                          {nodes.find(
                            (node) => String(node.id) === String(edge.source),
                          )?.title || edge.source}
                        </span>
                        <ArrowRight size={14} className="text-violet-500" />
                        <span>
                          {nodes.find(
                            (node) => String(node.id) === String(edge.target),
                          )?.title || edge.target}
                        </span>
                        {edge.label && (
                          <span className="text-violet-600">{edge.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <Status loading={!error} error={error} />
          {error && (
            <div className="mt-5 flex flex-wrap gap-4">
              <button
                onClick={() => setAttempt((value) => value + 1)}
                className={primary}
              >
                Try again
              </button>
              <Link
                to="/exam-roadmap"
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold"
              >
                Browse roadmaps
              </Link>
            </div>
          )}
        </section>
      )}
    </Layout>
  );
}
