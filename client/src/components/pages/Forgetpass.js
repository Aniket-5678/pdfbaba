import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../Layout/Layout";

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = resetToken
        ? await axios.post("/api/v1/user/reset-password", { token: resetToken, newpassword })
        : await axios.post("/api/v1/user/forget-password", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not process your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50 px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_24px_80px_-30px_rgba(67,56,202,0.25)] lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-700 to-indigo-800 p-10 text-white lg:flex">
            <div aria-hidden="true" className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[36px] border-white/10" />
            <div className="relative">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20"><ShieldCheck size={28} /></span>
              <p className="mt-10 text-xs font-bold uppercase tracking-[.22em] text-violet-200">Your account, protected</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">A secure way<br />back in.</h1>
              <p className="mt-5 max-w-xs text-sm leading-7 text-violet-100">We’ll email you a private, single-use link so only you can change your password.</p>
            </div>
            <div className="relative flex items-center gap-2 text-sm font-medium text-violet-100"><Sparkles size={16} /> Built for your peace of mind</div>
          </aside>

          <div className="p-6 sm:p-10 lg:p-12">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700"><ArrowLeft size={16} /> Back to login</Link>
            <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 lg:hidden">{resetToken ? <KeyRound size={23} /> : <LockKeyhole size={23} />}</div>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-violet-700">Account recovery</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[2.1rem]">{resetToken ? "Set a new password" : "Forgot your password?"}</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">{resetToken ? "Choose a new password for your account. Use at least 8 characters." : "It happens. Enter the email linked to your account and we’ll send you a secure reset link."}</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {resetToken ? (
                <label className="block text-sm font-semibold text-slate-700">
                  New password
                  <span className="relative mt-2 block">
                    <KeyRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100" type="password" autoComplete="new-password" minLength={8} maxLength={128} required placeholder="At least 8 characters" value={newpassword} onChange={(event) => setNewpassword(event.target.value)} />
                  </span>
                  <span className="mt-2 block text-xs font-normal text-slate-500">Choose a password you haven’t used here before.</span>
                </label>
              ) : (
                <label className="block text-sm font-semibold text-slate-700">
                  Email address
                  <span className="relative mt-2 block">
                    <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </span>
                </label>
              )}
              <button disabled={submitting} type="submit" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200 disabled:cursor-wait disabled:opacity-70">
                {submitting ? "Please wait…" : resetToken ? "Update password" : "Email me a reset link"}
                {!submitting && <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <div className="mt-7 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left">
              {resetToken ? <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-700" /> : <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-700" />}
              <p className="text-xs leading-5 text-slate-600">{resetToken ? "Reset links expire after 15 minutes and can only be used once." : "For your security, reset links expire after 15 minutes. If you don’t see the email, check your spam folder."}</p>
            </div>
            <p className="mt-7 text-center text-sm text-slate-500">Remembered it? <Link className="font-bold text-violet-700 hover:text-violet-900" to="/login">Sign in</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Forgetpass;
