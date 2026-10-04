export const SITE_URL = "https://codebricket.com";
export const staticSeo = {
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
  return {
    title: title + " | Codebricket",
    description:
      known?.[1] ||
      "Discover source code projects and practical learning resources on Codebricket.",
    canonical: SITE_URL + pathname,
    robots: privatePage || !found ? "noindex,follow" : "index,follow",
    found,
  };
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
    '"/><meta property="og:site_name" content="Codebricket"/><meta property="og:title" content="' +
    escapeHtml(seo.title) +
    '"/><meta property="og:description" content="' +
    escapeHtml(seo.description) +
    '"/><meta property="og:url" content="' +
    escapeHtml(seo.canonical) +
    '"/><meta property="og:image" content="' +
    SITE_URL +
    '/social-card.png"/><meta name="twitter:card" content="summary_large_image"/>';
  return clean.replace(
    "</head>",
    tags.replace(/\/>/g, ' data-rh="true"/>') + "</head>",
  );
}
