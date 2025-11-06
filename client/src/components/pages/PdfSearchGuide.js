import React from 'react';

const PdfSearchGuide = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 sm:p-10 rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:text-gray-200 text-gray-800">
      
      <h3 className="text-2xl font-semibold mb-4 text-center">
        How to Find and Download PDFs on PDF Baba
      </h3>

      <p className="mb-6 leading-relaxed">
        Welcome to PDF Baba! Our platform offers a vast collection of high-quality PDFs across various subjects, including technology, science, exams, and more. Here’s how you can easily find and download the PDFs:
      </p>

      <h4 className="text-xl font-medium mt-6 mb-2">For Android Users:</h4>
      <p className="mb-3">On your Android device, follow these simple steps:</p>
      <ol className="list-decimal ml-6 space-y-1 mb-6">
        <li>Browse through the website and find the subject or category you're interested in.</li>
        <li>Once you find the PDF, simply click on the Download button.</li>
        <li>The PDF will be saved to your device for offline access.</li>
      </ol>

      <h4 className="text-xl font-medium mt-6 mb-2">For PC and iOS Users:</h4>
      <p className="mb-3">Follow these steps to view or download PDFs:</p>
      <ol className="list-decimal ml-6 space-y-1 mb-6">
        <li>Click on the PDF link to open it in your browser or PDF viewer.</li>
        <li>You can also click the <strong>Download</strong> button to save it to your device.</li>
      </ol>

      <h4 className="text-xl font-medium mt-6 mb-2">Categories of PDFs Available:</h4>
      <p className="mb-3">We offer PDFs in the following categories:</p>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li><strong>Tech Zone:</strong> Tutorials on React JS, Node JS, JavaScript, HTML, CSS, etc.</li>
      
      </ul>

      <p className="mb-6">
        To search for specific PDFs, use the search bar at the top. Example: type <span className="font-medium">"React JS"</span> to find React JS notes.
      </p>

      <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-md text-center">
        <p>If you need help or have questions, feel free to contact our support team. We are here to assist you! 😊</p>
      </div>
    </div>
  );
};

export default PdfSearchGuide;
