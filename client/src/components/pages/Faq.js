import React from "react";
import { useTheme } from "../context/ThemeContext";

const Faq = () => {
  const [theme] = useTheme();

  const faqData = [
    { question: "What is PDFBaba?",
      answer: "PDFBaba is a platform where you can directly access and download a variety of educational PDFs, including Board question papers, course PDFs, and more, without needing to create an account."
    },
    { question: "How can I download the PDFs?",
      answer: "Simply click on the Download button for any PDF. No account is required for free PDFs."
    },
    { question: "What PDFs are available?",
      answer: "We provide Maharashtra Board HSC, CBSE question papers, and various course materials."
    },
    { question: "Do I need an account to access the PDFs?",
      answer: "No, downloading PDFs does not require any account."
    },
    { question: "Is the content updated regularly?",
      answer: "Yes, we update our content frequently to provide the latest materials."
    },
    { question: "How do I contact support?",
      answer: "Go to the Contact Us page or email our support team."
    }
  ];

  return (
    <div className={`max-w-3xl mx-auto mt-24 p-6 sm:p-10 rounded-xl shadow-md transition-all duration-300 
      ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>

      <h2 className="text-center text-3xl font-semibold mb-6 tracking-wide">
        FAQs
      </h2>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <details
            key={index}
            className={`group border rounded-lg cursor-pointer transition-all 
             ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"}`}
          >
            <summary className="flex justify-between items-center px-4 py-3 text-lg font-medium select-none">
              {faq.question}
              <span className="transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className={`px-4 py-3 border-t 
               ${theme === "dark" ? "border-gray-700 bg-gray-900 text-gray-300" : "border-gray-300 bg-white text-gray-600"}`}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

    </div>
  );
};

export default Faq;
