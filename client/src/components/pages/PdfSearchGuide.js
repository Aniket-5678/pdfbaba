import React from 'react';
import "../style/style.css";

const PdfSearchGuide = () => {
  return (
    <div className="pdf-search-guide">
      <h3>How to Find and Download PDFs on PDF Baba</h3>
      <p>Welcome to PDF Baba! Our platform offers a vast collection of high-quality PDFs across various subjects, including technology, science, exams, and more. Here’s how you can easily find and download the PDFs:</p>

      <h4>For Android Users:</h4>
      <p>On your Android device, follow these simple steps to find and download PDFs:</p>
      <ol>
        <li>Browse through the website and find the subject or category you're interested in.</li>
        <li>Once you find the PDF, simply click on the Download button.</li>
        <li>The PDF will be saved to your device for offline access.</li>
      </ol>

      <h4>For PC and iOS Users:</h4>
      <p>If you're using a PC or an iOS device, follow these simple steps to view and download PDFs:</p>
      <ol>
      <li>Click on the PDF link to open and view it directly in your browser or PDF viewer.</li>
      <li>You can also click on the **Download** button provided to save the PDF directly to your device.</li>
      </ol>

      <h4>Categories of PDFs Available:</h4>
      <p>We offer PDFs in the following categories to support your educational needs:</p>
      <ul>
        <li><strong>12th Science:</strong> Find comprehensive notes on Mathematics, Physics, Chemistry, and more.</li>
        <li><strong>Tech Zone:</strong> Access PDF tutorials and guides on technologies like React JS, Node JS, JavaScript, HTML, and CSS.</li>
        <li><strong>Spiritual Insights:</strong> Explore PDF notes on the main chakras, meditation, and spiritual practices.</li>
        <li><strong>Space Studies:</strong> Learn about Earth and other celestial bodies with our detailed space study PDFs.</li>
      </ul>

      <p>To search for specific PDFs, use the search bar at the top of the website. Just type in the subject or technology you're interested in, and the results will display a list of relevant PDFs. For example, search for "React JS" to find all related notes on React JS.</p>

      <div className="contact-info">
        <p>If you need any help or have any questions, feel free to contact our support team. We're here to assist you!</p>
      </div>
    </div>
  );
};

export default PdfSearchGuide;
