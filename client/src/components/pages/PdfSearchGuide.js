import React from "react";

const Step = ({ number, title, children }) => (
  <div className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
    <div className="flex items-center justify-center min-w-[38px] h-[38px] rounded-full bg-blue-600 text-white font-semibold">
      {number}
    </div>
    <div>
      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h5>
      <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

const PdfSearchGuide = () => {
  return (
    <section className="min-h-screen mt-20 px-4 py-10 bg-gray-50 dark:bg-[#0b0f19]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Find & Download PDFs Easily
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn how to search, open and download study materials from PDF Baba
            in seconds — works on Android, iOS and PC.
          </p>
        </div>

        {/* Android */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            📱 Android Users
          </h2>

          <div className="space-y-4">
            <Step number="1" title="Browse Categories">
              Open any subject like Tech, Exams or Notes from homepage.
            </Step>

            <Step number="2" title="Open the PDF">
              Tap the PDF card and press the download button.
            </Step>

            <Step number="3" title="Saved Offline">
              The file automatically saves to your device storage.
            </Step>
          </div>
        </div>

        {/* PC / iOS */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            💻 PC & iOS Users
          </h2>

          <div className="space-y-4">
            <Step number="1" title="Open in Browser">
              Click the PDF to preview it instantly.
            </Step>

            <Step number="2" title="Download">
              Press the download icon to save it permanently.
            </Step>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            📚 Available Categories
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 text-sm font-medium">
            Tech Zone
            </span>
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-sm font-medium">
             Buissness
            </span>
         
          </div>
        </div>

        {/* Search Tip */}
        <div className="p-6 rounded-xl border border-dashed border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            🔎 Tip: Use the search bar and type <b>React JS</b> to quickly find notes.
          </p>
        </div>

        {/* Help */}
        <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
          Need help? Our support team is always ready to assist you 😊
        </div>

      </div>
    </section>
  );
};

export default PdfSearchGuide;