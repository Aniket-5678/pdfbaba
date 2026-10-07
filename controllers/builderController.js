import slugify from "slugify";
import { BuilderSite, DeveloperRequest } from "../models/siteBuilder.model.js";

const cleanBlocks = (blocks) => Array.isArray(blocks) ? blocks.slice(0, 40).map((b) => ({
  id: String(b.id || "").slice(0, 80), type: String(b.type || "text").slice(0, 30),
  title: String(b.title || "").slice(0, 180), text: String(b.text || "").slice(0, 2000),
  eyebrow: String(b.eyebrow || "").slice(0, 100), buttonText: String(b.buttonText || "").slice(0, 80),
  image: String(b.image || "").slice(0, 500), link: String(b.link || "").slice(0, 500),
  width: Math.max(25, Math.min(100, Number(b.width) || 100)),
  height: Math.max(120, Math.min(1200, Number(b.height) || 320)),
  background: /^#[0-9a-f]{6}$/i.test(b.background || "") ? b.background : "",
  textColor: /^#[0-9a-f]{6}$/i.test(b.textColor || "") ? b.textColor : "",
  headingVisible: b.headingVisible !== false, contentVisible: b.contentVisible !== false,
  buttonVisible: b.buttonVisible !== false,
  products: Array.isArray(b.products) ? b.products.slice(0, 12).map((p) => ({
    id: String(p.id || "").slice(0, 80), title: String(p.title || "New product").slice(0, 100),
    price: String(p.price || "0").replace(/[^0-9.]/g, "").slice(0, 12), image: String(p.image || "").slice(0, 500),
  })) : [],
})) : [];
const cleanPages = (pages) => Array.isArray(pages) ? pages.slice(0, 10).map((p, i) => ({
  id: String(p.id || `page-${i + 1}`).slice(0, 80),
  title: String(p.title || `Page ${i + 1}`).trim().slice(0, 60),
  slug: String(p.slug || `page-${i + 1}`).toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 70),
  blocks: cleanBlocks(p.blocks),
})) : [];

export async function mySites(req, res) {
  res.json(await BuilderSite.find({ owner: req.user._id }).sort({ updatedAt: -1 }).lean());
}
export async function createSite(req, res) {
  const name = String(req.body.name || "My website").trim().slice(0, 80);
  const base = slugify(name, { lower: true, strict: true }) || "my-site";
  const slug = `${base}-${String(req.user._id).slice(-5)}-${Date.now().toString(36)}`;
  const blocks = cleanBlocks(req.body.blocks);
  const pages = cleanPages(req.body.pages);
  const site = await BuilderSite.create({ owner: req.user._id, name, slug, template: req.body.template || "atelier", theme: req.body.theme || {}, blocks: pages[0]?.blocks || blocks, pages: pages.length ? pages : [{ id: "home", title: "Home", slug: "home", blocks }] });
  res.status(201).json(site);
}
export async function updateSite(req, res) {
  const site = await BuilderSite.findOne({ _id: req.params.id, owner: req.user._id });
  if (!site) return res.status(404).json({ message: "Website not found" });
  if (typeof req.body.slug === "string") {
    const slug = slugify(req.body.slug, { lower: true, strict: true }).slice(0, 60);
    if (slug.length < 3) return res.status(400).json({ message: "URL name must be at least 3 characters" });
    const conflict = await BuilderSite.exists({ slug, _id: { $ne: site._id } });
    if (conflict) return res.status(409).json({ message: "That URL name is already in use. Try another one." });
    site.slug = slug;
  }
  if (req.body.name) site.name = String(req.body.name).slice(0, 80);
  if (req.body.template) site.template = String(req.body.template).slice(0, 40);
  if (req.body.theme && typeof req.body.theme === "object") site.theme = req.body.theme;
  if (req.body.blocks) site.blocks = cleanBlocks(req.body.blocks);
  if (req.body.pages) {
    site.pages = cleanPages(req.body.pages);
    if (site.pages[0]) site.blocks = site.pages[0].blocks;
  }
  if (typeof req.body.published === "boolean") site.published = req.body.published;
  await site.save(); res.json(site);
}
export async function publicSite(req, res) {
  const site = await BuilderSite.findOne({ slug: req.params.slug, published: true }).select("name slug template theme blocks pages").lean();
  if (!site) return res.status(404).json({ message: "Published website not found" });
  const pages = site.pages?.length ? site.pages : [{ id: "home", title: "Home", slug: "home", blocks: site.blocks || [] }];
  const page = pages.find((p) => p.slug === (req.query.page || "home")) || pages[0];
  res.json({ ...site, pages, activePage: page });
}
export async function uploadImage(req, res) {
  if (!req.file) return res.status(400).json({ message: "Choose an image first" });
  res.status(201).json({ url: `/uploads/builder/${req.file.filename}` });
}
export async function submitDeveloperRequest(req, res) {
  const { name, email, projectType, budget, message } = req.body;
  if (![name, email, projectType, message].every((v) => typeof v === "string" && v.trim())) return res.status(400).json({ message: "Please complete all required fields" });
  const request = await DeveloperRequest.create({ owner: req.user._id, name: name.trim().slice(0, 100), email: email.trim().slice(0, 160), projectType: projectType.slice(0, 80), budget: String(budget || "Flexible").slice(0, 80), message: message.trim().slice(0, 3000) });
  res.status(201).json({ success: true, id: request._id });
}
export async function adminRequests(_req, res) {
  res.json(await DeveloperRequest.find().populate("owner", "fullName email").sort({ createdAt: -1 }).lean());
}
export async function updateRequestStatus(req, res) {
  const status = ["new", "contacted", "closed"].includes(req.body.status) ? req.body.status : null;
  if (!status) return res.status(400).json({ message: "Invalid status" });
  const request = await DeveloperRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!request) return res.status(404).json({ message: "Request not found" });
  res.json(request);
}
