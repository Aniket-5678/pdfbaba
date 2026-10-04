import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminShell from "../AdminShell";
import { field, primary, panel, Status } from "../PageKit";
import { Plus, Trash2 } from "lucide-react";
const blank = {
  category: "",
  slug: "",
  level: "beginner",
  description: "",
  nodes: [],
  edges: [],
};
export default function RoadmapEditor({ edit = false }) {
  const { id } = useParams(),
    navigate = useNavigate(),
    [form, setForm] = useState(blank),
    [json, setJson] = useState(""),
    [loading, setLoading] = useState(edit),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [connection, setConnection] = useState({
      source: "",
      target: "",
      label: "",
    });
  useEffect(() => {
    if (!edit) return;
    const c = new AbortController();
    axios
      .get("/api/v1/roadmaps/" + id, { signal: c.signal })
      .then((r) => setForm({ ...blank, ...r.data }))
      .catch((e) => {
        if (e.code !== "ERR_CANCELED") setError("Couldn't load this roadmap.");
      })
      .finally(() => setLoading(false));
    return () => c.abort();
  }, [edit, id]);
  function patch(i, data) {
    setForm((f) => ({
      ...f,
      nodes: f.nodes.map((n, j) => (j === i ? { ...n, ...data } : n)),
    }));
  }
  function parse() {
    try {
      const data = JSON.parse(json);
      if (
        !data.category ||
        !Array.isArray(data.nodes) ||
        data.nodes.some((n) => !n.id || !n.title)
      )
        throw new Error("Include a category and nodes with id and title.");
      setForm({
        ...blank,
        ...data,
        nodes: data.nodes.map((n, i) => ({
          ...n,
          position: n.position || { x: i * 220, y: 0 },
        })),
      });
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!form.nodes.length)
        throw new Error("Add at least one learning step.");
      const body = {
        ...form,
        slug:
          form.slug ||
          form.category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        nodes: form.nodes.map((n, i) => ({
          ...n,
          position: n.position || { x: i * 220, y: 0 },
        })),
      };
      if (edit) await axios.put("/api/v1/roadmaps/" + id, body);
      else await axios.post("/api/v1/roadmaps", body);
      navigate("/dashboard/admin/roadmaplist");
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminShell
      title={edit ? "Edit roadmap" : "Create a roadmap"}
      description="Build a clear learning journey with practical steps and connections."
    >
      <Status loading={loading} error={error} />
      {!loading && (
        <>
          <details className={panel + " mb-6"}>
            <summary className="cursor-pointer text-sm font-bold">
              Import roadmap JSON
            </summary>
            <textarea
              aria-label="Roadmap JSON"
              rows={6}
              className={field + " mt-4 font-mono"}
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder="Paste a roadmap with category, nodes and edges"
            />
            <button onClick={parse} type="button" className={primary + " mt-3"}>
              Apply roadmap
            </button>
          </details>
          <form onSubmit={save} className="space-y-5">
            <div className={panel + " grid gap-5 sm:grid-cols-2"}>
              {["category", "slug"].map((k) => (
                <label key={k} className="text-sm font-bold capitalize">
                  {k}
                  <input
                    required={k === "category"}
                    className={field + " mt-2"}
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  />
                </label>
              ))}
              <label className="text-sm font-bold">
                Level
                <select
                  className={field + " mt-2"}
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  {["beginner", "intermediate", "advanced"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold sm:col-span-2">
                Description
                <textarea
                  rows={3}
                  className={field + " mt-2"}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </label>
            </div>
            {form.nodes.map((n, i) => (
              <fieldset key={n.id} className={panel}>
                <legend className="px-2 text-xs font-bold text-violet-600">
                  Step {i + 1}
                </legend>
                <div className="flex gap-3">
                  <label className="flex-1 text-xs font-bold">
                    Title
                    <input
                      required
                      className={field + " mt-2"}
                      value={n.title}
                      onChange={(e) => patch(i, { title: e.target.value })}
                    />
                  </label>
                  <button
                    type="button"
                    aria-label={"Remove step " + (i + 1)}
                    onClick={() =>
                      setForm({
                        ...form,
                        nodes: form.nodes.filter((_, j) => j !== i),
                        edges: form.edges.filter(
                          (e) => e.source !== n.id && e.target !== n.id,
                        ),
                      })
                    }
                    className="self-end p-3 text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <label className="mt-4 block text-xs font-bold">
                  Explanation
                  <textarea
                    rows={3}
                    className={field + " mt-2"}
                    value={n.description || ""}
                    onChange={(e) => patch(i, { description: e.target.value })}
                  />
                </label>
                <label className="mt-4 block text-xs font-bold">
                  Step type
                  <select
                    className={field + " mt-2"}
                    value={n.type || "normal"}
                    onChange={(e) => patch(i, { type: e.target.value })}
                  >
                    {["start", "normal", "advanced", "optional"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </fieldset>
            ))}
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-violet-100 px-5 py-3 text-sm font-bold text-violet-700"
              onClick={() =>
                setForm({
                  ...form,
                  nodes: [
                    ...form.nodes,
                    {
                      id: "node-" + Date.now(),
                      title: "",
                      description: "",
                      type: "normal",
                      position: { x: form.nodes.length * 220, y: 0 },
                    },
                  ],
                })
              }
            >
              <Plus size={16} />
              Add learning step
            </button>
            <div className={panel}>
              <h2 className="mb-4 font-bold">Connect steps</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {["source", "target"].map((k) => (
                  <label key={k} className="text-xs font-bold capitalize">
                    {k}
                    <select
                      className={field + " mt-2"}
                      value={connection[k]}
                      onChange={(e) =>
                        setConnection({ ...connection, [k]: e.target.value })
                      }
                    >
                      <option value="">Choose a step</option>
                      {form.nodes.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.title || n.id}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <button
                type="button"
                disabled={
                  !connection.source ||
                  !connection.target ||
                  connection.source === connection.target
                }
                onClick={() => {
                  setForm({ ...form, edges: [...form.edges, connection] });
                  setConnection({ source: "", target: "", label: "" });
                }}
                className={primary + " mt-4"}
              >
                Add connection
              </button>
              <ul className="mt-4 space-y-2">
                {form.edges.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs"
                  >
                    <span>
                      {form.nodes.find((n) => n.id === e.source)?.title ||
                        e.source}{" "}
                      →{" "}
                      {form.nodes.find((n) => n.id === e.target)?.title ||
                        e.target}
                    </span>
                    <button
                      type="button"
                      aria-label={"Remove connection " + (i + 1)}
                      onClick={() =>
                        setForm({
                          ...form,
                          edges: form.edges.filter((_, j) => j !== i),
                        })
                      }
                      className="p-2 text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button disabled={busy} className={primary}>
              {busy ? "Saving..." : edit ? "Save roadmap" : "Publish roadmap"}
            </button>
          </form>
        </>
      )}
    </AdminShell>
  );
}
