import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
const origin = "https://codebricket.com";
const pages = {
  "/notes": [
    "Study Notes & Learning Library",
    "Explore study notes, practical examples and learning resources on Codebricket.",
  ],
  "/domain-suggestor": [
    "Domain Name Ideas",
    "Explore domain name ideas for your next project on Codebricket.",
  ],
  "/": [
    "Build Faster. Create Bigger.",
    "Discover ready-made website projects, source codes, developer roadmaps and practical learning resources. Build your next idea with Codebricket.",
  ],
  "/service": [
    "Website Projects & Source Codes",
    "Explore ready-made website projects and source codes. Find your next ecommerce, portfolio, SaaS or business project on Codebricket.",
  ],
  "/categories": [
    "Study & Developer Categories",
    "Explore technology, debugging, programming fundamentals and exam preparation learning paths on Codebricket.",
  ],
  "/exam-roadmap": [
    "Developer Learning Roadmaps",
    "Find structured learning paths and step-by-step roadmaps to grow your development skills.",
  ],
  "/practice-quiz": [
    "Practice Quizzes",
    "Test your knowledge and build your skills with Codebricket practice quizzes.",
  ],
  "/about": [
    "About Codebricket",
    "Learn about Codebricket, our source code marketplace and practical developer learning resources.",
  ],
  "/contact": [
    "Contact Codebricket",
    "Get in touch with Codebricket for project questions, account support and feedback.",
  ],
  "/privacy": [
    "Privacy Policy",
    "Read how Codebricket handles and protects your information.",
  ],
  "/termcondition": [
    "Terms & Conditions",
    "Read the terms for using Codebricket projects, purchases and learning resources.",
  ],
  "/login": ["Log In", "Log in to your Codebricket account."],
  "/register": [
    "Create Your Account",
    "Join Codebricket to discover projects and build your next idea.",
  ],
};
const publicPatterns =
  /^\/(service\/[a-f0-9]{24}|note\/[^/]+|notes-category\/[^/]+|learn\/(technology|code-errors|bachelors|exam-prep)|roadmap\/[^/]+|play\/[^/]+)$/;
export default function Seo({ title, description, product }) {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname === "/" ? "/" : rawPathname.replace(/\/+$/, "");
  const known = pages[pathname];
  const detail = publicPatterns.test(pathname);
  const label = pathname.startsWith("/learn/")
    ? pathname.split("/").pop().replace(/-/g, " ")
    : pathname.startsWith("/service/")
      ? "Website Project"
      : pathname.startsWith("/roadmap/")
        ? "Learning Roadmap"
        : "Codebricket";
  const finalTitle = (title || known?.[0] || label) + " | Codebricket";
  const summary =
    description ||
    known?.[1] ||
    "Explore source code projects and practical learning resources on Codebricket. Build faster and grow your developer skills.";
  const canonical =
    origin + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
  const privatePage =
    /^\/(dashboard|login|register|forgetpass|sourcecode|success)/.test(
      pathname,
    ) ||
    (!known && !detail);
  const schema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: summary,
        image: product.thumbnail
          ? new URL(product.thumbnail, origin).href
          : origin + "/social-card.png",
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "INR",
          url: canonical,
          availability: "https://schema.org/InStock",
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": pathname === "/" ? "WebSite" : "WebPage",
        name: finalTitle,
        url: canonical,
        description: summary,
      };
  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={summary} />
      <meta
        name="robots"
        content={privatePage ? "noindex,follow" : "index,follow"}
      />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Codebricket" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={origin + "/social-card.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={origin + "/social-card.png"} />
      <script type="application/ld+json">
        {JSON.stringify(schema).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
