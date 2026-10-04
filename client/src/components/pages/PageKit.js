import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Search, ArrowRight } from "lucide-react";
export const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50";
export const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg disabled:opacity-50";
export const panel =
  "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(55,40,100,.3)]";
export function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function PageHero({ eyebrow, title, accent, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-br from-orange-50/60 via-white to-violet-100/60 px-5 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-bold tracking-widest text-violet-700">
            <Sparkles size={14} />
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            {title}{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
              {accent}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            {description}
          </p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
export function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  label = "Search",
}) {
  return (
    <label className="relative block max-w-xl">
      <span className="sr-only">{label}</span>
      <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={field + " pl-11"}
      />
    </label>
  );
}
export function Status({ loading, error, empty }) {
  return loading ? (
    <div role="status" className="grid gap-5 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className={panel + " h-48 animate-pulse bg-slate-50"} />
      ))}
    </div>
  ) : error ? (
    <p role="alert" className={panel + " text-red-600"}>
      {error}
    </p>
  ) : empty ? (
    <p className={panel + " text-center text-slate-500"}>
      No results found. Try another search.
    </p>
  ) : null;
}
export function ActionLabel({ children }) {
  return (
    <span className="flex items-center gap-2">
      {children}
      <ArrowRight size={16} />
    </span>
  );
}
