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
      <div className="h-[380px] rounded-xl bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-24 h-20 bg-gray-300 dark:bg-gray-700 rounded"
          ></div>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
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
      <div className="min-h-[75vh] bg-gradient-to-b from-violet-50/70 via-white to-white px-4 pb-20 pt-28 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6">
       <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex items-center gap-2 text-sm font-medium text-slate-500"><Link to="/service" className="hover:text-violet-600">Projects</Link><span>/</span><span className="truncate text-slate-800 dark:text-slate-200">{service?.title || "Project details"}</span></div>
        {!service ? (
          <Skeleton />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            {/* ===== LEFT IMAGE GALLERY ===== */}
            <div>
              <div className="relative h-[340px] w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-violet-100/60 dark:border-white/10 dark:bg-slate-900 sm:h-[500px]">
                <img
                  src={mainImage}
                  alt={service.title || "Preview"}
                  className="w-full h-full object-contain object-center"
                />
              </div>

              {/* thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {[service.thumbnail, ...(service.multipleImages || [])]
                  .filter(Boolean)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${service.title} preview ${i + 1}`}
                      onClick={() => setMainImage(img)}
                      className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 transition
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
            <div className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900 sm:p-9 lg:sticky lg:top-24">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"><Sparkles size={14}/> INSTANT DIGITAL ACCESS</div>
              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {service.title}
              </h1>

              {/* Description */}
              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {service.description}
              </p>

              {/* Price */}
              <div className="mt-7 flex items-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  ₹{service.price}
                </span>
                <span className="pb-1 text-sm text-slate-500">One-time payment</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>

                <button
                  onClick={handleViewSource}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                >
                  <ExternalLink size={18} />
                  Live Preview
                </button>
              </div>

              {/* What you get */}
              <div className="mt-7 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Included with your purchase</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex gap-2"><Download size={17} className="text-violet-600"/> Complete source code and setup guide</li>
                  <li className="flex gap-2"><ShieldCheck size={17} className="text-violet-600"/> Lifetime access to your files</li>
                  <li className="flex gap-2"><Sparkles size={17} className="text-violet-600"/> Ready-to-customize project structure</li>
                </ul>
              </div>
            </div>
          </div>
        )}
       </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
