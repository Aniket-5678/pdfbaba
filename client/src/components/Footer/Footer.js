import React from "react";
import { Link } from "react-router-dom";
import { Braces, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 px-5 py-12 text-slate-600 sm:px-10">
      <div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-950"
          >
            <Braces className="text-orange-500" size={32} />
            Code<span className="-ml-2 text-orange-500">Bricket</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Build faster. Learn by doing. Discover source code projects and
            practical learning paths for your next big idea.
          </p>
        </div>
        {[
          [
            "Explore",
            [
              ["Projects", "/service"],
              ["Categories", "/categories"],
              ["Roadmaps", "/exam-roadmap"],
              ["Practice", "/practice-quiz"],
            ],
          ],
          [
            "Your account",
            [
              ["Log In", "/login"],
              ["Sign Up", "/register"],
              ["My Projects", "/sourcecode-order"],
            ],
          ],
          [
            "Codebricket",
            [
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Privacy Policy", "/privacy"],
              ["Terms & Conditions", "/termcondition"],
            ],
          ],
        ].map(([title, links]) => (
          <div key={title}>
            <h2 className="mb-4 text-sm font-bold text-slate-950">{title}</h2>
            {links.map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="mb-3 flex items-center gap-2 text-xs hover:text-orange-500"
              >
                {label}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-[1360px] flex-wrap justify-between gap-3 border-t border-slate-200 pt-6 text-xs">
        <p>© {new Date().getFullYear()} Codebricket. All rights reserved.</p>
        <p>Made for people who build.</p>
      </div>
    </footer>
  );
}
