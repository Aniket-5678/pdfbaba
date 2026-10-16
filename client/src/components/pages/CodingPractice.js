import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bookmark, Braces, Check, ChevronDown, CircleHelp, Code2, Command, Flame, Layers, Lightbulb, ListFilter, Play, Search, Send, Sparkles, Terminal, X } from "lucide-react";
import "./CodingPractice.css";
import "./CodingPracticeContent.css";

const problems = [
  { id: "two-sum", title: "Two Sum", difficulty: "Easy", topic: "Arrays", acceptance: "48.2%", description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.", examples: [["nums = [2, 7, 11, 15], target = 9", "[0, 1]"], ["nums = [3, 2, 4], target = 6", "[1, 2]"]], constraints: ["2 ≤ nums.length ≤ 10⁴", "−10⁹ ≤ nums[i] ≤ 10⁹", "Exactly one valid answer exists."], tags: ["Array", "Hash map"], starter: "function twoSum(nums, target) {\n  // Write your solution here\n  \n}\n", hints: ["A brute-force solution checks every pair. Can you avoid revisiting numbers?", "Store each number's index as you scan. For each value, look for target - value."], solution: "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) return [seen.get(complement), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}", complexity: "Time O(n) · Space O(n)", tests: [[[[2, 7, 11, 15], 9], "[0,1]"], [[[3, 2, 4], 6], "[1,2]"]] },
  { id: "valid-anagram", title: "Valid Anagram", difficulty: "Easy", topic: "Strings", acceptance: "62.4%", description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.", examples: [["s = 'anagram', t = 'nagaram'", "true"], ["s = 'rat', t = 'car'", "false"]], constraints: ["1 ≤ s.length, t.length ≤ 5 × 10⁴", "s and t consist of lowercase English letters."], tags: ["String", "Hash map"], starter: "function isAnagram(s, t) {\n  // Write your solution here\n  \n}\n", hints: ["Anagrams have the same character counts.", "Count each character in s, then subtract counts as you scan t."], solution: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = new Map();\n  for (const char of s) count.set(char, (count.get(char) || 0) + 1);\n  for (const char of t) {\n    if (!count.has(char)) return false;\n    count.set(char, count.get(char) - 1);\n    if (count.get(char) < 0) return false;\n  }\n  return true;\n}", complexity: "Time O(n) · Space O(k)", tests: [[ ["anagram", "nagaram"], "true"], [["rat", "car"], "false"]] },
  { id: "max-subarray", title: "Maximum Subarray", difficulty: "Medium", topic: "Algorithms", acceptance: "51.7%", description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.", examples: [["nums = [-2,1,-3,4,-1,2,1,-5,4]", "6"], ["nums = [1]", "1"]], constraints: ["1 ≤ nums.length ≤ 10⁵", "−10⁴ ≤ nums[i] ≤ 10⁴"], tags: ["Array", "Dynamic programming"], starter: "function maxSubArray(nums) {\n  // Write your solution here\n  \n}\n", hints: ["At each position, decide whether to extend the current run or start fresh.", "Keep a running sum and a best sum. Reset the run when it becomes worse than starting here."], solution: "function maxSubArray(nums) {\n  let current = nums[0], best = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    best = Math.max(best, current);\n  }\n  return best;\n}", complexity: "Time O(n) · Space O(1)", tests: [[[-2,1,-3,4,-1,2,1,-5,4], "6"], [[1], "1"]] },
  { id: "group-by", title: "Group by Property", difficulty: "Medium", topic: "Objects", acceptance: "73.1%", description: "Write a function that groups an array of objects by the value returned from a key selector.", examples: [["groupBy([{n:'a'}, {n:'b'}, {n:'a'}], x => x.n)", "{ a: [{n:'a'}, {n:'a'}], b: [{n:'b'}] }"]], constraints: ["The input array may be empty.", "Preserve the original order within each group."], tags: ["Objects", "Functions"], starter: "function groupBy(items, keySelector) {\n  // Write your solution here\n  \n}\n", hints: ["Build a result object as you visit each item.", "Create a new array the first time you encounter a key, then push into it."], solution: "function groupBy(items, keySelector) {\n  return items.reduce((groups, item) => {\n    const key = keySelector(item);\n    (groups[key] ||= []).push(item);\n    return groups;\n  }, {});\n}", complexity: "Time O(n) · Space O(n)", tests: [] },
  { id: "debounce", title: "Implement Debounce", difficulty: "Hard", topic: "Functions", acceptance: "39.8%", description: "Return a debounced version of fn that delays invoking it until wait milliseconds have elapsed since the last call.", examples: [["debounce(search, 300)", "Calls search once, 300ms after the final invocation"]], constraints: ["Preserve the calling context and arguments.", "Return the timeout handle's result only when the function runs."], tags: ["Functions", "Async"], starter: "function debounce(fn, wait) {\n  // Return a debounced function\n  \n}\n", hints: ["Keep a timer between invocations.", "Clear the previous timer, then schedule fn with the latest context and arguments."], solution: "function debounce(fn, wait) {\n  let timer;\n  return function (...args) {\n    const context = this;\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(context, args), wait);\n  };\n}", complexity: "Time O(1) per call · Space O(1)" },
  { id: "flatten", title: "Flatten Nested Array", difficulty: "Hard", topic: "Algorithms", acceptance: "44.6%", description: "Flatten a deeply nested array of integers into a single-level array without using Array.flat().", examples: [["[1, [2, [3, 4]], 5]", "[1, 2, 3, 4, 5]"]], constraints: ["The array may be nested to any depth.", "Preserve element order."], tags: ["Array", "Recursion"], starter: "function flattenArray(items) {\n  // Write your solution here\n  \n}\n", hints: ["Recursion can handle each nested array in the same way.", "Visit each item; recurse if it is an array, otherwise append it to the result."], solution: "function flattenArray(items) {\n  const result = [];\n  for (const item of items) {\n    if (Array.isArray(item)) result.push(...flattenArray(item));\n    else result.push(item);\n  }\n  return result;\n}", complexity: "Time O(n) · Space O(d)" },
];
const difficulties = ["All levels", "Easy", "Medium", "Hard"];
const topicLearningNotes = {
  arrays: "Practise scanning, indexing, counting and choosing when to keep or reset a running result.",
  strings: "Work with character counts, comparisons and the order of text while keeping edge cases in view.",
  algorithms: "Compare possible strategies, trace their behavior and reason about time and extra space.",
  objects: "Group and look up related values, and decide how a function should shape its result.",
  functions: "Reason about inputs, return values, scope and delayed work such as timers.",
};
function topicLearningNote(topic) {
  const key = String(topic || "").toLowerCase();
  return topicLearningNotes[key] || `Use the examples and constraints in ${topic} challenges to identify the key idea, test a boundary case and explain why your approach works.`;
}

function fromApi(question) {
  return {
    ...question,
    id: question._id,
    topic: question.topics?.[0] || question.category || question.language,
    tags: question.topics || [],
    acceptance: "New",
    examples: (question.examples || []).map((example) => [example.input || "—", example.output || ""]),
    starter: question.starterCode || "",
    hints: question.hints || [],
    solution: question.solution || "",
    complexity: [question.timeComplexity, question.spaceComplexity].filter(Boolean).join(" · "),
    tests: (question.testCases || []).map((test) => [Array.isArray(test.input) ? test.input : test.input === null ? [] : [test.input], JSON.stringify(test.expectedOutput)]),
  };
}
function makePreview(language, code, hasRun = false) {
  const policy = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; font-src data:;">';
  const safeCss = code.replace(/<\/style/gi, "<\\/style");
  if (!hasRun || !code.trim()) return `<!doctype html><html><head>${policy}<style>body{font:14px sans-serif;color:#879189;padding:18px;background:#f8faf7}</style></head><body>Write your solution, then select Run preview.</body></html>`;
  return language.toLowerCase() === "css"
    ? `<!doctype html><html><head>${policy}<style>${safeCss}</style></head><body><main class="preview-card"><h1>CSS preview</h1><p>Update your styles and run preview.</p><button>Try it</button></main></body></html>`
    : `<!doctype html><html><head>${policy}</head><body>${code}</body></html>`;
}

function checkFrontendTask(question, code) {
  const document = new DOMParser().parseFromString(code, "text/html");
  const checks = [];
  const constraints = [question.description, ...(question.constraints || [])].filter(Boolean);
  const used = new Set();
  for (const requirement of constraints) {
    const tagText = requirement.match(/(?:use|include|add|create|contain\w*)\s+(?:an?\s+)?(?:<([a-z][\w-]*)>|([a-z][\w-]*))\s+(?:element\s+)?(?:containing|with\s+the\s+text)\s+["']?([^"'.]+)["']?/i);
    const classMatch = requirement.match(/(?:class|className)\s+["'`.]?([\w-]+)/i);
    const tagOnly = requirement.match(/(?:use|include|add|create|contain\w*)\s+(?:an?\s+)?<?([a-z][\w-]*)>?\s+element/i);
    if (tagText) {
      const rawTag = (tagText[1] || tagText[2]).toLowerCase();
      const tag = rawTag === "paragraph" ? "p" : rawTag === "heading" ? "h1,h2,h3,h4,h5,h6" : rawTag;
      const expected = tagText[3].trim();
      const key = `${tag}:${expected.toLowerCase()}`;
      if (!used.has(key)) {
        used.add(key);
        const found = [...document.querySelectorAll(tag)].some((node) => node.textContent.toLowerCase().includes(expected.toLowerCase()));
        checks.push({ passed: found, label: `<${tag}> contains “${expected}”` });
      }
    } else if (classMatch && !used.has(`class:${classMatch[1]}`)) {
      used.add(`class:${classMatch[1]}`);
      checks.push({ passed: Boolean(document.querySelector(`.${classMatch[1]}`)), label: `Element uses class “${classMatch[1]}”` });
    } else if (tagOnly && !used.has(`tag:${tagOnly[1]}`)) {
      used.add(`tag:${tagOnly[1]}`);
      checks.push({ passed: Boolean(document.querySelector(tagOnly[1])), label: `Includes <${tagOnly[1]}> element` });
    }
  }
  for (const test of question.testCases || []) {
    const rule = test.input;
    if (!rule || typeof rule !== "object" || Array.isArray(rule) || !rule.selector) continue;
    let found = false;
    try {
      const element = document.querySelector(rule.selector);
      found = Boolean(element);
      if (found && rule.text !== undefined) found = element.textContent.includes(String(rule.text));
      if (found && rule.className) found = element.classList.contains(rule.className);
      if (found && rule.attribute) found = element.getAttribute(rule.attribute) === String(rule.value ?? "");
    } catch { found = false; }
    checks.push({ passed: found === (test.expectedOutput !== false), label: rule.label || `Check ${rule.selector}` });
  }
  if (!checks.length) return { passed: false, message: "This frontend task has no checkable requirements yet. Add constraints such as “Include an h2 element containing My title” or selector test cases." , results: [] };
  const passed = checks.filter((check) => check.passed).length;
  return { passed: passed === checks.length, message: passed === checks.length ? `All ${checks.length} checks passed. Task complete!` : `${passed} of ${checks.length} checks passed. Keep going.`, results: checks };
}
export default function CodingPractice() {
  const [selectedId, setSelectedId] = useState(problems[0].id);
  const [challengeList, setChallengeList] = useState(problems);
  const [filter, setFilter] = useState("All levels");
  const [topic, setTopic] = useState("All topics");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [code, setCode] = useState(problems[0].starter);
  const [previewCode, setPreviewCode] = useState(null);
  const [tab, setTab] = useState("Description");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [hint, setHint] = useState(0);
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("coding-bookmarks") || "[]"));
  const [solved, setSolved] = useState(() => JSON.parse(localStorage.getItem("coding-solved") || "[]"));
  const [notice, setNotice] = useState("");
  const [solutionText, setSolutionText] = useState("");
  const [interview, setInterview] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  useEffect(() => {
    let alive = true;
    axios.get("/api/v1/coding-questions?limit=100").then((response) => {
      const list = (response.data.items || []).map(fromApi);
      if (alive) { setChallengeList(list); if (list.length) { setSelectedId(list[0].id); setCode(list[0].starter); } else { setSelectedId(""); } }
    }).catch(() => {}).finally(() => { if (alive) setLoadingQuestions(false); });
    return () => { alive = false; };
  }, []);
  const active = challengeList.find((item) => item.id === selectedId) || challengeList[0];
  const topics = ["All topics", ...new Set(challengeList.map((item) => item.topic).filter(Boolean))];
  const languages = [...new Set(challengeList.map((item) => item.language || "JavaScript"))];
  const filtered = useMemo(() => challengeList.filter((item) => (filter === "All levels" || item.difficulty === filter) && (topic === "All topics" || item.topic === topic) && `${item.title} ${item.language || ""}`.toLowerCase().includes(query.toLowerCase())), [challengeList, filter, topic, query]);
  const pageCount = Math.ceil(filtered.length / 5);
  const visible = filtered.slice((page - 1) * 5, page * 5);
  function selectProblem(problem) { setSelectedId(problem.id); setCode(problem.starter); setPreviewCode(null); setResult(null); setTab("Description"); setHint(0); setNotice(""); setSolutionText(problem.solution || ""); }
  async function loadSolution() { if (solutionText || !/^[a-f\d]{24}$/i.test(active.id)) return; try { const { data } = await axios.get(`/api/v1/coding-questions/${active.id}/solution`); setSolutionText([data.solution, data.explanation, data.timeComplexity && `Time: ${data.timeComplexity}`, data.spaceComplexity && `Space: ${data.spaceComplexity}`].filter(Boolean).join("\n\n")); } catch {} }
  function toggleSaved(id) { const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]; setSaved(next); localStorage.setItem("coding-bookmarks", JSON.stringify(next)); }
  async function execute(submit = false) {
    if (active.challengeType === "frontend") {
      if (!submit) { setPreviewCode(code); setResult(null); return; }
      const checked = checkFrontendTask(active, code);
      setResult({ ...checked, passed: checked.results.filter((item) => item.passed).length, total: checked.results.length, failed: !checked.passed });
      if (checked.passed) {
        const next = [...new Set([...solved, active.id])];
        setSolved(next); localStorage.setItem("coding-solved", JSON.stringify(next));
        setNotice("Task completed and added to your progress.");
      }
      return;
    }
    if (!/^[a-f\d]{24}$/i.test(active.id)) { setResult({ message: "This sample is a preview. Published challenges run through the Judge0 sandbox.", passed: 0, total: 0, failed: true }); return; }
    setRunning(true); setResult(null); setNotice("");
    try {
      const { data } = await axios.post(`/api/v1/coding-questions/${active.id}/execute`, { sourceCode: code, submit });
      const run = { ...data, results: data.results.map((item) => ({ ...item, expected: String(item.expected), actual: String(item.actual) })) };
      setResult(run);
      if (submit && run.total > 0 && run.passed === run.total) {
        const next = [...new Set([...solved, active.id])]; setSolved(next); localStorage.setItem("coding-solved", JSON.stringify(next)); setNotice("Accepted — problem added to your progress.");
      } else if (submit) setNotice("Submission checked against the configured test cases.");
    } catch (e) { setResult({ message: e.response?.data?.message || "Code execution provider is unavailable.", passed: 0, total: 0, failed: true }); }
    finally { setRunning(false); }
  }

  if (!active && !loadingQuestions) return <main className="cp-page"><header className="cp-topbar"><Link to="/" className="cp-brand"><span className="cp-brand-mark"><Braces size={20}/></span>codebricket<span className="cp-brand-practice">/ practice</span></Link></header><section className="cp-overview"><div className="cp-overview-copy"><div className="cp-eyebrow"><Code2 size={14}/> PRACTICE LIBRARY</div><h1>Challenges are<br/><em>on the way.</em></h1><p>There are no published challenges yet. Check back soon for practice in more languages.</p></div></section></main>;

  return <main className="cp-page">
    <header className="cp-topbar"><Link to="/" className="cp-brand"><span className="cp-brand-mark"><Braces size={20}/></span>codebricket<span className="cp-brand-practice">/ practice</span></Link><div className="cp-top-links"><a href="#challenges">Challenges</a><a href="#interview" onClick={(e) => { e.preventDefault(); setInterview(true); }}>Interview prep</a></div><div className="cp-top-right"><span><Flame size={15}/> Daily practice</span><Link to="/dashboard/user" className="cp-avatar">U</Link></div></header>
    <section className="cp-overview"><div className="cp-overview-copy"><div className="cp-eyebrow"><Sparkles size={14}/> YOUR PRACTICE SPACE</div><h1>Build the habit.<br/><em>Become the developer.</em></h1><p>Practice JavaScript, HTML, CSS, Python, Java and more. Pick a challenge and get started.</p></div><div className="cp-stats"><div className="cp-stat"><span className="cp-stat-icon orange"><Code2 size={16}/></span><small>Problems solved</small><strong>{solved.length}<i> / {challengeList.length}</i></strong><div className="cp-progress"><span style={{width: `${solved.length / challengeList.length * 100}%`}}/></div></div><div className="cp-stat"><span className="cp-stat-icon green"><Flame size={16}/></span><small>Current streak</small><strong>— <i>days</i></strong><div className="cp-week">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <b key={i}>{d}</b>)}</div></div></div></section>
    <div className="cp-workspace" id="challenges"><aside className="cp-list-panel"><div className="cp-list-heading"><div><span className="cp-eyebrow">THE LIBRARY</span><h2>Challenges <span>{challengeList.length}</span></h2></div><button className="cp-square" title="Filters"><ListFilter size={16}/></button></div><label className="cp-search"><Search size={16}/><input value={query} onChange={(e) => {setQuery(e.target.value); setPage(1);}} placeholder="Search challenges or language"/><kbd>⌘ K</kbd></label><div className="cp-filter-row">{difficulties.map((d) => <button key={d} onClick={() => {setFilter(d); setPage(1);}} className={filter === d ? "active" : ""}>{d}</button>)}</div><label className="cp-select"><span>Topic</span><select value={topic} onChange={(e) => {setTopic(e.target.value); setPage(1);}}>{topics.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={14}/></label><div className="cp-list-label"><span>PROBLEM</span><span>LEVEL</span></div><div className="cp-problem-list">{visible.map((problem, i) => <button className={`cp-problem ${problem.id === active.id ? "selected" : ""}`} key={problem.id} onClick={() => selectProblem(problem)}><span className={`cp-problem-status ${solved.includes(problem.id) ? "is-solved" : ""}`}>{solved.includes(problem.id) ? <Check size={12}/> : String((page - 1) * 5 + i + 1).padStart(2, "0")}</span><span className="cp-problem-meta"><strong>{problem.title}</strong><small>{problem.language || "JavaScript"} · {problem.topic}</small></span><span className={`cp-difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></button>)}{!visible.length && <div className="cp-empty">{loadingQuestions ? "Loading challenges…" : "No challenges match. Try another search."}</div>}</div><div className="cp-pagination"><span>{filtered.length ? `${(page - 1) * 5 + 1}–${Math.min(page * 5, filtered.length)} of ${filtered.length}` : "0 results"}</span><button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page"><ArrowLeft size={14}/></button><button disabled={page >= pageCount} onClick={() => setPage(page + 1)} aria-label="Next page"><ArrowRight size={14}/></button></div><div className="cp-list-footer"><span className="cp-online"/> New challenges added weekly</div></aside>
    <section className="cp-detail-panel"><div className="cp-detail-top"><div className="cp-breadcrumb">Challenges <span>/</span> {active.topic} <span>/</span> <b>{active.title}</b></div><button className={`cp-save ${saved.includes(active.id) ? "saved" : ""}`} onClick={() => toggleSaved(active.id)}><Bookmark size={15} fill={saved.includes(active.id) ? "currentColor" : "none"}/> {saved.includes(active.id) ? "Saved" : "Save"}</button></div><div className="cp-problem-content"><div className="cp-problem-title-row"><div><div className="cp-title-label">{active.language || "JavaScript"} <span>·</span> {String(challengeList.indexOf(active) + 1).padStart(2, "0")}</div><h2>{active.title}</h2></div><span className={`cp-difficulty ${active.difficulty.toLowerCase()}`}>{active.difficulty}</span></div><div className="cp-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}<span className="cp-acceptance">{active.challengeType || "Algorithm"}</span></div><p className="cp-description">{active.description}</p><div className="cp-examples">{active.examples.map(([input, output], i) => <div className="cp-example" key={input}><h4>Example {i + 1}</h4><div><b>Input</b><code>{input}</code></div><div><b>Output</b><code>{output}</code></div></div>)}</div><h3 className="cp-section-title">Constraints</h3><ul className="cp-constraints">{active.constraints.map((item) => <li key={item}>{item}</li>)}</ul><div className="cp-help-card"><span><Lightbulb size={17}/></span><div><b>Need a nudge?</b><p>Get a small hint, one step at a time.</p></div><button onClick={() => {setTab("Hints & solution"); setHint(Math.min(hint + 1, active.hints.length));}}>{hint ? "Next hint" : "Show hint"} <ArrowRight size={14}/></button></div></div></section>
    <section className="cp-editor-panel"><div className="cp-editor-head"><div><span className="cp-editor-dot"/><b>Solution</b><span className="cp-lang">{active.language || "JavaScript"} <ChevronDown size={12}/></span></div><button className="cp-editor-menu" aria-label="Editor options"><Command size={15}/></button></div><div className="cp-code-area"><div className="cp-line-numbers">{code.split("\n").map((_, i) => <span key={i}>{i + 1}</span>)}</div><textarea aria-label={`${active.language || "JavaScript"} solution editor`} spellCheck="false" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => {if (e.key === "Tab") {e.preventDefault(); const s=e.currentTarget.selectionStart; const v=code.slice(0,s)+"  "+code.slice(e.currentTarget.selectionEnd);setCode(v);requestAnimationFrame(()=>{e.currentTarget.selectionStart=e.currentTarget.selectionEnd=s+2;});}}}/></div><div className="cp-editor-foot"><span><span className="cp-online"/> Ready</span><span>{active.language || "JavaScript"}</span></div><div className={`cp-result ${active.challengeType === "frontend" ? "cp-front-result" : ""}`}><div className="cp-result-tabs"><button className="active"><Terminal size={14}/> {active.challengeType === "frontend" ? "Live preview" : "Test results"} {result && active.challengeType !== "frontend" && <span className="cp-result-count">{result.passed}/{result.total}</span>}</button><button onClick={() => setTab(tab === "Hints & solution" ? "Description" : "Hints & solution")}><CircleHelp size={14}/> Hints & solution</button></div>{active.challengeType === "frontend" ? <><iframe className="cp-preview" style={{ width: "100%", height: 140, border: 0, background: "#fff" }} title="Safe HTML and CSS preview" sandbox="" srcDoc={makePreview(active.language || "HTML", previewCode || "", previewCode !== null)}/>{result && <div className={`cp-result-state ${result.failed ? "error" : "success"}`}><strong>{result.message}</strong>{result.results?.map((item, index) => <small key={index}>{item.passed ? "✓ Passed: " : "✕ Needs work: "}{item.label}</small>)}{notice && <small>{notice}</small>}</div>}</> : result ? <div className={`cp-result-state ${result.failed ? "error" : result.passed === result.total ? "success" : ""}`}><strong>{result.message || (result.passed === result.total ? "All test cases passed" : "Some test cases failed")}</strong>{result.results?.map((r, i) => <small key={i}>Case {i + 1}: {r.passed ? "Passed" : r.hidden ? "Hidden test failed" : `Expected ${r.expected}, received ${r.actual}`}</small>)}{notice && <small>{notice}</small>}</div> : tab === "Hints & solution" ? <div className="cp-hint-content">{hint ? <><span>HINT {Math.min(hint, active.hints.length)} OF {active.hints.length}</span><p>{active.hints[Math.min(hint, active.hints.length) - 1]}</p>{hint >= active.hints.length && <details onToggle={(e) => { if (e.currentTarget.open) loadSolution(); }}><summary>View optimized solution</summary><pre>{solutionText || active.solution}<br/><br/>{active.complexity}</pre></details>}</> : <><span>STUCK? THAT'S OK.</span><p>Open a progressive hint when you need a little direction.</p><button onClick={() => setHint(1)}><Lightbulb size={14}/> Reveal first hint</button></>}</div> : <div className="cp-result-empty"><span><Terminal size={15}/></span><div><b>Your output will appear here</b><small>Run your code to check the sample cases.</small></div></div>}</div><div className="cp-run-actions"><button className="cp-run" onClick={() => execute(false)} disabled={running}><Play size={14} fill="currentColor"/>{active.challengeType === "frontend" ? "Run preview" : running ? "Running…" : "Run code"}</button><button className="cp-submit" onClick={() => execute(true)} disabled={running}><Send size={14}/>{active.challengeType === "frontend" ? "Check task" : running ? "Checking…" : "Submit solution"}</button></div><div className="cp-safety-note"><span><Sparkles size={13}/></span>{active.challengeType === "frontend" ? "Preview runs in a restricted iframe; scripts and network are disabled." : "Code runs in the Judge0 sandbox."}</div></section></div>
    <footer className="cp-footer"><span>Made for the long game. <b>One problem at a time.</b></span><span>{languages.join(" · ") || "JavaScript"} practice <span>·</span> Interview ready</span></footer>
    <section className="cp-topic-map" aria-labelledby="cp-topic-map-title"><div className="cp-topic-map-heading"><div><span className="cp-guide-kicker"><Layers size={14}/> INSIDE THE PRACTICE LIBRARY</span><h2 id="cp-topic-map-title">See what each challenge helps you practise.</h2><p>The current library groups exercises by language and topic. Use those labels to choose a focused session, then use the prompt itself to decide which technique is relevant.</p></div><div className="cp-topic-map-stat"><strong>{challengeList.length}</strong><span>available<br/>challenges</span></div></div><div className="cp-language-strip"><span className="cp-topic-map-label">LANGUAGES IN THIS LIBRARY</span><div>{languages.map((language)=><span className="cp-language-chip" key={language}><Code2 size={13}/>{language}<b>{challengeList.filter((item)=>(item.language||"JavaScript")===language).length}</b></span>)}</div></div><div className="cp-topic-map-label cp-topic-label-spaced">TOPIC GUIDE</div><div className="cp-topic-cards">{topics.filter((item)=>item!=="All topics").map((item,index)=><article className="cp-topic-card" key={item}><span className={"cp-topic-count cp-topic-count-"+(index%3)}>{String(challengeList.filter((problem)=>problem.topic===item).length).padStart(2,"0")} PROBLEMS</span><h3>{item}</h3><p>{topicLearningNote(item)}</p></article>)}</div><p className="cp-topic-map-foot">These topic labels describe the published exercises currently available. The set can change as new challenges are added.</p></section>
    <section className="cp-learning-guide" aria-labelledby="cp-learning-guide-title">
      <div className="cp-guide-heading"><div><span className="cp-guide-kicker"><Sparkles size={14}/> YOUR PRACTICE PLAYBOOK</span><h2 id="cp-learning-guide-title">Build the reasoning, <em>not just the answer.</em></h2></div><p>Strong problem solving comes from a repeatable process: understand the task, make a plan, test the edges and explain the trade-offs.</p></div>
      <div className="cp-guide-grid">
        <article className="cp-guide-feature"><span className="cp-guide-feature-label">A focused 20-minute session</span><h3>Make every attempt count.</h3><p>Short, deliberate practice gives you time to think before reaching for a solution.</p><ol><li><b>01</b><span><strong>Understand · 3 min</strong><small>Restate the input, output and constraints in your own words.</small></span></li><li><b>02</b><span><strong>Plan · 4 min</strong><small>Walk through a small example and choose a possible approach.</small></span></li><li><b>03</b><span><strong>Implement · 9 min</strong><small>Write the solution, then run the supplied examples.</small></span></li><li><b>04</b><span><strong>Review · 4 min</strong><small>Check an edge case and explain the cost of your approach.</small></span></li></ol></article>
        <article className="cp-guide-card cp-guide-card-violet"><span className="cp-guide-index">01</span><h3>Trace before you type</h3><p>Use a tiny input to follow each variable as the algorithm runs. A hand-worked trace can reveal the missing condition or data structure faster than rewriting code at random.</p><div className="cp-guide-note">Ask: what changes after each step?</div></article>
        <article className="cp-guide-card cp-guide-card-orange"><span className="cp-guide-index">02</span><h3>Debug with evidence</h3><p>When a test fails, compare expected and actual values at the first point they diverge. Test boundaries allowed by the prompt, including repeated values or a one-item input where relevant.</p><div className="cp-guide-note">Change one assumption at a time.</div></article>
        <article className="cp-guide-card cp-guide-card-green"><span className="cp-guide-index">03</span><h3>Keep the pattern</h3><p>After solving, write a short note about why the approach works and when it applies. Later, solve a related problem from memory so the idea becomes reusable.</p><div className="cp-guide-note">Explain time and space costs.</div></article>
      </div>
      <div className="cp-guide-bottom"><span><Code2 size={16}/> For frontend challenges</span><p>Turn each requirement into a visible check: build the simplest semantic structure, run the preview and verify each element before polishing the details.</p></div>
    </section>
    {interview && <div className="cp-modal-backdrop" role="presentation" onClick={() => setInterview(false)}><section className="cp-interview-modal" role="dialog" aria-modal="true" aria-labelledby="cp-interview-title" onClick={(e) => e.stopPropagation()}><button className="cp-modal-close" onClick={() => setInterview(false)} aria-label="Close"><X size={18}/></button><span className="cp-modal-icon"><Sparkles size={20}/></span><span className="cp-eyebrow">A LITTLE EXTRA PRACTICE</span><h2 id="cp-interview-title">Interview prep is<br/><em>on the way.</em></h2><p>JavaScript output questions, quick quizzes, and React, Node.js and Express interview sets are coming soon.</p><button className="cp-submit" onClick={() => setInterview(false)}>Back to challenges <ArrowRight size={14}/></button><div className="cp-coming-topics">JavaScript <span/> React <span/> Node.js <span/> Express</div></section></div>}
  </main>;
}
