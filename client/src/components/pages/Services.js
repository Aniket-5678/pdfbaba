import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  ShoppingBag,
  Zap,
  Smartphone,
  Settings,
  Heart,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
export const projectCategories = [
  "All Projects",
  "Ecommerce",
  "Business",
  "Portfolio",
  "SaaS",
  "Blog",
  "Travel",
  "Restaurant",
  "Real Estate",
];
function categoryFor(project) {
  const text = (project.title + " " + project.description).toLowerCase();
  return (
    projectCategories
      .slice(1)
      .find(
        (c) =>
          text.includes(c.toLowerCase()) ||
          (c === "Ecommerce" && /commerce|fashion|store|shop/.test(text)) ||
          (c === "SaaS" && /dashboard|saas/.test(text)) ||
          (c === "Real Estate" && /property|estate/.test(text)),
      ) || "Business"
  );
}
export default function Services({ catalog = false }) {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selected, setSelected] = useState("All Projects");
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(
        localStorage.getItem("codebricket-saved") || "[]",
      );
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  });
  const rail = useRef(null),
    reduced = useReducedMotion();
  const Heading = catalog ? "h1" : "h2";
  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/v1/sourcecode", { signal: controller.signal })
      .then(({ data }) => {
        setProjects(
          (Array.isArray(data) ? data : data.services || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        );
        setStatus("ready");
      })
      .catch((error) => {
        if (error.code !== "ERR_CANCELED") setStatus("error");
      });
    return () => controller.abort();
  }, []);
  const filtered = projects.filter(
    (p) =>
      (selected === "All Projects" || categoryFor(p) === selected) &&
      ((p.title || "") + " " + (p.description || ""))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function toggleSaved(id) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("codebricket-saved", JSON.stringify(next));
    } catch {}
  }
  return (
    <section
      id="projects"
      className="relative scroll-mt-8 overflow-hidden bg-gradient-to-br from-white via-violet-50/40 to-blue-50/40 px-5 py-16 sm:px-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
          <div className="max-w-[700px]">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-[11px] font-bold tracking-wider text-violet-700">
              <Code2 size={16} />
              BUILD & LAUNCH
            </p>
            <Heading className="text-[36px] font-extrabold leading-[1.08] tracking-[-1.8px] text-slate-950 sm:text-[52px]">
              Ready-Made
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                Website Projects
              </span>
            </Heading>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
              Explore professionally built website projects that you can
              customize, use,
              <br className="hidden xl:block" />
              and launch faster. High-quality code, modern UI, and responsive
              designs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 xl:max-w-[560px]">
            {[
              [
                Zap,
                "Instant Download",
                "Access after purchase",
                "bg-orange-50 text-orange-500",
              ],
              [
                Code2,
                "Clean Code",
                "Explore the implementation",
                "bg-blue-50 text-blue-600",
              ],
              [
                Smartphone,
                "Modern Interfaces",
                "Build for your audience",
                "bg-violet-100 text-violet-600",
              ],
              [
                Settings,
                "Make It Your Own",
                "Customize your project",
                "bg-green-50 text-green-600",
              ],
            ].map(([Icon, title, text, color]) => (
              <div key={title} className="flex items-center gap-2">
                <span className={"rounded-xl p-3 " + color}>
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-[11px] font-bold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-1 text-[9px] text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {catalog && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setParams(query ? { q: query } : {});
            }}
            className="mb-5 flex max-w-lg gap-2"
          >
            <input
              aria-label="Filter projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your next project..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
            <button className="rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
              Search
            </button>
          </form>
        )}
        <div className="mb-7 flex items-center justify-between gap-5">
          <div
            role="group"
            aria-label="Project categories"
            className="no-scrollbar flex min-w-0 gap-2 overflow-x-auto pb-2"
          >
            {projectCategories.map((category) => (
              <button
                key={category}
                aria-pressed={selected === category}
                onClick={() => setSelected(category)}
                className={
                  "shrink-0 rounded-full border px-5 py-3 text-[11px] font-semibold transition " +
                  (selected === category
                    ? "border-transparent bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-pink-100"
                    : "border-slate-200 bg-white/80 text-slate-500 hover:border-orange-300")
                }
              >
                {category}
              </button>
            ))}
          </div>
          {!catalog && (
            <Link
              to="/service"
              className="hidden shrink-0 items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-xs font-semibold text-white lg:flex"
            >
              View All Projects <ArrowRight size={17} />
            </Link>
          )}
        </div>
        {status === "loading" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-3xl border border-slate-100 bg-white"
              >
                <div className="h-48 rounded-t-3xl bg-slate-100" />
              </div>
            ))}
          </div>
        ) : status === "error" ? (
          <div
            role="alert"
            className="rounded-2xl border border-orange-100 bg-orange-50 p-8 text-center text-sm text-slate-600"
          >
            Projects couldn't be loaded.{" "}
            <button
              onClick={() => window.location.reload()}
              className="font-semibold text-orange-600 underline"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-slate-500">
            No projects match this category or search.{" "}
            <button
              onClick={() => {
                setSelected("All Projects");
                setQuery("");
                setParams({});
              }}
              className="text-violet-600 underline"
            >
              View all projects
            </button>
          </div>
        ) : (
          <div className="relative">
            {!catalog && (
              <>
                <button
                  aria-label="Previous projects"
                  onClick={() =>
                    rail.current.scrollBy({
                      left: -340,
                      behavior: reduced ? "auto" : "smooth",
                    })
                  }
                  className="absolute -left-4 top-36 z-10 hidden rounded-full border border-slate-200 bg-white p-3 shadow-md md:block"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  aria-label="Next projects"
                  onClick={() =>
                    rail.current.scrollBy({
                      left: 340,
                      behavior: reduced ? "auto" : "smooth",
                    })
                  }
                  className="absolute -right-4 top-36 z-10 hidden rounded-full border border-slate-200 bg-white p-3 shadow-md md:block"
                >
                  <ChevronRight size={19} />
                </button>
              </>
            )}
            <div
              ref={rail}
              className={
                catalog
                  ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8"
              }
            >
              {filtered.map((project, i) => (
                <motion.article
                  key={project._id}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.05, 0.3),
                  }}
                  className={
                    "group overflow-hidden rounded-[22px] border border-slate-200/70 bg-white shadow-[0_10px_35px_-20px_rgba(50,50,90,.3)] " +
                    (!catalog
                      ? "w-[280px] shrink-0 snap-start xl:w-[calc((100%-80px)/5)] xl:min-w-[240px]"
                      : "")
                  }
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-100 to-blue-50">
                    {project.thumbnail ? (
                      <img
                        src={
                          project.thumbnail.startsWith("http:")
                            ? project.thumbnail.replace("http:", "https:")
                            : project.thumbnail
                        }
                        alt={project.title + " website preview"}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-violet-400">
                        <Code2 size={52} />
                        <span className="text-xs text-slate-500">
                          Source code project
                        </span>
                      </div>
                    )}
                    <span
                      className={
                        "absolute left-3 top-3 flex items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-semibold text-white " +
                        (i % 3 === 0
                          ? "bg-orange-500"
                          : i % 3 === 1
                            ? "bg-violet-600"
                            : "bg-emerald-500")
                      }
                    >
                      <Zap size={12} />
                      Ready to build
                    </span>
                    <button
                      aria-label={
                        saved.includes(project._id)
                          ? "Remove " + project.title + " from saved projects"
                          : "Save " + project.title
                      }
                      aria-pressed={saved.includes(project._id)}
                      onClick={() => toggleSaved(project._id)}
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm"
                    >
                      <Heart
                        size={18}
                        fill={saved.includes(project._id) ? "#ec4899" : "none"}
                        className={
                          saved.includes(project._id) ? "text-pink-500" : ""
                        }
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-slate-500">
                      {categoryFor(project)}
                    </p>
                    <Link to={"/service/" + project._id}>
                      <h3 className="mt-1 line-clamp-2 text-[15px] font-bold text-slate-950 hover:text-violet-600">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-relaxed text-slate-500">
                      {(
                        project.description ||
                        "Explore the source code and customize it for your next project."
                      ).replace(/<[^>]*>/g, "")}
                    </p>
                    <p className="mt-3 text-[23px] font-extrabold text-violet-600">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(project.price)}
                    </p>
                    <div className="my-4 flex items-center gap-4 text-cyan-500">
                      <FaReact size={22} />
                      <Code2 size={21} className="text-slate-900" />
                      <FaNodeJs size={23} className="text-green-600" />
                      {project.viewLink && (
                        <a
                          href={project.viewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={"Live preview of " + project.title}
                          className="ml-auto text-slate-500"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={"/service/" + project._id}
                        className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[11px] font-bold text-slate-950 transition hover:bg-violet-50"
                      >
                        Explore Project <ArrowRight size={15} />
                      </Link>
                      <Link
                        to={"/sourcecode/buy/" + project._id}
                        aria-label={"Buy " + project.title}
                        className="rounded-xl border border-slate-200 p-3 text-slate-700 hover:bg-orange-50"
                      >
                        <ShoppingBag size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
      {catalog && (
        <div className="mx-auto mt-14 max-w-6xl space-y-8">
          <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-xl shadow-violet-200/50 sm:p-9 lg:p-11">
            <div aria-hidden="true" className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.17em] text-orange-200">A practical project field guide</span><h2 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Choose with a goal.<br/><span className="text-violet-300">Customize with a plan.</span></h2></div><p className="max-w-xl text-sm leading-7 text-slate-300">A source code project is most useful when it matches something you want to understand or build. Use the preview and project description to make an informed choice, then work through the code in deliberate steps.</p></div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[["01","Evaluate the fit","Identify the page types and features you need. Compare those requirements with the project description and live preview before deciding it is a useful starting point."],["02","Map the structure","After opening the code, locate the app entry point, routes, shared components and configuration. Understanding where a change belongs makes customization safer."],["03","Test the experience","Run the project locally, replace sample content and check the primary journey at mobile and desktop widths. Recheck navigation, forms and empty states after edits."]].map(([number,title,text],index)=><article key={number} className="rounded-2xl border border-white/10 bg-white/[.06] p-5 backdrop-blur-sm"><span className={"inline-flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-extrabold " + (index===0?"bg-orange-300/15 text-orange-200":index===1?"bg-violet-300/15 text-violet-200":"bg-emerald-300/15 text-emerald-200")}>{number}</span><h3 className="mt-4 text-sm font-bold text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-300">{text}</p></article>)}
              </div>
            </div>
          </section>
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-violet-50/50 to-orange-50/70 p-6 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="text-[10px] font-bold uppercase tracking-[.17em] text-violet-700">Find a useful starting point</span><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Pick the project by what you want to practise.</h2></div><p className="max-w-lg text-xs leading-6 text-slate-600">Different project types expose different engineering decisions. Start with the kind of user experience you want to study.</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[["E-commerce","Study product discovery, product detail layouts and the transitions between browsing and taking action.","bg-orange-100 text-orange-700"],["Portfolio","Look at how work samples are presented, how context is written and how a visitor finds the next step.","bg-violet-100 text-violet-700"],["SaaS & dashboards","Inspect navigation hierarchy, data summaries and the way dense information is grouped for scanning.","bg-blue-100 text-blue-700"],["Business & services","Review how a site explains an offer, establishes trust and makes contact information easy to find.","bg-emerald-100 text-emerald-700"]].map(([title,text,color])=><article key={title} className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"><span className={"inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold " + color}>{title}</span><p className="mt-3 text-xs leading-6 text-slate-600">{text}</p></article>)}
            </div>
            <p className="mt-5 border-t border-slate-200/80 pt-4 text-[11px] leading-6 text-slate-500">Before relying on a codebase, read its setup instructions and verify which services or environment settings it needs. Keep credentials private, make a backup before larger changes, and check the experience from a visitor’s point of view.</p>
          </section>
          <section className="overflow-hidden rounded-[30px] border border-violet-100 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-5 text-white shadow-xl shadow-violet-950/10 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-orange-200">A customization plan</span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Make the project fit a real need.</h2>
              </div>
              <p className="text-sm leading-7 text-slate-300">A useful adaptation starts with a clear brief, not a long list of edits. Decide what the site should help its visitors do, then make changes in small, reviewable steps. Use the project description and preview as reference points, and confirm implementation details in the supplied files.</p>
            </div>
            <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[["01 · Audience", "Who is the site for, and what do visitors need to understand or complete? Write one primary goal before changing pages."], ["02 · Scope", "Choose the pages and essential interactions needed for that goal. Separate must-have behavior from ideas that can wait."], ["03 · Content", "Replace placeholder copy and imagery with material that accurately represents the intended site. Check that each section supports the visitor’s task."], ["04 · Constraints", "Note target screen sizes, required integrations and setup needs. Verify each constraint against the project files rather than assuming it is already supported."]].map(([label, text], index) => (
                <article key={label} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:p-5">
                  <span className={"text-[9px] font-extrabold uppercase tracking-[.12em] " + ["text-orange-200", "text-violet-200", "text-sky-200", "text-emerald-200"][index]}>{label}</span>
                  <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:p-6">
                <h3 className="text-base font-bold text-white sm:text-lg">Work in small, reviewable passes</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-6 text-slate-300 sm:text-sm">
                  <li>Run the project as supplied and note the important pages and interactions.</li>
                  <li>Update content and assets, then check that the meaning and hierarchy remain clear.</li>
                  <li>Make one focused interface or behavior change at a time so its effect is easy to inspect.</li>
                  <li>After each pass, revisit the main visitor journey and keep a short note of what changed.</li>
                </ol>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:p-6">
                <h3 className="text-base font-bold text-white sm:text-lg">Review from a visitor’s point of view</h3>
                <ul className="mt-3 space-y-2 text-xs leading-6 text-slate-300 sm:text-sm">
                  <li>Can visitors understand the purpose of each page and find the next step?</li>
                  <li>Do navigation, buttons and forms behave as their labels promise?</li>
                  <li>Is important content readable at narrow and wide screen sizes?</li>
                  <li>Can keyboard users identify and reach the interactive controls?</li>
                  <li>Are empty, loading or error states understandable where the project uses them?</li>
                </ul>
              </article>
            </div>
            <p className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4 text-xs leading-6 text-slate-300 sm:p-5 sm:text-sm">A project is ready for its next iteration when the main task is clear, the important interactions have been checked, and the remaining improvements are written down. This review is a practical checklist; the actual capabilities and setup vary by project.</p>
          </section>
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_45px_-32px_rgba(30,41,59,.35)]">
            <div className="bg-gradient-to-br from-violet-50 via-white to-orange-50 p-5 sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">After you choose a project</span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">What to expect after buying source code</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Review the project description and preview before checkout so you know which project you are selecting. The exact files and setup requirements depend on that listing.</p>
              </div>
              <ol className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[["1 · Review", "Open the project details and compare its description and available preview with what you need."], ["2 · Checkout", "Sign in and complete the one-time payment through the secure checkout for the selected project."], ["3 · Download", "After payment verification, the flow opens a success page where you can download the project ZIP. The current order download window is 24 hours, so save the file locally promptly."], ["4 · Set up", "Extract the archive and follow the setup instructions included with the purchase. Check that project's own files for its prerequisites and configuration; there is no single setup command that applies to every project."]].map(([title, text], index) => (
                  <li key={title} className="min-w-0 rounded-2xl border border-white bg-white/85 p-4 shadow-sm sm:p-5">
                    <span className={"inline-flex h-8 w-8 items-center justify-center rounded-xl text-xs font-extrabold " + ["bg-orange-100 text-orange-700", "bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700"][index]}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-sm font-bold text-slate-900 sm:text-base">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/80 p-4 text-xs leading-6 text-slate-600 sm:text-sm">The download is a ZIP file, not an automatically hosted or deployed website. You receive the files for the project shown in its listing; inspect the included documentation and verify its requirements before making it part of a live business workflow.</p>
            </div>
            <div className="border-t border-slate-200 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">Browse by project type</span>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">Different starting points for different business needs.</h3>
                </div>
                <p className="max-w-xl text-xs leading-6 text-slate-600 sm:text-sm">The catalog groups projects into these types. Use them to narrow your search, then confirm each project's actual scope from its own details.</p>
              </div>
              <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[["E-commerce", "Present products and help visitors move from browsing toward an inquiry or purchase. Check each listing to see which commerce steps are actually included."], ["Business", "Explain a company’s services, audience and contact path in one place; useful when customers need a clear introduction before reaching out."], ["Portfolio", "Show selected work and its context so prospective clients or employers can understand the creator’s experience and approach."], ["SaaS", "Introduce a software product or present an application-style interface. Review the project details to distinguish a visual starting point from any working service features."], ["Blog", "Organize articles and subject matter to support publishing, education or a company’s content strategy."], ["Travel", "Present destinations, itineraries or travel information in a way that helps visitors compare options and plan their next step."], ["Restaurant", "Share a menu, location and dining information so guests can decide what to order or how to visit."], ["Real estate", "Present properties and key listing information to help prospective buyers or renters explore available options."]].map(([title, text], index) => (
                  <article key={title} className="min-w-0 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5">
                    <span className={"inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide " + ["bg-orange-100 text-orange-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700"][index % 4]}>{title}</span>
                    <p className="mt-3 text-xs leading-6 text-slate-600 sm:text-sm">{text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500 sm:text-sm">A project can provide a useful base for a business website, but fit depends on its real features, content, setup and your requirements. A template or source archive by itself does not guarantee business results; plan to adapt and review it for your audience.</p>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[30px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-orange-50 p-5 sm:p-8 lg:p-9">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-violet-700">Need a custom solution?</span>
                <h2 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">Talk to a developer about your project.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">If you need a website shaped around requirements beyond a ready-made project, use the developer request form to describe your idea, project type and budget. The team can reply to the email you provide. Sign in is required to open the form.</p>
              </div>
              <Link to="/builder/connect" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 sm:w-fit">
                Talk to a developer <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
