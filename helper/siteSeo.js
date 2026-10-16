export const SITE_URL = "https://codebricket.com";
export const staticSeo = {
  "/login": ["Log In", "Log in to your Codebricket account."],
  "/register": [
    "Create Your Account",
    "Create your Codebricket account and start learning.",
  ],
  "/forgetpass": ["Reset Password", "Reset your Codebricket account password."],
  "/sourcecode-order": [
    "My Projects",
    "View your Codebricket project purchases.",
  ],
  "/notes": [
    "Programming Study Notes & Learning Library",
    "Browse programming and technology notes by category. Find clear explanations and examples, then use tags to guide your next study session on Codebricket.",
  ],
  "/": [
    "Coding Practice, Website Builder & Projects",
    "Build websites with Codebricket Studio, practise programming challenges, follow developer roadmaps, take quizzes and explore source code projects and study notes.",
  ],
  "/service": [
    "Website Projects & Source Codes",
    "Explore ready-made website projects and source codes on Codebricket.",
  ],
  "/builder": [
    "Website Builder & Customizable Website Templates",
    "Create a portfolio, business, blog or shop website from a template or blank canvas. Edit sections and media, preview desktop and mobile, and publish with Codebricket Studio.",
  ],
  "/domain-suggestor": [
    "Domain Name Ideas",
    "Find domain name ideas for your next website project.",
  ],
  "/categories": [
    "Study & Developer Categories",
    "Explore technology, debugging, programming and exam preparation learning paths.",
  ],
  "/exam-roadmap": [
    "Developer Roadmaps & Programming Learning Paths",
    "Explore step-by-step developer roadmaps for programming and technology. Follow milestones, check prerequisites and track learning progress at your own pace with Codebricket.",
  ],
  "/practice-quiz": [
    "Programming Quizzes & Technical Practice",
    "Take focused programming and technology quizzes, check your answers and review concepts that need more practice. Use Codebricket quizzes to guide your next study session.",
  ],
  "/coding-practice": [
    "Online Coding Practice & Programming Challenges",
    "Solve programming challenges by language, topic and difficulty. Read examples, use progressive hints, preview frontend tasks and check solutions against configured tests on Codebricket.",
  ],
  "/about": [
    "About Codebricket",
    "Learn about Codebricket source code projects and practical learning resources.",
  ],
  "/contact": [
    "Contact Codebricket",
    "Contact Codebricket for project questions, account support and feedback.",
  ],
  "/privacy": ["Privacy Policy", "Read the Codebricket privacy policy."],
  "/termcondition": [
    "Terms & Conditions",
    "Read the terms for using Codebricket.",
  ],
};
export function seoForPath(pathname) {
  pathname = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const known = staticSeo[pathname];
  const learning =
    /^\/learn\/(technology|code-errors|bachelors|exam-prep)$/.test(pathname);
  const dynamic = /^\/(service|roadmap|play|note|notes-category)\/[^/]+$/.test(
    pathname,
  );
  const privatePage =
    /^\/(dashboard|login|register|forgetpass|sourcecode-order|sourcecode|success)(\/|$)/.test(
      pathname,
    );
  const found = Boolean(known || learning || dynamic || privatePage);
  const title =
    known?.[0] ||
    (learning
      ? pathname.split("/").pop().replace(/-/g, " ")
      : dynamic
        ? "Explore Projects & Learning"
        : "Codebricket");
  const result = {
    title: title + " | Codebricket",
    description:
      known?.[1] ||
      "Discover source code projects and practical learning resources on Codebricket.",
    canonical: SITE_URL + pathname,
    robots: privatePage || !found ? "noindex,follow" : "index,follow",
    found,
  };
  if (pathname === "/coding-practice") {
    result.schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Codebricket Online Coding Practice",
      url: result.canonical,
      description: result.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "Programming challenges across multiple languages",
        "Difficulty and topic filters",
        "Frontend code preview and task checks",
        "Hints and solution explanations",
      ],
    };
  } else if (pathname === "/builder") {
    result.schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Codebricket Website Builder",
      url: result.canonical,
      description: result.description,
      applicationCategory: "DesignApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser",
      featureList: [
        "Website templates for portfolios, businesses, blogs and shops",
        "Editable page sections, text, images and colors",
        "Desktop, tablet and mobile previews",
        "Publish a shareable website",
      ],
    };
  } else if (["/exam-roadmap", "/practice-quiz"].includes(pathname)) {
    result.schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: result.title,
      url: result.canonical,
      description: result.description,
      isPartOf: { "@type": "WebSite", name: "Codebricket", url: SITE_URL },
    };
  }
  return result;
}
export function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
export function injectSeo(html, seo) {
  const clean = html
    .replace(/<title>.*?<\/title>/gis, "")
    .replace(
      /<meta\s+(?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>/gi,
      "",
    )
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "");
  const tags =
    "<title>" +
    escapeHtml(seo.title) +
    '</title><meta name="description" content="' +
    escapeHtml(seo.description) +
    '"/><meta name="robots" content="' +
    seo.robots +
    '"/><link rel="canonical" href="' +
    escapeHtml(seo.canonical) +
      '"/><meta property="og:type" content="website"/><meta property="og:locale" content="en_IN"/><meta property="og:site_name" content="Codebricket"/><meta property="og:title" content="' +
    escapeHtml(seo.title) +
    '"/><meta property="og:description" content="' +
    escapeHtml(seo.description) +
    '"/><meta property="og:url" content="' +
    escapeHtml(seo.canonical) +
    '"/><meta property="og:image" content="' +
    SITE_URL +
    '/social-card.png"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="' +
    escapeHtml(seo.title) +
    '"/><meta name="twitter:description" content="' +
    escapeHtml(seo.description) +
    '"/><meta name="twitter:image" content="' +
    SITE_URL +
    '/social-card.png"/>';
  const schemaTag = seo.schema
    ? '<script type="application/ld+json">' +
      JSON.stringify(seo.schema).replace(/</g, "\\u003c") +
      "</script>"
    : "";
  return clean.replace(
    "</head>",
    tags.replace(/\/>/g, ' data-rh="true"/>') + schemaTag + "</head>",
  );
}
