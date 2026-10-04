import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminShell from "../AdminShell";
import { field, primary, panel, Status } from "../PageKit";
import { Folder, Pencil, Trash2 } from "lucide-react";
export default function CreateCategory() {
  const [suggestions, setSuggestions] = useState([]),
    [items, setItems] = useState([]),
    [name, setName] = useState(""),
    [id, setId] = useState(null),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  async function load() {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setItems(data.category || []);
      setSuggestions(data.noteCategories || []);
    } catch (e) {
      setError("Couldn't load categories.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = id
        ? await axios.put("/api/v1/category/update-category/" + id, { name })
        : await axios.post("/api/v1/category/create-category", { name });
      if (!data.success) throw new Error(data.message);
      setName("");
      setId(null);
      setNotice(data.message || "Category saved.");
      await load();
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(c) {
    if (
      !window.confirm(
        'Delete category "' + c.name + '"? Existing notes will be kept.',
      )
    )
      return;
    try {
      await axios.delete("/api/v1/category/delete-category/" + c._id);
      await load();
    } catch (e) {
      setError("Couldn't delete category.");
    }
  }
  return (
    <AdminShell
      title="Categories"
      description="Give your learning library a clear structure. Create, rename and manage categories."
    >
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mb-4 text-sm text-emerald-600">
          {notice}
        </p>
      )}
      <form
        onSubmit={save}
        className={panel + " mb-6 flex flex-col gap-4 sm:flex-row sm:items-end"}
      >
        <label className="flex-1 text-sm font-bold">
          Category name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field + " mt-2"}
            placeholder="e.g. Technology"
          />
        </label>
        <button disabled={busy} className={primary}>
          {busy ? "Saving..." : id ? "Save category" : "Create category"}
        </button>
        {id && (
          <button
            type="button"
            onClick={() => {
              setId(null);
              setName("");
            }}
            className="p-3 text-sm"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">Used in existing notes:</span>
        {suggestions.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => {
              setName(c.name);
              setId(null);
            }}
            className="rounded-full bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600"
          >
            {c.name}
          </button>
        ))}
      </div>
      <Status loading={loading} />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((c) => (
          <div key={c._id} className={panel + " flex items-center gap-4"}>
            <Folder className="text-violet-500" size={24} />
            <span className="flex-1 text-sm font-bold">{c.name}</span>
            <button
              aria-label={"Edit " + c.name}
              onClick={() => {
                setId(c._id);
                setName(c.name);
              }}
              className="rounded-lg bg-violet-50 p-2 text-violet-600"
            >
              <Pencil size={16} />
            </button>
            <button
              aria-label={"Delete " + c.name}
              onClick={() => remove(c)}
              className="rounded-lg bg-red-50 p-2 text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
