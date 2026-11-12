import React from "react";
import Layout from "../Layout/Layout";
import Banner from "./Banner";
import Services from "./Services";
import LearningCategories from "./LearningCategories";
import CodingPracticeSection from "./CodingPracticeSection";
import WebsiteBuilderSection from "./WebsiteBuilderSection";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Smartphone,
  LayoutGrid,
  Code2,
  Youtube,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
export default function HomePage() {
  return (
    <Layout>
      <Banner />
      <section className="mx-auto max-w-[1360px] px-5 pb-12 pt-2 sm:px-10 sm:pb-16">
        <div className="relative isolate overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,.3)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-red-100/80 blur-3xl" />
          <div className="grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="p-6 sm:p-9 lg:p-11">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.15em] text-red-700 sm:text-[11px]">
                <Youtube size={14} /> The smarter way to learn
              </span>
              <h2 className="mt-5 max-w-2xl text-[27px] font-extrabold leading-[1.12] tracking-[-.04em] text-slate-950 sm:text-4xl lg:text-[42px]">
                Find your next course. <span className="text-red-600">Skip the search spiral.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                YouTube has great free programming courses. Finding the right one can take time. Browse curated guides by language, discover learning channels, and jump straight to lessons that match what you want to learn.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[["01", "Pick a language"], ["02", "Find a channel"], ["03", "Start learning"]].map(([step, label]) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-extrabold text-red-600 shadow-sm">{step}</span>
                    <span className="text-xs font-bold text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/learning-hub" className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200/70 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2">
                <Youtube size={18} /> Explore YouTube Tutorials <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-[11px] font-medium text-slate-400">Free learning resources · Curated by programming language</p>
            </div>
            <aside aria-label="Example tutorial discovery" className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-slate-950 p-6 sm:p-9 lg:min-h-full">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(239,68,68,.24),transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(99,102,241,.2),transparent_45%)]" />
              <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[.07] p-5 shadow-2xl backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-950/30"><Youtube size={19} /></span><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Learning hub</p><p className="mt-0.5 text-sm font-bold text-white">Choose what to learn</p></div></div>
                  <ArrowUpRight size={17} className="text-slate-500" />
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-xs text-slate-400"><Search size={14} /><span>Search language or topic</span></div>
                <p className="mb-2 mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Explore a language</p>
                <div className="flex flex-wrap gap-2">{[["JavaScript", "bg-amber-300/10 text-amber-200"], ["Python", "bg-blue-300/10 text-blue-200"], ["React", "bg-cyan-300/10 text-cyan-200"], ["Java", "bg-orange-300/10 text-orange-200"]].map(([name, color]) => <span key={name} className={`rounded-lg px-3 py-2 text-[11px] font-bold ${color}`}>{name}</span>)}</div>
                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] font-semibold text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Curated guides with direct YouTube links</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CodingPracticeSection />
      <WebsiteBuilderSection />
      <section className="mx-auto max-w-[1360px] border-t border-slate-100 px-5 py-9 sm:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-medium tracking-wider text-slate-500">
              BROWSE BY CATEGORY
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Popular Project{" "}
              <span className="text-orange-500">Categories</span>
            </h2>
          </div>
          <Link
            to="/service"
            className="flex items-center gap-3 rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold"
          >
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            [Layers, "Full Stack"],
            [FaReact, "React"],
            [Code2, "Next.js"],
            [FaNodeJs, "Node.js"],
            [Smartphone, "Mobile"],
            [LayoutGrid, "UI Templates"],
          ].map(([Icon, title]) => (
            <Link
              key={title}
              to={
                "/service?q=" +
                encodeURIComponent(
                  title === "Full Stack"
                    ? "full"
                    : title === "UI Templates"
                      ? "template"
                      : title,
                )
              }
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="rounded-xl bg-violet-50 p-2 text-violet-600">
                <Icon size={24} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-950">{title}</h3>
                <p className="mt-1 text-[10px] text-slate-500">
                  Explore projects
                </p>
              </div>
              <ArrowRight size={14} className="ml-auto text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
      <LearningCategories />
      <Services />
      <section className="mx-auto max-w-[1360px] px-5 py-12 sm:px-10 sm:py-16">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-violet-50/70 to-orange-50/80 p-6 shadow-sm sm:p-10 lg:p-12">
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="relative">
            <div className="max-w-2xl"><span className="inline-flex rounded-full border border-violet-100 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-violet-700">Learn · Practise · Build</span><h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">Make your next coding step <span className="text-violet-600">clear and practical.</span></h2><p className="mt-4 text-sm leading-7 text-slate-600">Move between explanations, deliberate practice and real project examples. Each kind of resource supports a different part of learning, so you can choose what helps with the question in front of you.</p></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[["01","Build a foundation","Follow a roadmap to see how topics connect. Use notes to unpack a concept, its examples and its vocabulary.","bg-violet-100 text-violet-700"],["02","Test your understanding","Try a coding challenge or quiz before opening a hint. Use the result to decide what to revisit and what you can explain confidently.","bg-orange-100 text-orange-700"],["03","Learn from working examples","Explore project pages to see how interface pieces and application structure fit together. Adapt examples carefully and test your changes.","bg-emerald-100 text-emerald-700"]].map(([number,title,text,color])=><article key={number} className="group rounded-2xl border border-white/90 bg-white/85 p-5 shadow-[0_12px_35px_-24px_rgba(30,41,59,.35)] transition hover:-translate-y-1 hover:shadow-lg sm:p-6"><span className={"inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-extrabold " + color}>{number}</span><h3 className="mt-4 text-base font-bold tracking-tight text-slate-950">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p></article>)}
            </div>
            <div className="mt-6 max-w-4xl border-t border-slate-200/80 pt-5">
              <h3 className="text-sm font-bold text-slate-950 sm:text-base">
                A practical way to study a project
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                When exploring source code, first identify the project’s purpose
                and how to run it. Then trace one feature from its interface to
                the code and data behind it. Make one small change, run the
                project, and observe the result. This connects ideas from notes
                and tutorials to decisions in a working application, while
                giving you a focused way to practise debugging.
              </p>
            </div>
            <p className="mt-6 max-w-4xl text-xs leading-6 text-slate-500">A useful routine is simple: learn one idea, practise it without copying, then apply it in a small project. Return to earlier material when a new step raises a question—that is part of building a durable foundation.</p>
            <nav aria-label="Explore Codebricket learning and website tools" className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5">
              {[["Developer roadmaps","/exam-roadmap"],["Programming quizzes","/practice-quiz"],["Online coding practice","/coding-practice"],["Website builder","/builder"]].map(([label,to])=><Link key={to} to={to} className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2.5 text-[11px] font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700">{label}<ArrowRight size={13}/></Link>)}
            </nav>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1360px] px-5 pb-12 sm:px-10 sm:pb-16" aria-labelledby="codebricket-feature-guide">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-white to-violet-50/70 p-5 text-slate-900 shadow-[0_18px_55px_-35px_rgba(76,29,149,.28)] sm:p-8 lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
          <div className="relative">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700 shadow-sm sm:text-xs">A guide to Codebricket</span>
              <h2 id="codebricket-feature-guide" className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">Learn a concept. Practise it. Build with it.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Codebricket brings together free YouTube learning guides, study notes, guided roadmaps, quizzes, coding challenges, website-building tools and ready-made source-code projects. Use one resource to answer the question you have now, then move to another when you are ready to apply the idea.</p>
            </div>

            <div className="mt-7 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Programming notes", "Browse by category or search for a topic. Read to understand the purpose of a concept, explain it in your own words, then make a small example and keep track of questions to revisit.", "/notes", "READ & UNDERSTAND", "text-violet-700"],
                ["YouTube tutorials", "Find free programming courses more easily. Browse curated learning guides by language, discover recommended YouTube channels, and open lessons directly on YouTube.", "/learning-hub", "LEARN FOR FREE", "text-red-700"],
                ["Developer roadmaps", "Choose a learning path and use its steps to organize what to study next. Check unfamiliar prerequisites, practise one milestone at a time, and move forward when you can explain and apply the idea.", "/exam-roadmap", "PLAN YOUR NEXT STEP", "text-blue-700"],
                ["Practice quizzes", "Use a quiz to check recall and notice which concepts need more work. After each attempt, review why an answer fits; treat guesses and mistakes as prompts for a fresh example, not just a score.", "/practice-quiz", "CHECK YOUR UNDERSTANDING", "text-orange-700"],
                ["Coding practice & DSA", "After signing in, choose challenges by available topic, language and difficulty. Read the examples and constraints, plan an approach, then implement and review it. Algorithm practice can include patterns such as arrays, strings, hash maps and dynamic programming, depending on the challenges available.", "/coding-practice", "SOLVE & DEBUG", "text-emerald-700"],
                ["Website Builder", "Sign in to start from a template or a blank canvas. Arrange page sections, edit text and images, adjust the visual theme, create pages, and preview at desktop, tablet and mobile sizes before publishing.", "/builder", "DESIGN & PUBLISH", "text-pink-700"],
                ["Source-code projects", "Browse project types, compare each description and available preview, then use a suitable codebase to study how a site is put together. Check the individual project details and setup instructions because files and requirements vary.", "/service", "EXPLORE EXAMPLES", "text-sky-700"],
              ].map(([title, text, to, label, labelColor]) => (
                <Link key={to} to={to} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:p-5">
                  <span className={"text-[9px] font-extrabold uppercase tracking-[.13em] " + labelColor}>{label}</span>
                  <h3 className="mt-3 text-base font-bold leading-snug text-slate-950 sm:text-lg">{title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-violet-700">Explore <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm sm:p-6">
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">A practical way to use the resources together</h3>
              <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[["1 · Learn", "Use a note to clarify one concept and its purpose."], ["2 · Organize", "Find where the concept fits in a roadmap and check prerequisites."], ["3 · Practise", "Test your understanding with a quiz, then solve a related coding challenge."], ["4 · Apply", "Use the idea in a small build or study it in a project’s source code."]].map(([title, text]) => (
                  <div key={title} className="min-w-0 rounded-xl border border-slate-200/80 bg-gradient-to-br from-violet-50/70 to-white p-3 sm:p-4">
                    <h4 className="text-xs font-bold text-violet-800 sm:text-sm">{title}</h4>
                    <p className="mt-1.5 text-xs leading-5 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500">You can start anywhere. If practice exposes a gap, return to a note or an earlier roadmap step; if a concept feels clear, try implementing it independently.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
