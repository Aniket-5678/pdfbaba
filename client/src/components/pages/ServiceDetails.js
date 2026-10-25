import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Seo from "../Seo";
import Layout from "../Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { ShoppingCart, ExternalLink, ShieldCheck, Download, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

/* ============ Skeleton ============ */
const Skeleton = () => (
  <div className="animate-pulse grid md:grid-cols-2 gap-10">
    <div className="space-y-4">
      <div className="h-[260px] rounded-xl bg-gray-200 sm:h-[380px]"></div>
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-16 w-20 rounded bg-gray-200 sm:h-20 sm:w-24"
          ></div>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-6 w-2/3 rounded bg-gray-200"></div>
      <div className="h-20 rounded bg-gray-200"></div>
      <div className="h-10 w-32 rounded bg-gray-200"></div>
    </div>
  </div>
);

const ServiceDetails = () => {
  const [auth] = useAuth();
  const user = auth.user;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const projectText = `${service?.title || ""} ${service?.description || ""}`.toLowerCase();
  const projectKind = /shop|store|ecommerce|e-commerce|cart|product/.test(projectText)
    ? { title: "What to review in this store project", text: "For a store experience, trace the path from product discovery to the next action. Review how product information, imagery, navigation and mobile layouts work together. Before adapting checkout or payment behavior, confirm which integrations are included and configure them for your own environment." }
    : /portfolio|agency|creative|designer/.test(projectText)
      ? { title: "Make the portfolio tell a clear story", text: "When exploring a portfolio, look at how work samples are grouped and what context accompanies each one. Replace sample projects with work you can describe, keep image crops consistent, and make sure contact details and links lead to the right destination." }
      : /dashboard|saas|admin|analytics/.test(projectText)
        ? { title: "Understand the dashboard structure", text: "For a dashboard, inspect how navigation, summary information and detailed views are separated. Check empty, loading and error states as well as the populated screen, then connect the interface to data and access rules appropriate for your own application." }
        : { title: "Explore the project before customizing it", text: "Use the live preview to understand the visitor journey, then compare it with the supplied project description. Review the setup instructions and available files before changing the interface. Test your edits at narrow and wide screen sizes, and verify that navigation, forms and external links behave as intended." };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/${id}`);
      const data = res.data.service ? res.data.service : res.data;
      setService(data);
      setMainImage(data.thumbnail || data.multipleImages?.[0] || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast("Log in to continue with your purchase.", { icon: "🔒" });
      navigate("/login", { state: { from: { pathname: location.pathname, search: location.search, hash: location.hash } } });
      return;
    }
    navigate(`/sourcecode/buy/${service._id}`);
  };

  const handleViewSource = () => {
    if (!service?.viewLink) {
      toast.error("No live preview is available for this project yet.");
      return;
    }
    window.open(service.viewLink, "_blank");
  };

  return (
    <Layout>
      {service && (
        <Seo
          title={service.title}
          description={(
            service.description ||
            "Explore this source code project on Codebricket."
          )
            .replace(/<[^>]*>/g, "")
            .slice(0, 170)}
          product={service}
        />
      )}
      <div className="min-h-[75vh] bg-gradient-to-b from-violet-50/70 via-white to-white px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
       <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex min-w-0 items-center gap-2 text-xs font-medium text-slate-500 sm:mb-7 sm:text-sm"><Link to="/service" className="shrink-0 hover:text-violet-600">Projects</Link><span>/</span><span className="truncate text-slate-800">{service?.title || "Project details"}</span></div>
        {!service ? (
          <Skeleton />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            {/* ===== LEFT IMAGE GALLERY ===== */}
            <div>
              <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-violet-100/60 sm:h-[400px] sm:rounded-[28px] lg:h-[500px]">
                <img
                  src={mainImage}
                  alt={service.title || "Preview"}
                  className="h-full w-full object-contain object-center"
                />
              </div>

              {/* thumbnails */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3">
                {[service.thumbnail, ...(service.multipleImages || [])]
                  .filter(Boolean)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${service.title} preview ${i + 1}`}
                      onClick={() => setMainImage(img)}
                      className={`h-16 w-20 shrink-0 cursor-pointer rounded-lg border-2 object-cover transition sm:h-20 sm:w-24
                        ${
                          mainImage === img
                            ? "border-indigo-600 scale-105"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                    />
                  ))}
              </div>
            </div>

            {/* ===== RIGHT CONTENT ===== */}
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:rounded-[28px] sm:p-8 lg:sticky lg:top-24 lg:p-9">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold text-violet-700 sm:mb-5 sm:text-xs"><Sparkles size={14}/> INSTANT DIGITAL ACCESS</div>
              {/* Title */}
              <h1 className="break-words text-[1.35rem] font-bold leading-snug tracking-[-0.025em] text-slate-950 sm:text-[1.65rem] lg:text-[1.8rem]">
                {service.title}
              </h1>

              {/* Description */}
              <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base">
                {service.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1 border-t border-slate-100 pt-5 sm:mt-7 sm:pt-6">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                  ₹{service.price}
                </span>
                <span className="pb-1 text-sm text-slate-500">One-time payment</span>
              </div>

              {/* Buttons */}
              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
                <button
                  onClick={handleBuyNow}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-violet-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 sm:px-6 sm:py-4"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>

                <button
                  onClick={handleViewSource}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 sm:px-6 sm:py-4"
                >
                  <ExternalLink size={18} />
                  Live Preview
                </button>
              </div>

              {/* What you get */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 sm:mt-7 sm:p-5">
                <h3 className="mb-4 font-bold text-slate-900">Included with your purchase</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><Download size={17} className="text-violet-600"/> Complete source code and setup guide</li>
                  <li className="flex gap-2"><ShieldCheck size={17} className="text-violet-600"/> Lifetime access to your files</li>
                  <li className="flex gap-2"><Sparkles size={17} className="text-violet-600"/> Ready-to-customize project structure</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {service && <section className="mt-10 grid gap-7 border-t border-slate-200 pt-8 sm:grid-cols-2"><article><h2 className="text-lg font-bold text-slate-950">{projectKind.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{projectKind.text}</p></article><article><h2 className="text-lg font-bold text-slate-950">A useful customization checklist</h2><p className="mt-3 text-sm leading-7 text-slate-600">Start by running the project as provided and noting its framework, dependencies and configuration. Change one area at a time, keep credentials out of source files, and test the main user journey after each meaningful change. This makes the code easier to understand and helps you catch regressions early.</p></article></section>}
        {service && (
          <section className="mt-8 grid gap-7 border-t border-slate-200 pt-8 sm:grid-cols-2">
            <article>
              <h2 className="text-lg font-bold text-slate-950">Project purpose and features</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use the project description above to understand its stated purpose, then compare it with the screenshots and live preview. This helps you see which audience the interface appears to serve and what tasks it supports. The listing does not provide a separate feature specification, so check each visible page, link and form in the preview before treating a behavior as part of the project.
              </p>
            </article>
            <article>
              <h2 className="text-lg font-bold text-slate-950">Technologies and setup</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The project listing does not identify a technology stack or configuration requirements. Check the included setup guide and source files to confirm the framework, runtime, dependencies and any services the project actually uses. Follow those project-specific instructions; do not assume that an API, backend or database is included unless the files document it.
              </p>
            </article>
            <article>
              <h2 className="text-lg font-bold text-slate-950">What you can learn</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                As you review the source, connect a screen in the preview to the files that render and style it. Trace one interaction from the user’s input to the visible result, then make a small change and test it. Depending on the project, this can build practical experience with interface structure, styling, application flow, configuration and debugging.
              </p>
            </article>
            <article>
              <h2 className="text-lg font-bold text-slate-950">Use cases and possible improvements</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                A source project can serve as a learning reference or a starting point for a customized site when its included code fits your needs. After reviewing what is already present, consider improvements such as clearer keyboard focus, more helpful empty or error states, additional tests, or refinements for smaller screens. These are ideas to evaluate, not features claimed to be included.
              </p>
            </article>
          </section>
        )}
       </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
