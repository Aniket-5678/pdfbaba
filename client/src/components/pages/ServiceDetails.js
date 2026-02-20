import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import { ShoppingCart, ExternalLink } from "lucide-react";

/* ============ Skeleton ============ */
const Skeleton = () => (
  <div className="animate-pulse grid md:grid-cols-2 gap-10">
    <div className="space-y-4">
      <div className="h-[380px] rounded-xl bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-24 h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
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
  const [theme] = useTheme();
  const [auth] = useAuth();
  const user = auth.user;
  const { id } = useParams();
  const navigate = useNavigate();

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
    if (!user) return alert("Please login to buy this project.");
    navigate(`/sourcecode/buy/${service._id}`);
  };

  const handleViewSource = () => {
    if (!service?.viewLink) {
      alert("No demo link available");
      return;
    }
    window.open(service.viewLink, "_blank");
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">

        {!service ? (
          <Skeleton />
        ) : (
          <div className="grid md:grid-cols-2 gap-10">

            {/* ===== LEFT IMAGE GALLERY ===== */}
            <div>
              <div className="rounded-2xl overflow-hidden border dark:border-white/10 shadow-lg">
                <img
                  src={mainImage}
                  alt="preview"
                  className="w-full h-[380px] object-cover"
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
                      alt="thumb"
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
            <div className="md:sticky md:top-24 h-fit">

              {/* Title */}
              <h1 className="text-[1.3rem] sm:text-2xl font-bold leading-snug">
                {service.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-gray-600 dark:text-gray-400 whitespace-pre-line text-sm sm:text-base">
                {service.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{service.price}
                </span>
                <span className="text-sm text-gray-500">One-time purchase</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3 flex-wrap">
                <button
                  onClick={handleBuyNow}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03] transition shadow-lg"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>

                <button
                  onClick={handleViewSource}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  <ExternalLink size={18} />
                  Live Preview
                </button>
              </div>

              {/* What you get */}
              <div className="mt-8 rounded-2xl border dark:border-white/10 p-5 bg-gray-50 dark:bg-white/5">
                <h3 className="font-semibold mb-3">What you’ll get</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>✔ Complete source code (.zip)</li>
                  <li>✔ Setup documentation</li>
                  <li>✔ Lifetime access</li>
                  <li>✔ Ready production structure</li>
                  <li className="text-red-500">✖ No refunds (digital product)</li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServiceDetails;