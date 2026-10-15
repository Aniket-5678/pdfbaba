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
    "Study Notes & Learning Library",
    "Explore study notes, practical examples and learning resources on Codebricket.",
  ],
  "/": [
    "Build Faster. Create Bigger.",
    "Discover ready-made website projects, source codes, developer roadmaps and practical learning resources. Build your next idea with Codebricket.",
  ],
  "/service": [
    "Website Projects & Source Codes",
    "Explore ready-made website projects and source codes on Codebricket.",
  ],
  "/builder": [
    "Free Website Builder & Customizable Templates",
    "Build a website with customizable ecommerce, portfolio, CRM, business and agency templates. Edit sections, colors and pages, then publish your site with Codebricket Studio.",
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
    "Developer Learning Roadmaps",
    "Find structured learning paths and step-by-step developer roadmaps.",
  ],
  "/practice-quiz": [
    "Practice Quizzes",
    "Practice your knowledge and grow your skills with Codebricket quizzes.",
  ],
  "/coding-practice": [
    "Online Coding Practice: Challenges in Any Programming Language",
    "Practice coding online with JavaScript, Python, HTML, CSS and more. Filter by topic or difficulty, write solutions, preview frontend tasks and check your answers.",
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
