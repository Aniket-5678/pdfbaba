import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Braces, Check, Code2, Sparkles } from "lucide-react";

export default function CodingPracticeSection() {
  return (
    <section className="mx-auto max-w-[1360px] px-5 py-7 sm:px-10 sm:py-10">
      <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10 lg:px-14">
        <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-130px] left-[38%] h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-violet-300">
              <Sparkles size={14} /> BUILD YOUR CODING SKILLS
            </p>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Practice coding in <span className="text-orange-400">any language.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Pick a challenge, write your solution, and check your results. Explore problems across languages and grow one step at a time.
            </p>
            <Link
              to="/coding-practice"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-950/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start coding <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-[11px] text-slate-400">your-solution.js</span>
              <Braces size={15} className="ml-auto text-violet-300" />
            </div>
            <div className="space-y-2 font-mono text-xs sm:text-sm">
              <p><span className="text-violet-300">function</span> <span className="text-sky-300">solve</span><span className="text-slate-300">(problem) {'{'}</span></p>
              <p className="pl-5 text-slate-400">{"// learn by building"}</p>
              <p className="pl-5"><span className="text-violet-300">return</span> <span className="text-emerald-300">practice</span>(problem);</p>
              <p className="text-slate-300">{'}'}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["JavaScript", "Python", "HTML & CSS", "More languages"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-300">{item}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-400/10 px-3 py-2.5 text-xs text-emerald-300">
              <Check size={14} /> Learn at your own pace
              <Code2 size={14} className="ml-auto opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
