import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminShell from "../AdminShell";
import { field, panel, primary } from "../PageKit";
import { Code2, Pencil, Plus, Search, Trash2, X } from "lucide-react";

const empty = () => ({ title: "", language: "JavaScript", challengeType: "algorithm", difficulty: "Easy", category: "Coding", description: "", examples: "[]", constraints: "[]", topics: "[]", starterCode: "", functionName: "", testCases: "[]", hints: "[]", solution: "", explanation: "", timeComplexity: "", spaceComplexity: "", published: true });
const toForm = (item) => ({ ...item, examples: JSON.stringify(item.examples || [], null, 2), constraints: JSON.stringify(item.constraints || [], null, 2), topics: JSON.stringify(item.topics || [], null, 2), testCases: JSON.stringify(item.testCases || [], null, 2), hints: JSON.stringify(item.hints || [], null, 2) });
const listFields = ["examples", "constraints", "topics", "testCases", "hints"];

export default function CodingQuestionManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [importJson, setImportJson] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/coding-questions/admin/all?limit=100");
      setItems(response.data.items || []);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not load coding questions.");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { loadItems(); }, [loadItems]);

  const visible = useMemo(() => items.filter((item) => `${item.title} ${item.language} ${item.topics?.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [items, search]);
  function startCreate() { setEditing(null); setForm(empty()); setError(""); setNotice(""); setShowForm(true); }
  function startEdit(item) { setEditing(item._id); setForm(toForm(item)); setError(""); setNotice(""); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function closeForm() { setShowForm(false); setEditing(null); setForm(empty()); }
  function setValue(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  function importQuestion() {
    setError(""); setNotice("");
    try {
      let data = JSON.parse(importJson);
      if (Array.isArray(data)) data = data[0];
      if (data?.question) data = data.question;
      if (data?.questions && Array.isArray(data.questions)) data = data.questions[0];
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Paste one question as a JSON object.");
      const imported = {
        ...data,
        language: data.language || data.programmingLanguage || data.lang,
        difficulty: data.difficulty || data.level,
        description: data.description || data.problemStatement || data.statement,
        topics: data.topics || data.tags,
        starterCode: data.starterCode || data.starter_code || data.boilerplate,
        testCases: data.testCases || data.test_cases || data.tests,
        timeComplexity: data.timeComplexity || data.time_complexity,
        spaceComplexity: data.spaceComplexity || data.space_complexity,
      };
      const difficulty = String(imported.difficulty || "Easy").toLowerCase();
      imported.difficulty = ({ easy: "Easy", medium: "Medium", hard: "Hard" })[difficulty] || imported.difficulty;
      for (const key of ["examples", "testCases"]) {
        if (Array.isArray(imported[key])) imported[key] = imported[key].map((item) => {
          if (Array.isArray(item)) return { input: item[0], [key === "examples" ? "output" : "expectedOutput"]: item[1] };
          if (key === "testCases" && item && item.expectedOutput === undefined) {
            const expectedOutput = item.expected ?? item.output;
            if (expectedOutput !== undefined) return { ...item, expectedOutput };
          }
          return item;
        });
      }
      if (typeof imported.topics === "string") imported.topics = imported.topics.split(",").map((tag) => tag.trim()).filter(Boolean);
      if (typeof imported.constraints === "string") imported.constraints = imported.constraints.split("\n").map((line) => line.trim()).filter(Boolean);
      const next = { ...empty(), ...imported };
      for (const key of listFields) {
        if (imported[key] === undefined) { next[key] = "[]"; continue; }
        if (!Array.isArray(next[key])) throw new Error(`“${key}” must be a JSON array.`);
        next[key] = JSON.stringify(next[key], null, 2);
      }
      if (!next.title || !next.language || !next.description) throw new Error("JSON needs title, language, and description (or problemStatement).");
      setForm(next); setEditing(null); setShowForm(true); setNotice("JSON imported. Review the filled fields, then create the question.");
    } catch (e) { setError(e instanceof SyntaxError ? `Invalid JSON: ${e.message}` : e.message); }
  }

  async function save(e) {
    e.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      const payload = { ...form };
      for (const key of listFields) {
        payload[key] = JSON.parse(form[key] || "[]");
        if (!Array.isArray(payload[key])) throw new Error(`${key} must be a JSON array.`);
      }
      if (editing) await axios.put(`/api/v1/coding-questions/${editing}`, payload);
      else await axios.post("/api/v1/coding-questions", payload);
      setNotice(editing ? "Question updated." : "Question created.");
      closeForm(); await loadItems();
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Could not save this question.");
    } finally { setBusy(false); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    setBusy(true); setError("");
    try { await axios.delete(`/api/v1/coding-questions/${item._id}`); setItems((current) => current.filter((x) => x._id !== item._id)); setNotice("Question deleted."); }
    catch (e) { setError(e.response?.data?.message || "Could not delete this question."); }
    finally { setBusy(false); }
  }

  const textArea = (key, label, rows = 4, hint = "") => <label className="block text-xs font-semibold text-slate-600">{label}{hint && <span className="mt-1 block font-normal text-slate-400">{hint}</span>}<textarea className={field + " mt-2 font-mono text-xs"} rows={rows} value={form[key] || ""} onChange={(e) => setValue(key, e.target.value)} /></label>;
  const input = (key, label, props = {}) => <label className="block text-xs font-semibold text-slate-600">{label}<input className={field + " mt-2"} value={form[key] || ""} onChange={(e) => setValue(key, e.target.value)} {...props} /></label>;

  return <AdminShell title="Coding question library" description="Create and manage challenges for JavaScript, HTML, CSS, Python, Java, C++, and any language your learners use.">
    {notice && <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
    {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400"><Search size={16}/><input className="w-full text-sm text-slate-800 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, language, or topic"/></label>
      <button type="button" onClick={startCreate} className={primary}><Plus size={16}/> New challenge</button>
    </div>

    <details className={panel + " mb-6"}>
      <summary className="cursor-pointer text-sm font-bold text-slate-800">Paste a question JSON to fill the form</summary>
      <p className="mt-3 text-xs leading-5 text-slate-500">Paste one JSON object, or an array containing a question. Supported aliases include <code>lang</code>, <code>level</code>, <code>problemStatement</code>, <code>tags</code>, and <code>test_cases</code>.</p>
      <textarea aria-label="Question JSON import" rows={12} className={field + " mt-3 font-mono text-xs"} value={importJson} onChange={(e) => setImportJson(e.target.value)} placeholder={'{\n  "title": "Two Sum",\n  "language": "JavaScript",\n  "difficulty": "Easy",\n  "description": "Return the indices of two values that add up to the target.",\n  "topics": ["Arrays", "Hash map"],\n  "examples": [{"input": "[2, 7], target = 9", "output": "[0, 1]"}],\n  "testCases": [{"input": [[2, 7], 9], "expectedOutput": [0, 1]}],\n  "starterCode": "function twoSum(nums, target) {\\n  // your code\\n}",\n  "functionName": "twoSum",\n  "hints": ["Use a map."],\n  "solution": "..."\n}'} />
      <button type="button" onClick={importQuestion} className={primary + " mt-3"}>Fill form from JSON</button>
    </details>

    {showForm && <form onSubmit={save} className={panel + " mb-6 space-y-5 border-violet-200"}>
      <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold">{editing ? "Edit challenge" : "Create challenge"}</h2><p className="mt-1 text-xs text-slate-500">Use any language name. Test case values can be JSON values or strings.</p></div><button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" onClick={closeForm} aria-label="Close form"><X size={18}/></button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{input("title", "Challenge title", { required: true, maxLength: 160 })}{input("language", "Programming language", { required: true, placeholder: "e.g. HTML, CSS, Python" })}
        <label className="text-xs font-semibold text-slate-600">Difficulty<select className={field + " mt-2"} value={form.difficulty} onChange={(e) => setValue("difficulty", e.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
        <label className="text-xs font-semibold text-slate-600">Challenge format<select className={field + " mt-2"} value={form.challengeType} onChange={(e) => setValue("challengeType", e.target.value)}><option value="algorithm">Algorithm / function</option><option value="frontend">HTML / CSS / frontend</option><option value="output">Predict the output</option><option value="multiple-choice">Multiple choice</option></select></label>
        {input("category", "Category", { placeholder: "Coding, Interview, React…" })}{input("functionName", "Function name (optional)", { placeholder: "e.g. twoSum" })}
      </div>
      {textArea("description", "Problem description", 5, "Supports plain text; put examples and constraints in their fields below.")}
      <div className="grid gap-4 lg:grid-cols-2">{textArea("examples", "Examples (JSON array)", 6, '[{"input":"…","output":"…","explanation":"…"}]')}{textArea("constraints", "Constraints (JSON array)", 6, '["1 ≤ input length ≤ 1000"]')}{textArea("topics", "Topic tags (JSON array)", 4, '["Arrays", "Strings", "DOM"]')}{textArea("testCases", "Test cases (JSON array)", 6, '[{"input":[[2,7],9],"expectedOutput":[0,1],"hidden":false}]')}
      </div>
      {textArea("starterCode", "Starter code", 8, "HTML/CSS tasks can include a complete starter document.")}
      <div className="grid gap-4 lg:grid-cols-2">{textArea("hints", "Progressive hints (JSON array)", 5, '["Hint one", "Hint two"]')}{textArea("solution", "Optimized solution", 8)}{textArea("explanation", "Step-by-step explanation", 6)}
      </div><div className="grid gap-4 sm:grid-cols-2">{input("timeComplexity", "Time complexity", { placeholder: "O(n)" })}{input("spaceComplexity", "Space complexity", { placeholder: "O(1)" })}</div>
      <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={Boolean(form.published)} onChange={(e) => setValue("published", e.target.checked)}/> Published and visible to learners</label>
      <div className="flex flex-wrap gap-3"><button disabled={busy} className={primary}>{busy ? "Saving…" : editing ? "Save changes" : "Create challenge"}</button><button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600">Cancel</button></div>
    </form>}

    <div className="space-y-3">{loading ? <p className={panel + " text-sm text-slate-500"}>Loading challenges…</p> : visible.map((item) => <article key={item._id} className={panel + " flex flex-wrap items-center justify-between gap-4"}>
      <div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-700">{item.language}</span><span className="text-[10px] text-slate-400">{item.difficulty}</span><span className={`rounded-md px-2 py-1 text-[10px] ${item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{item.published ? "Published" : "Draft"}</span></div><h3 className="truncate font-bold text-slate-900">{item.title}</h3><p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.description}</p><div className="mt-2 flex flex-wrap gap-1.5">{(item.topics || []).map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[9px] text-slate-600">{tag}</span>)}</div></div>
      <div className="flex gap-2"><button type="button" onClick={() => startEdit(item)} className="rounded-xl bg-violet-50 p-3 text-violet-600" aria-label={`Edit ${item.title}`}><Pencil size={16}/></button><button type="button" disabled={busy} onClick={() => remove(item)} className="rounded-xl bg-red-50 p-3 text-red-500 disabled:opacity-50" aria-label={`Delete ${item.title}`}><Trash2 size={16}/></button></div>
    </article>)}
    {!loading && visible.length === 0 && <div className={panel + " py-10 text-center text-sm text-slate-500"}><Code2 className="mx-auto mb-3 text-violet-400" size={24}/>{items.length ? "No challenges match your search." : "No coding challenges yet. Create your first one above."}</div>}</div>
  </AdminShell>;
}
