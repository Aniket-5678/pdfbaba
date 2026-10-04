import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminShell from "../AdminShell";
import { field, primary, panel, SearchBox, Status } from "../PageKit";
import { Pencil, Trash2, Plus, Save } from "lucide-react";
const blank = { title: "", category: "", content: "", tags: "" };
export default function NotesWorkspace({ create = false }) {
  const [notes, setNotes] = useState([]),
    [categories, setCategories] = useState([]),
    [form, setForm] = useState(blank),
    [editing, setEditing] = useState(null),
    [open, setOpen] = useState(create),
    [search, setSearch] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    try {
      const [n, c] = await Promise.all([
        axios.get("/api/notes"),
        axios.get("/api/v1/category/get-category"),
      ]);
      setNotes(n.data.notes || []);
      setCategories(c.data.category || []);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't load notes.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    setOpen(create);
    setForm(blank);
    setEditing(null);
    setError("");
    setNotice("");
  }, [create]);
  async function edit(note) {
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.get(
        "/api/notes/" + encodeURIComponent(note.slug),
      );
      setEditing(note._id);
      setForm({ ...data.note, tags: (data.note.tags || []).join(", ") });
      setOpen(true);
    } catch (e) {
      setError("Couldn't load the complete note for editing.");
    } finally {
      setBusy(false);
    }
  }
  async function save(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const body = {
        title: form.title,
        category: form.category,
        content: form.content,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editing) await axios.put("/api/notes/" + editing, body);
      else await axios.post("/api/notes", body);
      setNotice(editing ? "Note updated." : "Note published.");
      setEditing(null);
      setForm(blank);
      setOpen(create);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't save the note.");
    } finally {
      setBusy(false);
    }
  }
  async function remove(note) {
    if (!window.confirm('Delete "' + note.title + '"? This cannot be undone.'))
      return;
    setBusy(true);
    try {
      await axios.delete("/api/notes/" + note._id);
      await load();
      setNotice("Note deleted.");
    } catch (e) {
      setError(e.response?.data?.message || "Couldn't delete the note.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminShell
      title={create ? "Create a study note" : "Manage study notes"}
      description="Write useful explanations, organise them by category, and keep your learning library up to date."
    >
      {error && (
        <p
          role="alert"
          className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="mb-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          {notice}
        </p>
      )}
      {open && (
        <form onSubmit={save} className={panel + " mb-8 space-y-5"}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {editing ? "Edit note" : "A new idea to share"}
            </h2>
            {!create && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-slate-500"
              >
                Cancel
              </button>
            )}
          </div>
          <label className="block text-sm font-semibold">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={field + " mt-2"}
              placeholder="What is this note about?"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Category
              <input
                required
                list="note-categories"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={field + " mt-2"}
                placeholder="Choose or enter a category"
              />
              <datalist id="note-categories">
                {categories.map((c) => (
                  <option key={c._id} value={c.name} />
                ))}
              </datalist>
            </label>
            <label className="block text-sm font-semibold">
              Tags
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={field + " mt-2"}
                placeholder="React, hooks, JavaScript"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Note content
            <textarea
              required
              rows={14}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className={field + " mt-2 font-mono"}
              placeholder="Write your note. HTML headings, paragraphs, lists and code blocks are supported."
            />
          </label>
          <p className="text-xs leading-6 text-slate-500">
            Use &lt;h2&gt; for headings, &lt;p&gt; for paragraphs and
            &lt;pre&gt;&lt;code&gt; for examples. Content is sanitised before
            publication.
          </p>
          <button disabled={busy} className={primary}>
            <Save size={16} />
            {busy ? "Saving..." : editing ? "Save changes" : "Publish note"}
          </button>
        </form>
      )}
      {!create && (
        <>
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row">
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search notes"
              placeholder="Search titles and categories"
            />
            <button
              onClick={() => {
                setForm(blank);
                setEditing(null);
                setOpen(true);
              }}
              className={primary}
            >
              <Plus size={17} />
              New note
            </button>
          </div>
          <Status loading={loading} />
          <div className="space-y-3">
            {notes
              .filter((n) =>
                (n.title + " " + n.category)
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((n) => (
                <article
                  key={n._id}
                  className={
                    panel + " flex flex-wrap items-center justify-between gap-4"
                  }
                >
                  <div className="min-w-0">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      {n.category}
                    </p>
                    <Link
                      to={"/note/" + n.slug}
                      className="text-sm font-bold hover:text-violet-600"
                    >
                      {n.title}
                    </Link>
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        n.updatedAt || n.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={busy}
                      onClick={() => edit(n)}
                      className="flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove(n)}
                      className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
          </div>
          {!loading && !notes.length && (
            <p className={panel + " text-sm text-slate-500"}>
              Your library is ready for its first note.
            </p>
          )}
        </>
      )}
    </AdminShell>
  );
}
