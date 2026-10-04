import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Download,
  FolderOpen,
  HelpCircle,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/auth";
import Layout from "../Layout/Layout";
import Seo from "../Seo";
import { PageHero, Reveal, SearchBox, Status, panel, primary } from "./PageKit";
import { downloadStatus, timeRemaining } from "../../utils/orderStatus.mjs";

const dateLabel = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};
export default function SourceCodeOrder() {
  const [auth] = useAuth();
  const token = auth?.token;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [downloadingId, setDownloadingId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setOrders([]);
    setError("");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get("/api/v1/sourcecode/my-orders", {
        signal: controller.signal,
        headers: { Authorization: "Bearer " + token },
      })
      .then(({ data }) => {
        if (!data.success || !Array.isArray(data.orders))
          throw new Error("Invalid orders response");
        setOrders(data.orders);
        setNow(Date.now());
      })
      .catch((e) => {
        if (e.code !== "ERR_CANCELED")
          setError(
            e.response?.status === 401
              ? "Your session has expired. Please log in again."
              : "We couldn't load your purchases. Please try again.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [token, attempt]);

  async function handleDownload(order) {
    if (downloadingId || downloadStatus(order).status !== "available") return;
    setDownloadingId(order._id);
    setNotice(null);
    try {
      const { data } = await axios.get(
        "/api/v1/sourcecode/download/" + order._id,
        { headers: { Authorization: "Bearer " + token }, responseType: "blob" },
      );
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "sourcecode-" + order._id + ".zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setNotice({
        success: true,
        text: "Download started. Check your browser's downloads.",
      });
    } catch (e) {
      const status = e.response?.status;
      setNotice({
        success: false,
        text:
          status === 403
            ? "This download is no longer available. Check its expiry or contact support."
            : status === 404
              ? "The project file is unavailable. Please contact support with your order ID."
              : "Download failed. Please check your connection and try again.",
      });
      if (status === 403) setAttempt((value) => value + 1);
    } finally {
      setDownloadingId(null);
    }
  }
  const enriched = orders.map((order) => ({
    ...order,
    download: downloadStatus(order, now),
  }));
  const available = enriched.filter(
    (order) => order.download.status === "available",
  ).length;
  const expired = enriched.filter(
    (order) => order.download.status === "expired",
  ).length;
  const visible = enriched.filter(
    (order) =>
      (filter === "all" || order.download.status === filter) &&
      (order.title || "").toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <Layout>
      <Seo
        title="Your Project Library"
        description="View your Codebricket purchases and download available source code projects."
      />
      <PageHero
        eyebrow="YOUR CREATIVE TOOLKIT"
        title="Your projects."
        accent="Ready to build."
        description="Everything you've purchased, in one place. Find your project, download the source code, and make it yours."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600">
            <ShieldCheck size={16} className="text-emerald-500" /> Personal
            purchase library
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600">
            <Clock3 size={16} className="text-violet-500" /> Downloads available
            for 24 hours
          </span>
        </div>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-10">
        {!token ? (
          <div className={panel + " mx-auto max-w-xl py-12 text-center"}>
            <FolderOpen size={44} className="mx-auto mb-5 text-violet-500" />
            <h2 className="text-2xl font-bold">Your library is waiting</h2>
            <p className="my-5 text-sm leading-7 text-slate-500">
              Log in to view your purchases and download your available
              projects.
            </p>
            <Link
              to="/login"
              state={{ from: { pathname: "/sourcecode-order" } }}
              className={primary}
            >
              Log in <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                [
                  FolderOpen,
                  "Purchased projects",
                  orders.length,
                  "bg-violet-50 text-violet-600",
                ],
                [
                  Download,
                  "Ready to download",
                  available,
                  "bg-emerald-50 text-emerald-600",
                ],
                [
                  Archive,
                  "Expired downloads",
                  expired,
                  "bg-slate-100 text-slate-500",
                ],
              ].map(([Icon, label, value, color]) => (
                <div
                  key={label}
                  className={
                    panel.replace("p-6", "p-3 sm:p-6") +
                    " flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
                  }
                >
                  <div className={"rounded-2xl p-3 " + color}>
                    <Icon size={25} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium leading-5 text-slate-500 sm:text-xs">
                      {label}
                    </p>
                    <p className="mt-1 text-2xl font-extrabold sm:text-3xl">
                      {loading ? "—" : value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
              <div
                className="flex max-w-full flex-wrap gap-1 rounded-2xl bg-slate-100 p-1.5"
                aria-label="Filter purchases"
              >
                {[
                  ["all", "All projects"],
                  ["available", "Available"],
                  ["expired", "Expired"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    aria-pressed={filter === key}
                    className={
                      "rounded-xl px-4 py-2.5 text-xs font-bold transition " +
                      (filter === key
                        ? "bg-white text-violet-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900")
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="w-full sm:w-72">
                <SearchBox
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  label="Search purchased projects"
                  placeholder="Find a purchased project..."
                />
              </div>
            </div>
            {notice && (
              <p
                role={notice.success ? "status" : "alert"}
                className={
                  "mb-6 rounded-2xl border p-4 text-sm " +
                  (notice.success
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-amber-100 bg-amber-50 text-amber-800")
                }
              >
                {notice.text}
              </p>
            )}
            <Status loading={loading} error={error} />
            {error && (
              <button
                onClick={() => setAttempt((value) => value + 1)}
                className={primary + " mt-4"}
              >
                <RefreshCw size={16} /> Try again
              </button>
            )}
            {!loading && !error && !visible.length && (
              <div className={panel + " py-14 text-center"}>
                <FolderOpen
                  size={48}
                  className="mx-auto mb-5 text-violet-300"
                />
                <h2 className="text-xl font-bold">
                  {orders.length
                    ? "No matching projects"
                    : "Your next project starts here"}
                </h2>
                <p className="my-4 text-sm text-slate-500">
                  {orders.length
                    ? "Try a different search or filter."
                    : "Explore ready-made projects. Your purchases will appear in this library."}
                </p>
                <Link to="/service" className={primary}>
                  Explore projects <ArrowRight size={16} />
                </Link>
              </div>
            )}
            {!loading && !error && (
              <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((order) => {
                  const active = order.download.status === "available";
                  return (
                    <Reveal key={order._id} className="h-full">
                      <article
                        className={
                          panel +
                          " group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        }
                      >
                        <div className="mb-5 flex items-center justify-between gap-2">
                          <div
                            className={
                              "rounded-2xl p-3 " +
                              (active
                                ? "bg-gradient-to-br from-violet-100 to-blue-50 text-violet-600"
                                : "bg-slate-100 text-slate-400")
                            }
                          >
                            <Code2 size={27} />
                          </div>
                          <span
                            className={
                              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold " +
                              (active
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500")
                            }
                          >
                            {active ? (
                              <CheckCircle2 size={13} />
                            ) : (
                              <Clock3 size={13} />
                            )}
                            {active
                              ? "Ready to download"
                              : order.download.status === "expired"
                                ? "Download expired"
                                : "Unavailable"}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold leading-7 tracking-tight">
                          {order.title || "Source Code"}
                        </h2>
                        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={14} /> Purchased{" "}
                          {dateLabel(order.createdAt)}
                        </p>
                        <p className="mt-2 break-all text-[10px] text-slate-400">
                          Order #{order._id}
                        </p>
                        <div className="mt-auto pt-6">
                          <div className="mb-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                            <span className="text-xl font-extrabold">
                              ₹
                              {Number(order.price || 0).toLocaleString("en-IN")}
                            </span>
                            <span
                              className={
                                "text-[11px] font-medium " +
                                (active ? "text-emerald-600" : "text-slate-400")
                              }
                            >
                              {active
                                ? timeRemaining(order.download.remaining)
                                : "Source code purchase"}
                            </span>
                          </div>
                          {active ? (
                            <button
                              onClick={() => handleDownload(order)}
                              disabled={Boolean(downloadingId)}
                              className={primary + " w-full"}
                            >
                              {downloadingId === order._id ? (
                                <Loader2 size={17} className="animate-spin" />
                              ) : (
                                <Download size={17} />
                              )}
                              {downloadingId === order._id
                                ? "Downloading..."
                                : "Download source code"}
                            </button>
                          ) : (
                            <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">
                              {order.download.status === "expired"
                                ? "The download window has closed"
                                : "Download information is unavailable"}
                              {Number.isFinite(Date.parse(order.expiry))
                                ? " on " + dateLabel(order.expiry)
                                : ""}
                              .{" "}
                              <Link
                                to="/contact"
                                className="font-semibold text-violet-600 hover:underline"
                              >
                                Need help?
                              </Link>
                            </div>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </>
        )}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 p-6">
          <div className="flex gap-3">
            <HelpCircle className="shrink-0 text-violet-500" />
            <div>
              <h2 className="text-sm font-bold">
                A little help goes a long way
              </h2>
              <p className="mt-1 text-xs leading-6 text-slate-500">
                Download your ZIP before its window closes. Keep a local copy
                for your next build.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600"
          >
            Contact support <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
