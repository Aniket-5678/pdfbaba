import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Braces,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../context/auth";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setSearching(false);
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await axios.get("/api/v1/search", { params: { q: term, limit: 4 }, signal: controller.signal });
        setResults(data.results || []);
      } catch (error) {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);
  const links = [
    ["Projects", "/service"],
    ["Categories", "/categories"],
    ["Notes", "/notes"],
    ["YouTube Tutorials", "/learning-hub"],
    ["Roadmaps", "/exam-roadmap"],
    ["Practice", "/practice-quiz"],
    ["Coding", "/coding-practice"],
    ["Website Builder", "/builder"],
  ];
  function search(e) {
    e.preventDefault();
    setOpen(false);
    setSearchOpen(false);
    if (query.trim()) navigate("/search?q=" + encodeURIComponent(query.trim()));
  }
  function logout() {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/");
  }
  return (
    <header className="relative z-40 border-b border-slate-100 bg-white/95">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 text-[11px] font-medium text-indigo-950 sm:px-10">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-5 rounded-full border border-violet-100 bg-violet-50/50 px-4 py-2">
          <span>
            Launch <strong>Faster</strong>
          </span>
          <Sparkles size={12} className="text-violet-600" />
          <span className="hidden sm:block">Modern Source Code</span>
          <span className="rounded-full bg-violet-600 px-3 py-1 text-white">
            Real Projects
          </span>
          <span className="hidden md:block">Learn & Build</span>
          <Sparkles size={12} className="hidden text-violet-500 md:block" />
          <span className="hidden lg:block">Grow Your Skills</span>
        </div>
        <span className="hidden items-center gap-2 whitespace-nowrap lg:flex">
          <Sparkles size={16} className="text-orange-500" />
          Built for developers
        </span>
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <Link
          to="/"
          aria-label="Codebricket home"
          className="flex shrink-0 items-center gap-2.5 text-[25px] font-extrabold tracking-[-1.2px] text-slate-950"
        >
          <Braces size={38} strokeWidth={3} className="text-orange-500" />
          <span>
            Code<span className="text-orange-500">Bricket</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden shrink-0 items-center gap-3 whitespace-nowrap min-[1360px]:flex"
        >
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              end={path === "/"}
              to={path}
              className={({ isActive }) =>
                "whitespace-nowrap border-b-2 py-3 text-xs font-medium transition-colors hover:text-orange-500 " +
                (isActive
                  ? "border-orange-500 text-slate-950"
                  : "border-transparent text-slate-600")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="relative hidden max-w-[220px] min-w-[150px] flex-1 lg:block">
          <form onSubmit={search} role="search" className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-3">
            <Search size={16} className="shrink-0 text-slate-500" />
            <input aria-label="Search all Codebricket features" value={query} onFocus={() => setSearchOpen(true)} onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }} placeholder="Search everything..." className="w-full bg-transparent text-[11px] outline-none" />
          </form>
          {searchOpen && query.trim().length >= 2 && <SearchSuggestions results={results} searching={searching} query={query} onSelect={() => setSearchOpen(false)} onSeeAll={search} />}
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link
            to="/sourcecode-order"
            aria-label="My projects"
            className="p-2 text-slate-700"
          >
            <ShoppingBag size={21} />
          </Link>
          {auth.user ? (
            <>
              <Link
                className="text-sm font-semibold"
                to={"/dashboard/" + (auth.user.role === 1 ? "admin" : "user")}
              >
                {auth.user.fullName || auth.user.name || "Account"}
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-950 hover:bg-slate-50"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-orange-100"
              >
                Sign Up <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-200 p-2 min-[1360px]:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-5 pb-5 min-[1360px]:hidden"
        >
          <div className="relative">
          <form onSubmit={search} className="my-4 flex gap-2 rounded-xl bg-slate-50 p-3">
            <input
              aria-label="Search all Codebricket features"
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
              placeholder="Search everything..."
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
            <button aria-label="Submit search">
              <Search size={20} />
            </button>
          </form>
          {searchOpen && query.trim().length >= 2 && <SearchSuggestions results={results} searching={searching} query={query} onSelect={() => setSearchOpen(false)} onSeeAll={search} />}
          </div>
          {[
            ...links,
            ["My projects", "/sourcecode-order"],
            [
              auth.user ? "Account" : "Log In",
              auth.user
                ? "/dashboard/" + (auth.user.role === 1 ? "admin" : "user")
                : "/login",
            ],
            ...(!auth.user ? [["Sign Up", "/register"]] : []),
          ].map(([label, path]) => (
            <Link
              key={label}
              to={path}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-orange-50"
            >
              {label}
            </Link>
          ))}
          {auth.user && (
            <button
              onClick={logout}
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
            >
              <LogOut size={18} />
              Log out
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

function SearchSuggestions({ results, searching, query, onSelect, onSeeAll }) {
  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[65vh] min-w-[280px] overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
      <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Search results</p>
      {searching ? <p className="px-3 py-4 text-sm text-slate-500">Searching…</p> : results.length ? results.map((item, index) => (
        <Link key={`${item.type}-${item.path}-${index}`} to={item.path} onClick={onSelect} className="block rounded-xl px-3 py-2.5 hover:bg-orange-50">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-orange-600">{item.type}</span>
          <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900">{item.title}</span>
          {item.description && <span className="mt-0.5 block truncate text-xs text-slate-500">{item.description}</span>}
        </Link>
      )) : <p className="px-3 py-4 text-sm text-slate-500">No matches for “{query}”.</p>}
      <button type="button" onClick={onSeeAll} className="mt-1 w-full rounded-xl border-t border-slate-100 px-3 py-3 text-left text-xs font-bold text-slate-700 hover:bg-slate-50">See all results →</button>
    </div>
  );
}
