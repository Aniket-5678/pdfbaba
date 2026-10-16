import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Code2, ArrowRight, Braces, Sparkles, Terminal, Map, Brain, LayoutTemplate, FileText, Languages, CircleCheck } from "lucide-react";
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
        <section className="my-14" aria-labelledby="about-features-title">
          <div className="mb-7 max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700"><Sparkles size={13}/> What you can do here</span><h2 id="about-features-title" className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">A learning and building toolkit, <span className="text-violet-600">in one place.</span></h2><p className="mt-3 text-sm leading-7 text-slate-500">Codebricket connects guided study with hands-on practice and project exploration. Start with the resource that fits your goal, then move between them as you learn.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Code2,"Website source code projects","Explore project descriptions and previews, compare their features, and use a codebase as a reference or a starting point for your own implementation.","/service","Browse projects","from-orange-50 to-white border-orange-100","text-orange-600 bg-orange-100"],
              [LayoutTemplate,"Visual website builder","Start from a template or a blank canvas. Arrange page sections, edit text and images, adjust colors and typography, preview common device sizes, and publish a shareable site.","/builder","Explore the builder","from-violet-50 to-white border-violet-100","text-violet-600 bg-violet-100"],
              [Terminal,"Coding practice","Work through available programming challenges in an editor. Read examples and constraints, use progressive hints when needed, and check a solution against the task’s configured tests.","/coding-practice","Open coding practice","from-emerald-50 to-white border-emerald-100","text-emerald-600 bg-emerald-100"],
              [Languages,"Programming language skills","Practise programming ideas through language-based questions, from reading inputs and working with data to functions, algorithms and interface tasks. Use the challenge details to understand the concepts each problem exercises.","/coding-practice","Practise programming","from-blue-50 to-white border-blue-100","text-blue-600 bg-blue-100"],
              [FileText,"Study notes","Browse learning notes by category, search titles and keywords, and open individual notes for explanations and examples. Tags can help you return to related concepts while revising.","/notes","Read study notes","from-pink-50 to-white border-pink-100","text-pink-600 bg-pink-100"],
              [Map,"Step-by-step roadmaps","Choose a learning path, follow its milestones in order, and mark steps as you go. Your browser keeps the completion checklist so you can return to your next step later.","/exam-roadmap","View roadmaps","from-amber-50 to-white border-amber-100","text-amber-600 bg-amber-100"],
              [Brain,"Topic quizzes","Take focused quizzes, check your selected answers against the correct answers, and use missed questions to decide which topics deserve another review.","/practice-quiz","Try a quiz","from-cyan-50 to-white border-cyan-100","text-cyan-700 bg-cyan-100"],
            ].map(([Icon,title,copy,to,action,shade,iconShade]) => (
              <article key={title} className={`group flex h-full flex-col rounded-3xl border bg-gradient-to-br p-6 shadow-[0_12px_36px_-28px_rgba(30,41,59,.4)] transition duration-300 hover:-translate-y-1 hover:shadow-lg ${shade}`}>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${iconShade}`}><Icon size={21}/></span>
                <h3 className="mt-5 text-base font-bold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-slate-600 sm:text-sm">{copy}</p>
                <Link to={to} className="mt-5 inline-flex items-center gap-2 border-t border-slate-200/70 pt-4 text-xs font-bold text-slate-800 transition group-hover:text-violet-700">{action}<ArrowRight size={15} className="transition group-hover:translate-x-1"/></Link>
              </article>
            ))}
          </div>
        </section>
        <section className="my-14 overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-violet-50/60 to-orange-50/70 p-6 sm:p-9 lg:p-10" aria-labelledby="about-workflow-title">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-violet-700">A practical way to use the platform</span><h2 id="about-workflow-title" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">Learn a concept.<br/><span className="text-violet-600">Try it. Build with it.</span></h2><p className="mt-4 text-sm leading-7 text-slate-600">There is no single required route. The resources work well together, but you can begin wherever you have a question or an idea.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">{[["01","Find your direction","Use a roadmap to see possible next topics, or search the notes library when you already know what you want to study."],["02","Check what you understand","Attempt a quiz or coding challenge before viewing hints. Use the feedback to spot a concept you want to practise again."],["03","Apply it in a project","Explore a source code project or make a small site in the builder. Change one thing at a time and test the result."]].map(([number,title,copy])=><article key={number} className="rounded-2xl border border-white bg-white/85 p-5 shadow-sm"><span className="text-xs font-extrabold text-orange-500">{number}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-600">{copy}</p></article>)}</div>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5">{[["Learning library","/notes"],["Roadmaps","/exam-roadmap"],["Quizzes","/practice-quiz"],["Coding practice","/coding-practice"],["Website builder","/builder"]].map(([label,to])=><Link key={label} to={to} className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-violet-200 hover:text-violet-700"><CircleCheck size={13} className="text-violet-500"/>{label}</Link>)}</div>
        </section>
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
