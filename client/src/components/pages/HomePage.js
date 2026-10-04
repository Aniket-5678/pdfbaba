import React from "react";
import Layout from "../Layout/Layout";
import Banner from "./Banner";
import Services from "./Services";
import LearningCategories from "./LearningCategories";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Smartphone,
  LayoutGrid,
  Code2,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
export default function HomePage() {
  return (
    <Layout>
      <Banner />
      <section className="mx-auto max-w-[1360px] border-t border-slate-100 px-5 py-9 sm:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-medium tracking-wider text-slate-500">
              BROWSE BY CATEGORY
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Popular Project{" "}
              <span className="text-orange-500">Categories</span>
            </h2>
          </div>
          <Link
            to="/service"
            className="flex items-center gap-3 rounded-full border border-slate-200 px-5 py-3 text-xs font-semibold"
          >
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            [Layers, "Full Stack"],
            [FaReact, "React"],
            [Code2, "Next.js"],
            [FaNodeJs, "Node.js"],
            [Smartphone, "Mobile"],
            [LayoutGrid, "UI Templates"],
          ].map(([Icon, title]) => (
            <Link
              key={title}
              to={
                "/service?q=" +
                encodeURIComponent(
                  title === "Full Stack"
                    ? "full"
                    : title === "UI Templates"
                      ? "template"
                      : title,
                )
              }
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="rounded-xl bg-violet-50 p-2 text-violet-600">
                <Icon size={24} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-950">{title}</h3>
                <p className="mt-1 text-[10px] text-slate-500">
                  Explore projects
                </p>
              </div>
              <ArrowRight size={14} className="ml-auto text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
      <LearningCategories />
      <Services />
    </Layout>
  );
}
