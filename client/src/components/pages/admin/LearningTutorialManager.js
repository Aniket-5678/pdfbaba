import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ExternalLink, Pencil, Plus, Trash2, X } from "lucide-react";
import { useAuth } from "../../context/auth";
import AdminShell from "../AdminShell";
import { panel } from "../PageKit";

const empty = { language: "", title: "", description: "", channelName: "", channelUrl: "" };
const fields = [
  ["language", "Programming language", "e.g. Python"],
  ["title", "Tutorial title", "e.g. Python for beginners"],
  ["description", "Description", "What will the learner find in this guide?"],
  ["channelName", "YouTube channel name", "e.g. Code with Harry"],
  ["channelUrl", "YouTube channel URL", "https://www.youtube.com/@channel"],
];

export default function LearningTutorialManager() {
  const [auth] = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const { data } = await axios.get("/api/v1/learning-tutorials");
      setTutorials(data);
    } catch {
      toast.error("Could not load learning guides");
    }
  }
  useEffect(() => { load(); }, []);

  function reset() { setForm(empty); setEditing(""); }
  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const config = { headers: { Authorization: auth.token } };
    try {
      if (editing) await axios.put(`/api/v1/learning-tutorials/${editing}`, form, config);
      else await axios.post("/api/v1/learning-tutorials", form, config);
      toast.success(editing ? "Guide updated" : "Guide added");
      reset();
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save guide");
    } finally { setSaving(false); }
  }
  function edit(item) {
    setEditing(item._id);
    setForm(Object.fromEntries(Object.keys(empty).map((key) => [key, item[key] || ""])));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function remove(item) {
    if (!window.confirm(`Delete the ${item.language} guide “${item.title}”?`)) return;
    try {
      await axios.delete(`/api/v1/learning-tutorials/${item._id}`, { headers: { Authorization: auth.token } });
      toast.success("Guide deleted");
      if (editing === item._id) reset();
      await load();
    } catch { toast.error("Could not delete guide"); }
  }

  return <AdminShell title="Learning Hub" description="Add and manage the YouTube learning guides available to everyone.">
    <form onSubmit={submit} className={panel + " mb-8 grid gap-5 sm:grid-cols-2"}>
      <div className="sm:col-span-2 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">{editing ? "Update a guide" : "Add a guide"}</h2>{editing && <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><X size={15} /> Cancel edit</button>}</div>
      {fields.map(([key, label, placeholder]) => <label key={key} className={key === "description" ? "sm:col-span-2" : ""}><span className="mb-2 block text-xs font-bold text-slate-700">{label}</span>{key === "description" ? <textarea required maxLength={1200} rows={4} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-400" /> : <input required maxLength={key === "title" ? 160 : 120} type={key === "channelUrl" ? "url" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-400" />}</label>)}
      <div className="sm:col-span-2"><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-60">{editing ? <Pencil size={16} /> : <Plus size={17} />}{saving ? "Saving…" : editing ? "Save changes" : "Add guide"}</button></div>
    </form>
    <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Published guides</h2><span className="text-xs text-slate-500">{tutorials.length} total</span></div>
    <div className="grid gap-3">{tutorials.map((item) => <article key={item._id} className={panel + " flex flex-col gap-4 sm:flex-row sm:items-center"}><div className="min-w-0 flex-1"><span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-700">{item.language}</span><h3 className="mt-1 font-bold text-slate-900">{item.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.description}</p><a href={item.channelUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-violet-700">{item.channelName}<ExternalLink size={12} /></a></div><div className="flex gap-2"><button onClick={() => edit(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-violet-50"><Pencil size={14} /> Edit</button><button onClick={() => remove(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-100 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={14} /> Delete</button></div></article>)}</div>
    {!tutorials.length && <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No guides added yet. Use the form above to publish the first one.</p>}
  </AdminShell>;
}
