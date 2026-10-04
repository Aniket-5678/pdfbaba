import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import AdminShell from "../AdminShell";
import { adminLinks } from "../Adminmenu";
import { panel, Reveal } from "../PageKit";
import { ArrowUpRight, BookOpen, Brain, Route, Code2 } from "lucide-react";
export default function Admindashboard() {
  const [auth] = useAuth(),
    [stats, setStats] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    Promise.all([
      axios.get("/api/notes"),
      axios.get("/api/v1/quizzes/all"),
      axios.get("/api/v1/roadmaps"),
      axios.get("/api/v1/sourcecode"),
    ])
      .then(([n, q, r, p]) => {
        if (alive)
          setStats([n.data.count, q.data.length, r.data.length, p.data.length]);
      })
      .catch(() => {
        if (alive)
          setError(
            "Some content counts couldn't load. Use the management pages to try again.",
          );
      });
    return () => {
      alive = false;
    };
  }, []);
  return (
    <AdminShell
      title={
        "Welcome back, " +
        (auth.user?.fullName || auth.user?.name || "creator") +
        "."
      }
      description="Your content, learning paths and projects. Everything you need to keep Codebricket growing."
    >
      <Reveal className="mb-7 flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-br from-slate-950 to-violet-950 p-7 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold tracking-widest text-violet-300">
            MAKE SOMETHING USEFUL
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            What will you share today?
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Publish a note, create a quiz or map out the next learning journey.
          </p>
        </div>
        <Link
          to="/dashboard/admin/notes"
          className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700"
        >
          Create a note →
        </Link>
      </Reveal>
      {error && (
        <p role="alert" className="mb-5 text-sm text-amber-700">
          {error}
        </p>
      )}
      <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          ["Notes", BookOpen],
          ["Quizzes", Brain],
          ["Roadmaps", Route],
          ["Projects", Code2],
        ].map(([name, Icon], i) => (
          <div key={name} className={panel}>
            <Icon className="mb-4 text-violet-500" size={23} />
            <p className="text-3xl font-extrabold">{stats?.[i] ?? "—"}</p>
            <p className="mt-1 text-xs text-slate-500">{name}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-4 text-lg font-bold">Your workspace</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminLinks.slice(1).map(([name, url, Icon]) => (
          <Link
            key={url}
            to={url}
            className={
              panel +
              " group flex items-center gap-4 transition hover:border-violet-300"
            }
          >
            <Icon className="text-violet-500" size={23} />
            <span className="flex-1 text-sm font-semibold">{name}</span>
            <ArrowUpRight
              className="text-slate-400 group-hover:text-violet-600"
              size={18}
            />
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
