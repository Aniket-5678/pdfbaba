import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const links = [
    ["Home", "/"],
    ["Projects", "/service"],
    ["Categories", "/categories"],
    ["Notes", "/notes"],
    ["Roadmaps", "/exam-roadmap"],
    ["Practice", "/practice-quiz"],
    ["Website Builder", "/builder"],
  ];
  function search(e) {
    e.preventDefault();
    setOpen(false);
    navigate("/service?q=" + encodeURIComponent(query.trim()));
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
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-5 sm:px-10">
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
          className="hidden items-center gap-5 min-[1360px]:flex"
        >
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              end={path === "/"}
              to={path}
              className={({ isActive }) =>
                "border-b-2 py-3 text-[13px] font-medium transition-colors hover:text-orange-500 " +
                (isActive
                  ? "border-orange-500 text-slate-950"
                  : "border-transparent text-slate-600")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <form
          onSubmit={search}
          role="search"
          className="hidden max-w-[260px] flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 lg:flex"
        >
          <Search size={16} className="shrink-0 text-slate-500" />
          <input
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech, or categories..."
            className="w-full bg-transparent text-[11px] outline-none"
          />
        </form>
        <div className="hidden items-center gap-3 md:flex">
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
          <form
            onSubmit={search}
            className="my-4 flex gap-2 rounded-xl bg-slate-50 p-3"
          >
            <input
              aria-label="Search projects on mobile"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
            <button aria-label="Submit search">
              <Search size={20} />
            </button>
          </form>
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
