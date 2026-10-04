import React, { useState } from "react";
import axios from "axios";
import AdminShell from "../AdminShell";
import { field, primary, panel } from "../PageKit";
import { Plus, Trash2 } from "lucide-react";
const blank = () => ({
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: "",
});
export default function CreateQuiz() {
  const [title, setTitle] = useState(""),
    [category, setCategory] = useState(""),
    [questions, setQuestions] = useState([blank()]),
    [json, setJson] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  function update(i, data) {
    setQuestions((a) => a.map((q, j) => (i === j ? { ...q, ...data } : q)));
  }
  function parse() {
    try {
      const data = JSON.parse(json);
      if (
        !Array.isArray(data) ||
        !data.length ||
        data.some(
          (q) =>
            !q.questionText ||
            !Array.isArray(q.options) ||
            q.options.length < 2 ||
            !q.options.includes(q.correctAnswer),
        )
      )
        throw new Error(
          "Use a question array with questionText, options and a matching correctAnswer.",
        );
      setQuestions(data);
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
      if (
        questions.some(
          (q) =>
            !q.options.includes(q.correctAnswer) ||
            q.options.some((x) => !x.trim()),
        )
      )
        throw new Error("Fill every option and select a correct answer.");
      await axios.post("/api/v1/quizzes/create", {
        title,
        category,
        questions,
      });
      setNotice("Quiz published.");
      setTitle("");
      setCategory("");
      setQuestions([blank()]);
      setJson("");
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AdminShell
      title="Create a quiz"
      description="Build focused practice sessions. Write clear questions and choose the correct answer."
    >
      {error && (
        <p role="alert" className="mb-5 text-sm text-red-600">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mb-5 text-sm text-emerald-600">
          {notice}
        </p>
      )}
      <details className={panel + " mb-6"}>
        <summary className="cursor-pointer text-sm font-bold">
          Import questions from JSON
        </summary>
        <textarea
          aria-label="Question JSON"
          rows={6}
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className={field + " mt-4 font-mono"}
          placeholder='[{"questionText":"Question?","options":["A","B"],"correctAnswer":"A"}]'
        />
        <button onClick={parse} type="button" className={primary + " mt-3"}>
          Apply questions
        </button>
      </details>
      <form onSubmit={save} className="space-y-5">
        <div className={panel + " grid gap-5 sm:grid-cols-2"}>
          <label className="text-sm font-bold">
            Title
            <input
              required
              className={field + " mt-2"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="text-sm font-bold">
            Category
            <input
              required
              className={field + " mt-2"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>
        {questions.map((q, i) => (
          <fieldset key={i} className={panel}>
            <legend className="px-2 text-xs font-bold text-violet-600">
              Question {i + 1}
            </legend>
            <div className="flex gap-3">
              <label className="flex-1">
                <span className="sr-only">Question text {i + 1}</span>
                <textarea
                  required
                  rows={2}
                  className={field}
                  value={q.questionText}
                  onChange={(e) => update(i, { questionText: e.target.value })}
                  placeholder="Write your question"
                />
              </label>
              {questions.length > 1 && (
                <button
                  type="button"
                  aria-label={"Remove question " + (i + 1)}
                  onClick={() =>
                    setQuestions((a) => a.filter((_, j) => j !== i))
                  }
                  className="self-start p-3 text-red-500"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {q.options.map((o, j) => (
                <label key={j} className="text-xs font-semibold text-slate-500">
                  Option {j + 1}
                  <input
                    required
                    className={field + " mt-2"}
                    value={o}
                    onChange={(e) =>
                      update(i, {
                        options: q.options.map((v, k) =>
                          j === k ? e.target.value : v,
                        ),
                        correctAnswer:
                          q.correctAnswer === o
                            ? e.target.value
                            : q.correctAnswer,
                      })
                    }
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block text-xs font-semibold text-slate-500">
              Correct answer
              <select
                required
                className={field + " mt-2"}
                value={q.correctAnswer}
                onChange={(e) => update(i, { correctAnswer: e.target.value })}
              >
                <option value="">Select the correct option</option>
                {q.options.filter(Boolean).map((o, j) => (
                  <option key={j} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        ))}
        <div className="flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={() => setQuestions((a) => [...a, blank()])}
            className="flex items-center gap-2 rounded-xl bg-violet-100 px-5 py-3 text-sm font-bold text-violet-700"
          >
            <Plus size={16} />
            Add question
          </button>
          <button disabled={busy} className={primary}>
            {busy ? "Publishing..." : "Publish quiz"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
