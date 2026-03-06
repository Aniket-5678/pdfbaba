import React from "react";
import { useTheme } from "../context/ThemeContext";

const Step = ({ number, title, children, isDark }) => (
  <div
    className={`flex gap-4 p-4 rounded-xl border shadow-sm transition
    ${
      isDark
        ? "border-white/10 bg-white/5"
        : "border-gray-200 bg-white"
    }`}
  >
    <div className="flex items-center justify-center min-w-[38px] h-[38px] rounded-full bg-blue-600 text-white font-semibold">
      {number}
    </div>

    <div>
      <h5 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h5>

      <div
        className={`text-sm leading-relaxed ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);

const PdfSearchGuide = () => {

  const [theme] = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-screen mt-20 px-4 py-10 transition-colors duration-500
      ${
        isDark
          ? "bg-[#0b0f19]"
          : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <h1
            className={`text-2xl sm:text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Find & Download PDFs Easily
          </h1>

          <p
            className={`mt-3 max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Learn how to search, open and download study materials from PDF Baba
            in seconds — works on Android, iOS and PC.
          </p>

        </div>

        {/* Android */}

        <div className="mb-12">

          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            📱 Android Users
          </h2>

          <div className="space-y-4">

            <Step number="1" title="Browse Categories" isDark={isDark}>
              Open any subject like Tech, Exams or Notes from homepage.
            </Step>

            <Step number="2" title="Open the PDF" isDark={isDark}>
              Tap the PDF card and press the download button.
            </Step>

            <Step number="3" title="Saved Offline" isDark={isDark}>
              The file automatically saves to your device storage.
            </Step>

          </div>

        </div>

        {/* PC / iOS */}

        <div className="mb-12">

          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            💻 PC & iOS Users
          </h2>

          <div className="space-y-4">

            <Step number="1" title="Open in Browser" isDark={isDark}>
              Click the PDF to preview it instantly.
            </Step>

            <Step number="2" title="Download" isDark={isDark}>
              Press the download icon to save it permanently.
            </Step>

          </div>

        </div>

        {/* Categories */}

        <div className="mb-12">

          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            📚 Available Categories
          </h2>

          <div className="flex flex-wrap gap-3">

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                isDark
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Tech Zone
            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                isDark
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              Business
            </span>

          </div>

        </div>

        {/* Search Tip */}

        <div
          className={`p-6 rounded-xl border border-dashed text-center
          ${
            isDark
              ? "border-white/20 bg-white/5 text-gray-300"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          🔎 Tip: Use the search bar and type <b>React JS</b> to quickly find notes.
        </div>

        {/* Help */}

        <div
          className={`mt-10 text-center text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Need help? Our support team is always ready to assist you 😊
        </div>

      </div>
    </section>
  );
};

export default PdfSearchGuide;