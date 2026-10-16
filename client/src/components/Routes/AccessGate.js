import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { ArrowRight, Braces, Code2, LayoutTemplate, Loader2, Sparkles } from "lucide-react";

const publicToolContent = {
  "/builder": {
    eyebrow: "CODEBRICKET STUDIO · WEBSITE BUILDER",
    title: "Build a website that feels like your idea.",
    description: "Start with a portfolio, business, shop, blog or agency template, or create a page from a blank canvas. Arrange sections, edit copy and images, set your colors and type, then preview your work on desktop, tablet and mobile before publishing.",
    icon: LayoutTemplate,
    features: [
      ["Choose a starting point", "Explore ten template directions or begin with a blank canvas. Preview a design before you use it."],
      ["Compose each page", "Add and reorder text, image, product and banner sections. Create separate pages for the parts of your site."],
      ["Review and publish", "Adjust typography and colors, inspect responsive previews and publish a shareable website address when it is ready."],
    ],
    action: "Sign in to open the website builder",
    related: [["Browse website projects", "/service"], ["Explore learning notes", "/notes"]],
  },
  "/coding-practice": {
    eyebrow: "CODEBRICKET · ONLINE CODING PRACTICE",
    title: "Practise the ideas behind the code.",
    description: "Work through programming challenges by topic, language and difficulty. Read each prompt and its examples, write a solution in the editor, use progressive hints when you need direction, and review the result to understand what to try next.",
    icon: Braces,
    features: [
      ["Choose a focused challenge", "Filter the available problem set by difficulty and topic, then inspect the requirements and edge cases."],
      ["Learn while you solve", "Use starter code, examples and step-by-step hints. Frontend tasks include a restricted preview for checking visible requirements."],
      ["Review your approach", "Check configured tests, revisit a solution explanation when available, and keep track of completed practice in your browser."],
    ],
    action: "Sign in to start coding practice",
    related: [["Study with programming notes", "/notes"], ["Explore developer roadmaps", "/exam-roadmap"]],
  },
};

function PublicToolLanding({ content, location }) {
  const Icon = content.icon;
  return (
    <main className="min-h-screen bg-[#f8faf7] text-slate-900">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-10"><a href="/" className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600"><Code2 size={19}/></span>Codebricket</a><a href="/about" className="text-xs font-semibold text-slate-500 hover:text-violet-700">About the platform</a></div></header>
      <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-br from-white via-violet-50/80 to-orange-50/80 px-5 py-14 sm:px-10 sm:py-20"><div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"/><div className="relative mx-auto max-w-7xl"><div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700"><Sparkles size={13}/>{content.eyebrow}</span><div className="mt-6 flex items-start gap-4"><span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-violet-700 shadow-sm sm:grid"><Icon size={27}/></span><div><h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">{content.title}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{content.description}</p></div></div><div className="mt-7 flex flex-wrap gap-3"><Link to="/login" state={{from:{pathname:location.pathname,search:location.search,hash:location.hash}}} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-700">{content.action}<ArrowRight size={16}/></Link><Link to="/about" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-200">How Codebricket works</Link></div></div></div></section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-16"><div className="mb-7 max-w-2xl"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-orange-600">A clear workflow</span><h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{content.title}</h2></div><div className="grid gap-4 md:grid-cols-3">{content.features.map(([title,text],index)=><article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_-30px_rgba(30,41,59,.4)]"><span className={"grid h-10 w-10 place-items-center rounded-xl text-xs font-extrabold " + ["bg-orange-50 text-orange-600","bg-violet-50 text-violet-700","bg-emerald-50 text-emerald-700"][index]}>0{index+1}</span><h3 className="mt-5 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></article>)}</div><div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5"><span className="mr-1 text-xs font-bold text-slate-500">Keep exploring</span>{content.related.map(([label,to])=><Link key={to} to={to} className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100">{label}<ArrowRight size={13}/></Link>)}</div></section>
    </main>
  );
}

export default function AccessGate({ admin = false }) {
  const [auth] = useAuth(),
    location = useLocation(),
    [state, setState] = useState("pending");
  useEffect(() => {
    let alive = true;
    setState("pending");
    if (!auth.token)
      return () => {
        alive = false;
      };
    axios
      .get("/api/v1/user/" + (admin ? "admin-auth" : "user-auth"))
      .then((r) => {
        if (alive) setState(r.data.ok ? "allowed" : "denied");
      })
      .catch(() => {
        if (alive) setState("denied");
      });
    return () => {
      alive = false;
    };
  }, [auth.token, admin]);
  let stored = false;
  try {
    stored = Boolean(localStorage.getItem("auth"));
  } catch {}
  if ((!auth.token && !stored) || state === "denied") {
    const content = !admin && publicToolContent[location.pathname];
    if (content) return <PublicToolLanding content={content} location={location}/>;
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }
  if (state === "allowed" && auth.token) return <Outlet />;
  return (
    <div
      role="status"
      className="flex min-h-[60vh] items-center justify-center gap-3 bg-slate-50 text-sm text-violet-600"
    >
      <Loader2 className="animate-spin" size={22} />
      Opening your workspace...
    </div>
  );
}
