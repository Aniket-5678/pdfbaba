import React from 'react';
import '../style/style.css'; // Ensure this CSS file is styled accordingly

const highlights = [
  {
    id: 1,
    title: 'Comprehensive Learning Resources',
    description: 'Access a vast library of high-quality PDFs and educational materials, from textbooks to practice papers.',
    icon: '📚', // Example icon, replace with relevant images or icons
  },
  {
    id: 2,
    title: 'Expertly Curated Content',
    description: 'Our content is curated by experts to ensure you get the most relevant and accurate information.',
    icon: '🧠',
  },
  {
    id: 3,
    title: 'Interactive Learning Experience',
    description: 'Engage with interactive features and resources designed to enhance your learning journey.',
    icon: '💻',
  },
  {
    id: 4,
    title: '24/7 Access',
    description: 'Learn at your own pace with round-the-clock access to all resources and support.',
    icon: '⏰',
  },
];

const PlatformHighlights = () => {
  return (
    <div className="platform-highlights">
      <h2 className="section-title">Why Choose Us?</h2>
      <div className="highlights-container">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="highlight-card">
            <div className="highlight-icon">{highlight.icon}</div>
            <h3 className="highlight-title">{highlight.title}</h3>
            <p className="highlight-description">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformHighlights;
