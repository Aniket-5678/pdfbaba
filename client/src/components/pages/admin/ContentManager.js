import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminShell from "../AdminShell";
import { panel, primary, field, Status, SearchBox } from "../PageKit";
import { Pencil, Trash2 } from "lucide-react";
export default function ContentManager({ quiz = false }) {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [editing, setEditing] = useState(null),
    [title, setTitle] = useState(""),
    [busy, setBusy] = useState(false);
  const base = quiz ? "/api/v1/quizzes" : "/api/v1/roadmaps";
  useEffect(() => {
    let alive = true;
    axios
      .get(base + (quiz ? "/all" : ""))
      .then((r) => {
        if (alive) setItems(r.data);
      })
      .catch(() => {
        if (alive) setError("Couldn't load content.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [base, quiz]);
  async function remove(x) {
    if (!window.confirm("Delete " + (x.title || x.category) + "?")) return;
    setBusy(true);
    try {
      await axios.delete(base + "/" + x._id);
      setItems((a) => a.filter((y) => y._id !== x._id));
      setError("");
    } catch (e) {
      setError("Couldn't delete this item.");
    } finally {
      setBusy(false);
    }
  }
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await axios.put(base + "/" + editing, { title });
      setItems((a) => a.map((x) => (x._id === editing ? { ...x, title } : x)));
      setEditing(null);
    } catch (e) {
      setError("Couldn't update this quiz.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminShell
      title={quiz ? "Manage quizzes" : "Manage roadmaps"}
      description={
        quiz
          ? "Keep practice topics fresh and help your learners test their skills."
          : "Organise learning journeys and keep every step up to date."
      }
    >
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
        <SearchBox
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search content"
        />
        <Link
          to={
            quiz
              ? "/dashboard/admin/create-quiz"
              : "/dashboard/admin/createroadmap"
          }
          className={primary}
        >
          Create {quiz ? "quiz" : "roadmap"} +
        </Link>
      </div>
      <Status loading={loading} error={error} />
      <div className="space-y-4">
        {items
          .filter((x) =>
            (x.title + " " + x.category)
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map((x) => (
            <article key={x._id} className={panel}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs text-violet-600">{x.category}</p>
                  <Link
                    className="font-bold"
                    to={(quiz ? "/play/" : "/roadmap/") + x._id}
                  >
                    {x.title || x.category}
                  </Link>
                  <p className="mt-2 text-xs text-slate-400">
                    {(quiz ? x.questions : x.nodes)?.length || 0}{" "}
                    {quiz ? "questions" : "steps"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {quiz ? (
                    <button
                      onClick={() => {
                        setEditing(x._id);
                        setTitle(x.title);
                      }}
                      className="rounded-xl bg-violet-50 p-3 text-violet-600"
                      aria-label={"Edit " + x.title}
                    >
                      <Pencil size={16} />
                    </button>
                  ) : (
                    <Link
                      to={"/dashboard/admin/update/" + x._id}
                      className="rounded-xl bg-violet-50 p-3 text-violet-600"
                      aria-label={"Edit " + x.category}
                    >
                      <Pencil size={16} />
                    </Link>
                  )}
                  <button
                    disabled={busy}
                    onClick={() => remove(x)}
                    className="rounded-xl bg-red-50 p-3 text-red-500"
                    aria-label={"Delete " + (x.title || x.category)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {editing === x._id && (
                <form
                  onSubmit={save}
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                >
                  <label className="flex-1">
                    <span className="sr-only">Quiz title</span>
                    <input
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={field}
                    />
                  </label>
                  <button disabled={busy} className={primary}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-4 text-sm"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </article>
          ))}
      </div>
      {!loading && !items.length && (
        <p className={panel + " text-sm text-slate-500"}>
          Create your first {quiz ? "quiz" : "roadmap"} to get started.
        </p>
      )}
    </AdminShell>
  );
}
