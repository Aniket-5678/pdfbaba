
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RingLoader } from "react-spinners";
import {
  ArrowUpRight,
  Mail,
  Sparkles,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import facbookImage from "../images/facebook.png";
import linkdinImage from "../images/linkdin.png";
import instagramImage from "../images/instagram.png";
import twitterImage from "../images/twitter.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const elements = footer.querySelectorAll(".footer-animate");

    elements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";

      setTimeout(() => {
        el.style.transition =
          "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 80);
    });

    return () => {
      elements.forEach((el) => {
        el.style.transition = "";
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/v1/email/send-email", {
        email,
      });

      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      image: facbookImage,
      url: "https://www.facebook.com/share/18Ynq6wtQX/?mibextid=LQQJ4d",
    },
    {
      name: "Twitter",
      image: twitterImage,
      url: "https://www.twitter.com",
    },
    {
      name: "LinkedIn",
      image: linkdinImage,
      url: "https://www.linkedin.com",
    },
    {
      name: "Instagram",
      image: instagramImage,
      url: "https://www.instagram.com/pdf_baba",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative mt-20 overflow-hidden bg-[#080b14] text-gray-300"
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[130px] animate-pulse" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-600/10 blur-[110px]" />

      {/* ================= TOP BORDER ================= */}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

      {/* ================= MAIN FOOTER ================= */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* ================= BRAND ================= */}

          <div className="footer-animate lg:col-span-2">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/20">
                <Sparkles size={22} className="text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  PDF<span className="text-indigo-500">Baba</span>
                </h2>

                <p className="text-xs text-gray-500">
                  Learn • Grow • Succeed
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              PDFBaba is a learning platform where students can explore
              quality study materials, PDFs, career roadmaps, quizzes and
              educational resources designed to help learners grow faster.
            </p>

            {/* Mini highlight */}

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300">
                📚 Study Materials
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-400 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300">
                🚀 Career Roadmaps
              </span>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}

          <div className="footer-animate">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy"],
                ["Terms & Conditions", "/termcondition"],
                ["Signup", "/register"],
                ["Login", "/login"],
              ].map(([name, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="group flex w-fit items-center gap-1 text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    <span>{name}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* ================= CONTACT ================= */}

          <div className="footer-animate">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="group flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                <Mail size={17} />
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500">
                  Email us
                </p>

                <a
                  href="mailto:pdfbaba07@gmail.com"
                  className="text-sm text-gray-300 transition hover:text-indigo-400"
                >
                  pdfbaba07@gmail.com
                </a>
              </div>

            </div>

          </div>

          {/* ================= SOCIAL ================= */}

          <div className="footer-animate">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-500">
              Follow PDFBaba for latest updates, resources and learning
              content.
            </p>

            <div className="flex flex-wrap gap-3">

              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <img
                    src={social.image}
                    alt={social.name}
                    className="w-6 object-contain transition duration-300 group-hover:scale-110"
                  />

                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                    {social.name}
                  </span>
                </a>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}

      <div className="relative border-y border-white/[0.07] bg-white/[0.025]">

        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent p-7 shadow-2xl shadow-indigo-900/10 sm:p-10">

            {/* Newsletter glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-purple-600/10 blur-3xl" />

            <div className="relative text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                <Mail size={22} />
              </div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Stay Updated With PDFBaba
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
                Get the latest PDFs, notes, quizzes, roadmaps and learning
                resources directly in your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
              >

                <div className="relative flex-1">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 transition-all duration-300 focus:border-indigo-500/60 focus:bg-black/40 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <RingLoader size={22} color="#fff" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </button>

              </form>

              <p className="mt-4 text-[11px] text-gray-600">
                No spam. Only useful learning resources.
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}

      <div className="relative border-t border-white/[0.07]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:flex-row sm:px-8 sm:text-left">

          <p className="text-xs text-gray-500">
            © 2026{" "}
            <span className="font-medium text-gray-300">
              PDFBaba
            </span>
            . All Rights Reserved.
          </p>

          <p className="flex items-center gap-1 text-xs text-gray-600">
            Made with
            <Heart
              size={13}
              className="fill-current text-red-500 animate-pulse"
            />
            for learners
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

