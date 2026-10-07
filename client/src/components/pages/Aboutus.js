import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Code2, BookOpen, ArrowRight, Braces, Sparkles, Terminal } from "lucide-react";
export default function Aboutus() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="mb-4 text-xs font-bold tracking-widest text-orange-500">
          ABOUT CODEBRICKET
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Great ideas deserve
          <br />
          <span className="text-violet-600">a better starting point.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Codebricket brings source code projects and practical learning
          resources together. Explore real implementations, strengthen your
          foundations, and spend more time building your next idea.
        </p>
        <div className="my-10 grid gap-6 md:grid-cols-2">
          {[
            [
              Code2,
              "Build with real projects",
              "Browse website projects, explore previews, and customize source code to suit your own goals.",
            ],
            [
              BookOpen,
              "Learn by doing",
              "Follow developer roadmaps, practice with quizzes, and build your understanding one step at a time.",
            ],
          ].map(([Icon, title, copy]) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-8"
            >
              <Icon size={32} className="mb-5 text-orange-500" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {copy}
              </p>
            </div>
          ))}
        </div>
        <section className="relative my-14 overflow-hidden rounded-[30px] bg-[#14291f] p-7 text-white shadow-2xl shadow-emerald-950/10 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-emerald-100/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-emerald-100/10" />
          <div className="relative grid items-center gap-8 md:grid-cols-[.75fr_1.25fr] md:gap-12">
            <div className="flex flex-col items-start">
              <div className="grid h-28 w-28 place-items-center rounded-[30px] border border-white/15 bg-gradient-to-br from-emerald-200/20 to-white/5 text-4xl font-extrabold tracking-[-.08em] text-emerald-100 shadow-xl sm:h-36 sm:w-36 sm:text-5xl">AS</div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-[10px] font-semibold tracking-wide text-emerald-100"><Terminal size={13}/> FULL STACK DEVELOPER</span>
            </div>
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.18em] text-emerald-200"><Sparkles size={14}/> A NOTE FROM THE FOUNDER</p>
              <h2 className="text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Hi, I’m Aniket Singh.</h2>
              <p className="mt-2 text-sm font-semibold text-emerald-200">Founder & CEO · Full Stack Developer</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                I started Codebricket with a simple goal: make it easier for people to learn, explore real projects, and bring their own ideas to life. I designed and built this platform from scratch, working across the full stack—from the user experience to the code behind it.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Product design", "Frontend", "Backend", "Full stack"].map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[10px] font-medium text-slate-200">{skill}</span>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/builder" className="inline-flex items-center gap-3 rounded-xl bg-emerald-400 px-5 py-3 text-xs font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-300">Build your website <ArrowRight size={16}/></Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"><Braces size={15}/> Say hello</Link>
              </div>
            </div>
          </div>
        </section>
        <Link
          to="/service"
          className="inline-flex items-center gap-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4 text-sm font-bold text-white"
        >
          Explore projects
          <ArrowRight size={18} />
        </Link>
      </section>
    </Layout>
  );
}
