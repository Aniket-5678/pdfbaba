import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";
import Layout from "../Layout/Layout";
import { Braces, Eye, EyeOff, Check, ArrowRight, Loader2 } from "lucide-react";
import { field, primary, Reveal } from "./PageKit";
export default function AuthPage({ signup = false }) {
  const [auth, setAuth] = useAuth(),
    navigate = useNavigate(),
    location = useLocation();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" }),
    [visible, setVisible] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.post(
        "/api/v1/user/" + (signup ? "register" : "login"),
        form,
      );
      if (!data.success) throw new Error(data.message || "Please try again.");
      if (signup) {
        navigate("/login", { state: { registered: true } });
      } else {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        const from = location.state?.from;
        const target =
          typeof location.state === "string"
            ? location.state
            : from?.pathname
              ? from.pathname + (from.search || "") + (from.hash || "")
              : undefined;
        navigate(
          target?.startsWith("/") &&
            !target.startsWith("//") &&
            (!target.startsWith("/dashboard/admin") || data.user?.role === 1)
            ? target
            : data.user?.role === 1
              ? "/dashboard/admin"
              : "/dashboard/user",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to connect. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50/50 via-white to-violet-100/50 px-5 py-12 sm:py-20">
        <Reveal className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-violet-100/50 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/40 blur-3xl" />
            <div className="relative">
              <Braces size={48} className="mb-12 text-orange-400" />
              <p className="mb-4 text-xs font-bold tracking-[.2em] text-violet-300">
                YOUR NEXT CHAPTER
              </p>
              <h2 className="text-4xl font-bold leading-tight">
                Great ideas.
                <br />
                <span className="text-orange-400">Even better builds.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                A home for your projects, practical learning and the skills you
                want to build next.
              </p>
            </div>
            <div className="relative mt-12 space-y-4">
              {[
                "Discover ready-made source code",
                "Follow a clear learning roadmap",
                "Learn with notes and practice quizzes",
              ].map((x) => (
                <p key={x} className="flex gap-3 text-sm">
                  <Check className="text-emerald-400" size={18} />
                  {x}
                </p>
              ))}
            </div>
          </div>
          <div className="p-7 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              {signup ? "Start building" : "Welcome back"}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
              {signup ? "Create your account" : "Log in to Codebricket"}
            </h1>
            <p className="mt-3 mb-8 text-sm text-slate-500">
              {signup
                ? "Your next idea starts with one small step."
                : "Pick up where you left off."}
            </p>
            {location.state?.registered && (
              <p
                role="status"
                className="mb-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700"
              >
                Account created. You can now log in.
              </p>
            )}
            <form onSubmit={submit} className="space-y-5">
              {signup && (
                <label className="block text-sm font-semibold">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className={field + " mt-2"}
                    placeholder="Your full name"
                  />
                </label>
              )}
              <label className="block text-sm font-semibold">
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field + " mt-2"}
                  placeholder="you@example.com"
                />
              </label>
              <div>
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    required
                    type={visible ? "text" : "password"}
                    autoComplete={signup ? "new-password" : "current-password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className={field + " pr-12"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    aria-label={visible ? "Hide password" : "Show password"}
                    aria-pressed={visible}
                    onClick={() => setVisible(!visible)}
                    className="absolute right-4 top-3.5 text-slate-400"
                  >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {!signup && (
                <Link
                  className="block text-right text-xs font-semibold text-violet-600"
                  to="/forgetpass"
                >
                  Forgot password?
                </Link>
              )}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className={primary + " w-full"}
              >
                {busy ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}{" "}
                {busy ? "Please wait..." : signup ? "Create account" : "Log in"}
              </button>
              {signup && (
                <p className="text-xs leading-6 text-slate-500">
                  By creating an account, you agree to our{" "}
                  <Link to="/termcondition" className="underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              )}
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">
              {signup ? "Already have an account?" : "New here?"}{" "}
              <Link
                className="font-bold text-violet-600"
                to={signup ? "/login" : "/register"}
              >
                {signup ? "Log in" : "Create an account"}
              </Link>
            </p>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
