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
      .map((route) => "<url><loc>" + SITE_URL + route + "</loc></url>")
      .join("") +
    "</urlset>",
);
console.log(
  "Generated SEO HTML and sitemap for " + routes.size + " public pages.",
);
