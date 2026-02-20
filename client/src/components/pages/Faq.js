import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Faq = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is PDFBaba?",
      answer:
        "PDFBaba is a platform where you can directly access and download educational PDFs including board question papers, programming notes and learning materials without creating an account.",
    },
    {
      question: "How can I download the PDFs?",
      answer:
        "Simply click the download button available on each PDF page. Free PDFs download instantly while premium files unlock after purchase.",
    },
    {
      question: "What PDFs are available?",
      answer:
        "We provide Maharashtra Board, CBSE question papers, programming tutorials, development notes, business & learning resources.",
    },
    {
      question: "Do I need an account?",
      answer:
        "No account is required for free PDFs. Some premium resources may require login for secure access.",
    },
    {
      question: "Is content updated regularly?",
      answer:
        "Yes, we frequently update materials to keep them relevant with latest syllabus and technologies.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact us through the Contact page available in the footer section of the website.",
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-16 font-[Poppins]">
      <div
        className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 transition-all duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] border border-white/10 shadow-2xl shadow-black/40 text-white"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-gray-200 shadow-xl text-gray-900"
        }`}
      >
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-4xl font-bold mb-10 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden
                ${
                  isDark
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left px-5 py-4"
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 pb-5 text-sm sm:text-[0.95rem] leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;