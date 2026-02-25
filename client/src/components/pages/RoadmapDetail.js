import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiArrowSmDown } from "react-icons/hi";
import GoogleMultiplexAd from "./GoogleMultiplexAd";
import GoogleDisplayAds from "./GoogleDisplayAds";

/* ================= Skeleton Step ================= */
const SkeletonStep = () => (
  <div className="relative flex items-start">
    <div className="absolute left-4 top-0 w-1 h-full bg-gray-300"></div>
    <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-300/40 animate-pulse"></div>
    <div className="ml-8 w-full">
      <div className="bg-white/70 border border-gray-200 rounded-xl p-6 animate-pulse space-y-4">
        <div className="h-5 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/roadmaps/${id}`)
      .then((res) => setRoadmap(res.data))
      .catch(() => setError("Failed to fetch roadmap."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
        <div className="text-center max-w-xl mx-auto mb-12 animate-pulse">
          <div className="h-7 w-60 mx-auto bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-72 mx-auto bg-gray-200 rounded"></div>
        </div>
        <div className="max-w-3xl mx-auto space-y-10">
          {[...Array(5)].map((_, i) => (
            <SkeletonStep key={i} />
          ))}
        </div>
      </div>
    );

  if (error)
    return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;

  if (!roadmap)
    return <div className="text-center mt-20 font-semibold">No roadmap found</div>;

  const steps = Array.isArray(roadmap.nodes) ? roadmap.nodes : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-6">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
       <h1 className="font-light text-[0.9rem] sm:text-3xl lg:text-5xl text-gray-900">
  {roadmap.category} Roadmap 
</h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base leading-relaxed">
          Step by step guide to master <b>{roadmap.category}</b> like a pro.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left Ads */}
        <div className="hidden lg:block col-span-3 space-y-6">
          <GoogleDisplayAds />
          <GoogleMultiplexAd />
        </div>

        {/* Roadmap */}
        <div className="col-span-12 lg:col-span-6 relative">
          <div className="relative border-l-4 border-indigo-500 pl-12 space-y-12">
            {steps.length === 0 && (
              <p className="text-center text-gray-400 mt-6">
                No steps available for this roadmap.
              </p>
            )}

            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex flex-col sm:flex-row items-start sm:items-center"
              >
                {/* Circle node */}
                <div
                  className={`absolute -left-7 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg
                    ${step.type === "start"
                      ? "bg-green-500"
                      : step.type === "advanced"
                      ? "bg-red-500"
                      : step.type === "optional"
                      ? "bg-gray-400"
                      : "bg-indigo-500"
                    }`}
                >
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 w-full sm:w-[85%] transition hover:shadow-2xl hover:scale-105">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  <span className="text-gray-400 text-xs mt-2 block">{step.type}</span>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1 top-full mt-3 flex justify-center w-full">
                    <HiArrowSmDown className="text-indigo-400 w-8 h-8 animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Ads */}
        <div className="hidden lg:block col-span-3 space-y-6">
          <GoogleDisplayAds />
          <GoogleMultiplexAd />
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="text-center mt-16 text-gray-400 text-sm">
        © {new Date().getFullYear()} Roadmap Portal. All rights reserved.
      </div>
    </div>
  );
};

export default RoadmapDetail;