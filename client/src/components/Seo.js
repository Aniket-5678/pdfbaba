import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
const origin = "https://codebricket.com";
const pages = {
  "/notes": [
    "Programming Study Notes & Learning Library",
    "Browse programming and technology notes by category. Find clear explanations and examples, then use tags to guide your next study session on Codebricket.",
  ],
  "/domain-suggestor": [
    "Domain Name Ideas",
    "Explore domain name ideas for your next project on Codebricket.",
  ],
  "/": [
    "Coding Practice, Website Builder & Projects",
    "Build websites with Codebricket Studio, practise programming challenges, follow developer roadmaps, take quizzes and explore source code projects and study notes.",
  ],
  "/service": [
    "Ready-Made Website Projects & Source Code",
    "Browse production-ready website source code, ecommerce stores, SaaS apps, portfolios and business projects. Find a project to customize and launch with Codebricket.",
  ],
  "/builder": [
    "Website Builder & Customizable Website Templates",
    "Create a portfolio, business, blog or shop website from a template or blank canvas. Edit sections and media, preview desktop and mobile, and publish with Codebricket Studio.",
  ],
  "/categories": [
    "Programming & Study Categories",
    "Explore organized programming tutorials, technology topics, debugging guides, computer science fundamentals and exam preparation notes by category.",
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
  const schema = pathname === "/coding-practice"
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Codebricket Online Coding Practice",
        url: canonical,
        description: summary,
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
      }
    : pathname === "/builder"
      ? {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Codebricket Website Builder",
          url: canonical,
          description: summary,
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires a modern web browser",
          featureList: [
            "Website templates for portfolios, businesses, blogs and shops",
            "Editable page sections, text, images and colors",
            "Desktop, tablet and mobile previews",
            "Publish a shareable website",
          ],
        }
      : ["/exam-roadmap", "/practice-quiz"].includes(pathname)
        ? {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: finalTitle,
            url: canonical,
            description: summary,
            isPartOf: { "@type": "WebSite", name: "Codebricket", url: origin },
          }
    : product
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
