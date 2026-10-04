import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../context/auth";
import { PageHero, panel, Reveal } from "../PageKit";
import {
  BookOpen,
  Route,
  Brain,
  Code2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
export default function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout>
      <PageHero
        eyebrow="YOUR WORKSPACE"
        title={
          "Hey, " + (auth.user?.fullName || auth.user?.name || "builder") + "."
        }
        accent="Keep growing."
        description="Find your next project, pick a learning path, and make a little progress today."
      />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <div>
            <p className="text-sm font-bold">
              {auth.user?.fullName || "Your account"}
            </p>
            <p className="mt-1 break-all text-xs text-slate-500">
              {auth.user?.email}
            </p>
          </div>
          <Link
            to="/sourcecode-order"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-700"
          >
            <ShoppingBag size={18} />
            My projects
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Explore projects",
              "Ready-made code for your next idea.",
              "/service",
              Code2,
            ],
            [
              "Learning roadmaps",
              "Find the next step in your journey.",
              "/exam-roadmap",
              Route,
            ],
            [
              "Practice quizzes",
              "Test what you know and improve.",
              "/practice-quiz",
              Brain,
            ],
            [
              "Study notes",
              "Learn from curated explanations.",
              "/notes",
              BookOpen,
            ],
          ].map(([title, desc, url, Icon]) => (
            <Reveal key={url}>
              <Link
                to={url}
                className={
                  panel +
                  " block h-full transition hover:-translate-y-1 hover:border-violet-300"
                }
              >
                <Icon size={28} className="mb-7 text-violet-600" />
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">{desc}</p>
                <ArrowRight size={20} className="mt-7 text-orange-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
