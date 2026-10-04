import fs from "node:fs";
import path from "node:path";
import {
  SITE_URL,
  staticSeo,
  seoForPath,
  injectSeo,
} from "../helper/siteSeo.js";
const build = path.resolve(process.argv[2] || "client/build");
const template = fs.readFileSync(path.join(build, "index.html"), "utf8");
const routes = new Map(
  Object.keys(staticSeo).map((route) => [route, seoForPath(route)]),
);
for (const topic of ["technology", "code-errors", "bachelors", "exam-prep"])
  routes.set("/learn/" + topic, seoForPath("/learn/" + topic));
if (process.argv[3]) {
  const response = await fetch(process.argv[3], {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Cannot load source code projects for SEO");
  const data = await response.json();
  const projects = Array.isArray(data) ? data : data.services || [];
  for (const project of projects) {
    if (!/^[a-f0-9]{24}$/.test(project._id)) continue;
    const route = "/service/" + project._id;
    routes.set(route, {
      ...seoForPath(route),
      title: project.title + " | Codebricket",
      description: (
        project.description ||
        "Explore this source code project on Codebricket."
      )
        .replace(/<[^>]*>/g, "")
        .slice(0, 170),
    });
  }
}

if (process.argv[3]) {
  const base = new URL(process.argv[3]).origin;
  for (const [endpoint, prefix, pick] of [
    ["/api/notes", "/note/", "notes"],
    ["/api/v1/roadmaps", "/roadmap/", null],
    ["/api/v1/quizzes/all", "/play/", null],
    ["/api/v1/category/get-category", "/notes-category/", "category"],
  ]) {
    const response = await fetch(base + endpoint, {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      throw new Error("Cannot load learning metadata: " + endpoint);
    const data = await response.json();
    const items =
      pick === "category"
        ? [...(data.noteCategories || []), ...(data.category || [])]
        : pick
          ? data[pick] || []
          : data;
    for (const item of items) {
      const key =
        prefix === "/note/" || prefix === "/notes-category/"
          ? item.slug
          : item._id;
      if (!key || !/^[a-zA-Z0-9-]+$/.test(key)) continue;
      const route = prefix + key;
      routes.set(route, {
        ...seoForPath(route),
        title:
          (item.title || item.name || item.category || "Learning") +
          " | Codebricket",
        description: (
          item.excerpt ||
          item.description ||
          "Explore this learning resource on Codebricket."
        )
          .replace(/<[^>]*>/g, "")
          .slice(0, 170),
      });
    }
  }
}

for (const [route, seo] of routes) {
  const directory = path.join(build, route.slice(1));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    path.join(directory, "index.html"),
    injectSeo(template, seo),
  );
}
fs.writeFileSync(
  path.join(build, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    [...routes.keys()]
      .filter((route) => routes.get(route).robots === "index,follow")
      .map((route) => "<url><loc>" + SITE_URL + route + "</loc></url>")
      .join("") +
    "</urlset>",
);
console.log(
  "Generated SEO HTML and sitemap for " + routes.size + " public pages.",
);
