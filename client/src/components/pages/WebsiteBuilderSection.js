import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, LayoutTemplate, MousePointer2, PanelsTopLeft } from "lucide-react";

export default function WebsiteBuilderSection() {
  return (
    <section className="mx-auto max-w-[1360px] px-5 py-7 sm:px-10 sm:py-10">
      <div className="relative overflow-hidden rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-orange-50 px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1fr] lg:gap-12">
          <div className="relative order-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-violet-900/10 sm:p-4 lg:order-1">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
              <PanelsTopLeft size={15} className="text-violet-600" />
              <span className="text-[11px] font-semibold text-slate-700">Page builder</span>
              <span className="ml-auto rounded-md bg-violet-100 px-2 py-1 text-[9px] font-bold text-violet-700">LIVE CANVAS</span>
            </div>
            <div className="mt-3 grid min-h-40 grid-cols-[72px_1fr] gap-3 sm:min-h-48 sm:grid-cols-[100px_1fr]">
              <div className="space-y-2 rounded-xl bg-slate-50 p-2">
                {["Heading", "Image", "Button", "Columns"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-2 py-2 text-[9px] text-slate-500">
                    <LayoutTemplate size={11} className="text-violet-500" />{item}
                  </div>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-4 text-white sm:p-6">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-violet-200">Your next project</span>
                <p className="mt-2 max-w-[200px] text-lg font-extrabold leading-tight sm:text-2xl">Design a page that feels like you.</p>
                <div className="mt-4 h-2 w-24 rounded-full bg-white/25" />
                <div className="mt-2 h-2 w-16 rounded-full bg-white/15" />
                <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-violet-700">Explore ideas</div>
                <MousePointer2 size={22} className="absolute bottom-5 right-5 rotate-[-15deg] text-orange-200 drop-shadow" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-violet-700">MAKE YOUR IDEA REAL</p>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Build a website, <span className="text-violet-600">your way.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Bring your ideas to life with the Website Builder. Explore the builder and create a page for your next project.
            </p>
            <Link
              to="/builder"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Open Website Builder <ArrowRight size={16} />
            </Link>
            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500"><ExternalLink size={13} /> Start creating in the builder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
