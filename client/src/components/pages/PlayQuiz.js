import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { panel, primary, Status } from "./PageKit";
import {
  Clock3,
  ArrowRight,
  Trophy,
  RotateCcw,
  Check,
  ChevronLeft,
} from "lucide-react";
export default function PlayQuiz() {
  const { id } = useParams(),
    [quiz, setQuiz] = useState(null),
    [error, setError] = useState(""),
    [index, setIndex] = useState(0),
    [selected, setSelected] = useState(""),
    [answers, setAnswers] = useState([]),
    [finished, setFinished] = useState(false),
    [seconds, setSeconds] = useState(1800),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const c = new AbortController();
    setQuiz(null);
    setError("");
    setIndex(0);
    setSelected("");
    setAnswers([]);
    setFinished(false);
    setSeconds(1800);
    axios
      .get("/api/v1/quizzes/" + id, { signal: c.signal })
      .then(({ data }) => {
        if (!data.questions?.length) {
          setError("This quiz has no questions yet.");
          return;
        }
        const questions = [...data.questions];
        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        setQuiz({ ...data, questions });
      })
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError("Couldn't load this quiz. Please try again.");
      });
    return () => c.abort();
  }, [id, attempt]);
  useEffect(() => {
    if (!quiz || finished) return;
    const timer = setInterval(
      () => setSeconds((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [quiz, finished]);
  useEffect(() => {
    if (quiz && seconds === 0) setFinished(true);
  }, [seconds, quiz]);
  function next(e) {
    e.preventDefault();
    if (!selected || finished) return;
    setAnswers((a) => [
      ...a,
      {
        question: quiz.questions[index],
        selected,
        correct:
          selected.trim().toLowerCase() ===
          String(quiz.questions[index].correctAnswer).trim().toLowerCase(),
      },
    ]);
    setSelected("");
    if (index + 1 === quiz.questions.length) setFinished(true);
    else setIndex(index + 1);
  }
  const score = answers.filter((a) => a.correct).length;
  return (
    <Layout>
      <section className="min-h-[70vh] bg-gradient-to-br from-violet-50/70 via-white to-orange-50/50 px-5 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/practice-quiz"
            className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-violet-600"
          >
            <ChevronLeft size={16} />
            All quizzes
          </Link>
          <Status loading={!quiz && !error} error={error} />
          {quiz && (
            <>
              <Seo
                title={quiz.title + " Quiz"}
                description={
                  "Practise " + quiz.category + " with this Codebricket quiz."
                }
              />
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-600">
                    {quiz.category}
                  </p>
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {quiz.title}
                  </h1>
                </div>
                <div
                  aria-label="Time remaining"
                  className="flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-bold text-violet-700"
                >
                  <Clock3 size={17} />
                  {Math.floor(seconds / 60)}:
                  {String(seconds % 60).padStart(2, "0")}
                </div>
              </div>
              {finished ? (
                <>
                  <div className={panel + " text-center"}>
                    <Trophy
                      className="mx-auto mb-5 text-orange-500"
                      size={48}
                    />
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                      {seconds === 0 ? "TIME IS UP" : "QUIZ COMPLETE"}
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold">
                      {score} / {quiz.questions.length}
                    </h2>
                    <p className="mt-4 text-sm text-slate-500">
                      {answers.length} questions answered. Review your answers
                      below and keep learning.
                    </p>
                    <button
                      onClick={() => setAttempt((a) => a + 1)}
                      className={primary + " mt-6"}
                    >
                      <RotateCcw size={17} />
                      Try again
                    </button>
                  </div>
                  <h2 className="my-6 text-xl font-bold">Your answer review</h2>
                  <div className="space-y-4">
                    {answers.map((a, i) => (
                      <div key={i} className={panel}>
                        <p className="mb-3 text-sm font-bold">
                          {i + 1}. {a.question.questionText}
                        </p>
                        <p
                          className={
                            "text-xs " +
                            (a.correct ? "text-emerald-600" : "text-red-600")
                          }
                        >
                          Your answer: {a.selected}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          Correct answer: {a.question.correctAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={next} className={panel + " sm:p-8"}>
                  <div className="mb-4 flex justify-between text-xs font-semibold text-slate-500">
                    <span>
                      Question {index + 1} of {quiz.questions.length}
                    </span>
                    <span>
                      {Math.round((index / quiz.questions.length) * 100)}%
                      complete
                    </span>
                  </div>
                  <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-violet-100">
                    <div
                      className="h-full bg-violet-600 transition-all"
                      style={{
                        width: (index / quiz.questions.length) * 100 + "%",
                      }}
                    />
                  </div>
                  <fieldset>
                    <legend className="mb-7 text-xl font-bold leading-8">
                      {quiz.questions[index].questionText}
                    </legend>
                    <div className="space-y-3">
                      {quiz.questions[index].options.map((option, i) => (
                        <label
                          key={i}
                          className={
                            "flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-sm transition " +
                            (selected === option
                              ? "border-violet-500 bg-violet-50 text-violet-900"
                              : "border-slate-200 hover:border-violet-300")
                          }
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selected === option}
                            onChange={() => setSelected(option)}
                            className="h-4 w-4 accent-violet-600"
                          />
                          <span className="flex-1">{option}</span>
                          {selected === option && (
                            <Check size={16} className="text-violet-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="mt-8 flex justify-end">
                    <button disabled={!selected} className={primary}>
                      {index + 1 === quiz.questions.length
                        ? "Finish quiz"
                        : "Next question"}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
