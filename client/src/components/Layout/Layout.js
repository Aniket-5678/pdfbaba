import React from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
