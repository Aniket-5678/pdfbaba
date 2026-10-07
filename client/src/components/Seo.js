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
    "Ready-Made Website Projects & Source Code",
    "Browse production-ready website source code, ecommerce stores, SaaS apps, portfolios and business projects. Find a project to customize and launch with Codebricket.",
  ],
  "/builder": [
    "Free Website Builder & Customizable Templates",
    "Build a website with customizable ecommerce, portfolio, CRM, business and agency templates. Edit sections, colors and pages, then publish your site with Codebricket Studio.",
  ],
  "/categories": [
    "Programming & Study Categories",
    "Explore organized programming tutorials, technology topics, debugging guides, computer science fundamentals and exam preparation notes by category.",
  ],
  "/exam-roadmap": [
    "Developer Roadmaps & Learning Paths",
    "Follow structured developer roadmaps and step-by-step learning paths for programming, web development and career-ready technical skills.",
  ],
  "/practice-quiz": [
    "Programming Practice Quizzes",
    "Practice programming and technical concepts with online quizzes. Test your knowledge, review what you know and keep building your skills.",
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
  const pageTitle = title || known?.[0] || label;
  const finalTitle = pageTitle + " | Codebricket";
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
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={product?.thumbnail ? new URL(product.thumbnail, origin).href : origin + "/social-card.png"} />
      <meta property="og:image:alt" content={product?.title || "Codebricket learning and source code projects"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codebricket" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={origin + "/social-card.png"} />
      <script type="application/ld+json">
        {JSON.stringify(schema).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
