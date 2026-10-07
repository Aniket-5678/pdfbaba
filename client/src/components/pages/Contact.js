import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import { ArrowDownRight, ArrowUpRight, Check, LoaderCircle, Mail, MessageCircle, Send, Sparkles } from "lucide-react";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/contactuser/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "We couldn't send your message.");
      toast.success("Message sent. Thanks for reaching out!");
      setFormData(initialForm);
    } catch (error) {
      toast.error(error.message || "Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#f7f8f5] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl sm:mb-12">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[10px] font-bold tracking-[.16em] text-emerald-800">
              <Sparkles size={13} /> WE’RE HERE TO HELP
            </p>
            <h1 className="text-4xl font-extrabold tracking-[-.055em] text-slate-950 sm:text-5xl lg:text-6xl">
              Let’s start a <span className="text-emerald-700">conversation.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Questions, feedback, or a big idea you want to build? Send us a note. We’ll be glad to hear from you.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_25px_80px_-38px_rgba(15,35,25,.3)] lg:grid-cols-[.78fr_1.22fr]">
            <aside className="relative flex min-h-[330px] flex-col overflow-hidden bg-[#183b2b] p-7 text-white sm:p-10 lg:min-h-[610px] lg:p-12">
              <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-9 -top-5 h-44 w-44 rounded-full border border-white/10" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-emerald-200"><MessageCircle size={22}/></span>
                <p className="mt-8 text-[10px] font-bold tracking-[.2em] text-emerald-200">A REAL PERSON IS ON THE OTHER SIDE</p>
                <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Good things begin with a hello.</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-emerald-50/75">Tell us what you’re working on or where you’re stuck. Share as much or as little as you like.</p>
              </div>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-emerald-200"><Mail size={18}/></span>
                  <div><p className="text-[10px] text-emerald-100/60">SEND US A NOTE</p><p className="mt-1 text-xs font-semibold">We’ll reply as soon as we can</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-emerald-200"><Check size={18}/></span>
                  <div><p className="text-[10px] text-emerald-100/60">NO ROBOT REPLIES</p><p className="mt-1 text-xs font-semibold">Your message goes to our team</p></div>
                </div>
              </div>
              <ArrowDownRight className="absolute bottom-8 right-8 hidden text-emerald-200/50 lg:block" size={30}/>
            </aside>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mb-7 flex items-end justify-between gap-3">
                <div><p className="text-[10px] font-bold tracking-[.18em] text-emerald-700">CONTACT FORM</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">What’s on your mind?</h2></div>
                <span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500 sm:inline">Usually takes 2 minutes</span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-slate-700">Your name
                    <input name="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Aniket Singh" required maxLength={100} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10" />
                  </label>
                  <label className="block text-xs font-semibold text-slate-700">Email address
                    <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required maxLength={160} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10" />
                  </label>
                </div>
                <label className="block text-xs font-semibold text-slate-700">Subject
                  <input name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required maxLength={160} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10" />
                </label>
                <label className="block text-xs font-semibold text-slate-700">Your message
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="A little context helps us get back to you with the right answer…" required maxLength={3000} rows={6} className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-normal leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10" />
                </label>
                <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] leading-5 text-slate-500">Your details are only used to respond to this message.</p>
                  <button type="submit" disabled={loading} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? <><LoaderCircle size={17} className="animate-spin"/> Sending…</> : <>Send message <Send size={16}/></>}
                  </button>
                </div>
              </form>
              <p className="mt-6 flex items-center gap-1 text-[10px] text-slate-400">Thanks for helping us make Codebricket better <ArrowUpRight size={12}/></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
