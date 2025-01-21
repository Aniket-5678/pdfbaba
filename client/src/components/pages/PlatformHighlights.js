import React from 'react';
import '../style/style.css'; // Ensure this CSS file is styled accordingly

const highlights = [
  {
    id: 1,
    title: 'Maharashtra Board Resources',
    description: 'Get access to comprehensive study materials, including textbooks, previous year papers, and guides for Maharashtra Board students. Perfect for HSC and SSC exam preparation.',
    icon: '📚',
  },
  {
    id: 2,
    title: 'Techzone Learning Hub',
    description: 'Explore a wide range of resources focused on technology, from Web Development tutorials to the latest insights on tech trends, coding challenges, and more.',
    icon: '💻',
  },
  {
    id: 3,
    title: 'Space Studies & Scientific Insights',
    description: 'Delve into the mysteries of space with detailed study materials on astrophysics, astronomy, and cutting-edge space research. A perfect resource for science enthusiasts.',
    icon: '🚀',
  },
  {
    id: 4,
    title: 'Spiritual Insights & Personal Growth',
    description: 'Enhance your life with spiritual insights and personal development resources. Access a range of materials on mindfulness, meditation, and spiritual practices for holistic growth.',
    icon: '🧘‍♀️',
  },
];

const PlatformHighlights = () => {
  return (
    <div className="platform-highlights">
      <h2 className="section-title">Why Choose PDF Baba?</h2>
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
