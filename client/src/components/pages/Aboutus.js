import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Code2, BookOpen, ArrowRight } from "lucide-react";
export default function Aboutus() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="mb-4 text-xs font-bold tracking-widest text-orange-500">
          ABOUT CODEBRICKET
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Great ideas deserve
          <br />
          <span className="text-violet-600">a better starting point.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          Codebricket brings source code projects and practical learning
          resources together. Explore real implementations, strengthen your
          foundations, and spend more time building your next idea.
        </p>
        <div className="my-10 grid gap-6 md:grid-cols-2">
          {[
            [
              Code2,
              "Build with real projects",
              "Browse website projects, explore previews, and customize source code to suit your own goals.",
            ],
            [
              BookOpen,
              "Learn by doing",
              "Follow developer roadmaps, practice with quizzes, and build your understanding one step at a time.",
            ],
          ].map(([Icon, title, copy]) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-8"
            >
              <Icon size={32} className="mb-5 text-orange-500" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {copy}
              </p>
            </div>
          ))}
        </div>
        <Link
          to="/service"
          className="inline-flex items-center gap-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-4 text-sm font-bold text-white"
        >
          Explore projects
          <ArrowRight size={18} />
        </Link>
      </section>
    </Layout>
  );
}
