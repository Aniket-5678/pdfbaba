import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoogleMultiplexAd from "./GoogleMultiplexAd";
import GoogleDisplayAds from "./GoogleDisplayAds";

/* ================= Skeleton Step ================= */
const SkeletonStep = () => (
  <div className="relative flex items-start">
    <div className="absolute left-[14px] top-0 w-[2px] h-full bg-gray-300"></div>

    <div className="relative z-10 w-8 h-8 rounded-full bg-indigo-300/40 animate-pulse"></div>

    <div className="ml-6 w-full">
      <div className="bg-white/70 border border-gray-200 rounded-xl p-4 animate-pulse space-y-3">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
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
      .then((res) => {
        setRoadmap(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch roadmap.");
        setLoading(false);
      });
  }, [id]);

  /* ================= LOADING UI ================= */
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
        <div className="text-center max-w-xl mx-auto mb-12 animate-pulse">
          <div className="h-6 w-52 mx-auto bg-gray-300 rounded mb-3"></div>
          <div className="h-3 w-64 mx-auto bg-gray-200 rounded"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {[...Array(7)].map((_, i) => (
            <SkeletonStep key={i} />
          ))}
        </div>
      </div>
    );

  if (error)
    return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;

  if (!roadmap)
    return <div className="text-center mt-20 font-semibold">No roadmap found</div>;

  /* ================= REAL UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-bold text-gray-900 text-[1.1rem] sm:text-3xl lg:text-4xl">
          {roadmap.category} Roadmap 🚀
        </h1>

        <p className="text-gray-500 mt-2 text-xs sm:text-base leading-relaxed">
          Follow this step-by-step path to master <b>{roadmap.category}</b>
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

        {/* Left Ads (Desktop only) */}
        <div className="hidden lg:block col-span-3">
          <GoogleDisplayAds />
        </div>

        {/* Timeline */}
        <div className="col-span-12 lg:col-span-6">
          <div className="relative max-w-3xl mx-auto space-y-10">

            {/* Vertical Line */}
            <div className="absolute left-[15px] sm:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-indigo-400 to-blue-400"></div>

            {roadmap.steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start sm:items-center ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Number Circle */}
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-lg sm:mx-6">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="ml-6 sm:ml-0 w-full sm:w-[45%]">
                  <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-xl sm:rounded-2xl p-4 sm:p-5 transition hover:shadow-xl">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                      Step {index + 1}
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Right Ads (Desktop only) */}
        <div className="hidden lg:block col-span-3 space-y-6">
          <GoogleDisplayAds />
          <GoogleMultiplexAd />
        </div>

      </div>
    </div>
  );
};

export default RoadmapDetail;