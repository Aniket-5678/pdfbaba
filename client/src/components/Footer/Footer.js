import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RingLoader } from "react-spinners";

import facbookImage from "../images/facebook.png";
import linkdinImage from "../images/linkdin.png";
import instagramImage from "../images/instagram.png";
import twitterImage from "../images/twitter.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/email/send-email", { email });

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

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      {/* MAIN FOOTER */}

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {/* ABOUT */}

        <div className="lg:col-span-2">
          <h3 className="text-white text-lg font-semibold mb-4">
            About PDFBaba
          </h3>

          <p className="text-sm leading-relaxed">
            PDFBaba is a learning platform where students can explore quality
            study materials, PDFs, career roadmaps, quizzes and educational
            resources designed to help learners grow faster.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            <li><Link className="hover:text-white transition" to="/">Home</Link></li>
            <li><Link className="hover:text-white transition" to="/about">About</Link></li>
            <li><Link className="hover:text-white transition" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-white transition" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-white transition" to="/termcondition">Terms</Link></li>
            <li><Link className="hover:text-white transition" to="/register">Signup</Link></li>
            <li><Link className="hover:text-white transition" to="/login">Login</Link></li>

          </ul>
        </div>

        {/* CONTACT */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Contact
          </h3>

          <p className="text-sm">Email: pdfbaba07@gmail.com</p>
         
        </div>

        {/* SOCIAL */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="https://www.facebook.com/share/18Ynq6wtQX/?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facbookImage}
                alt="facebook"
                className="w-8 hover:scale-110 transition"
              />
            </a>

            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img
                src={twitterImage}
                alt="twitter"
                className="w-8 hover:scale-110 transition"
              />
            </a>

            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <img
                src={linkdinImage}
                alt="linkedin"
                className="w-8 hover:scale-110 transition"
              />
            </a>

            <a
              href="https://www.instagram.com/pdf_baba"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={instagramImage}
                alt="instagram"
                className="w-8 hover:scale-110 transition"
              />
            </a>

          </div>
        </div>

      </div>

      {/* NEWSLETTER */}

      <div className="border-t border-gray-700">

        <div className="max-w-4xl mx-auto px-6 py-10 text-center">

          <h3 className="text-white text-lg font-semibold mb-3">
            Subscribe to Our Newsletter
          </h3>

          <p className="text-sm mb-6">
            Get latest PDFs, notes, quizzes and learning resources directly in
            your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded-md text-black w-full sm:w-72"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex justify-center items-center"
            >
              {loading ? <RingLoader size={22} color="#fff" /> : "Subscribe"}
            </button>

          </form>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-400">
        © 2026 PDFBaba. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;