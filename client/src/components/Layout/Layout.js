import React from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
