import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiArrowSmDown } from "react-icons/hi";

/* ================= LAZY LOAD ADS ================= */
const GoogleMultiplexAd = lazy(() => import("./GoogleMultiplexAd"));
const GoogleDisplayAds = lazy(() => import("./GoogleDisplayAds"));

/* ================= SKELETON ================= */
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-6 animate-pulse">
    <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
      <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow space-y-3">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  </div>
);

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get(`/api/v1/roadmaps/${id}`);
        setRoadmap(res.data);
      } catch (err) {
        setError("Failed to fetch roadmap");
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [id]);

  if (loading) return <SkeletonLoader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!roadmap)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No roadmap found
      </div>
    );

  const nodes = Array.isArray(roadmap.nodes) ? roadmap.nodes : [];
  const edges = Array.isArray(roadmap.edges) ? roadmap.edges : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-4xl mx-auto text-center mb-14">
      <h1 className="text-[1.1rem] sm:text-3xl md:text-5xl font-light text-gray-900 mb-4 leading-snug">
  {roadmap.category || "Untitled"} Roadmap
</h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {roadmap.description || "No description available"}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-500">
          <span><strong>Level:</strong> {roadmap.level || "N/A"}</span>
          <span><strong>category:</strong> {roadmap.slug || "N/A"}</span>
         
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

        {/* LEFT ADS */}
        <div className="hidden lg:block col-span-3 space-y-6">
          <Suspense fallback={<div className="h-40 bg-gray-200 rounded animate-pulse" />}>
            <GoogleDisplayAds />
            <GoogleMultiplexAd />
          </Suspense>
        </div>

        {/* ================= TIMELINE ================= */}
        <div className="col-span-12 lg:col-span-6 relative">

          <div className="border-l-4 border-indigo-500 pl-8 space-y-14">

            {nodes.length === 0 && (
              <p className="text-gray-400 text-center">No nodes available</p>
            )}

            {nodes.map((node, index) => (
              <div key={node._id || index} className="relative">

                <div className="absolute -left-7 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                  {index + 1}
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {node.title || "Untitled Node"}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {node.description || "No description provided"}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span><strong>Type:</strong> {node.type || "normal"}</span>
                    <span><strong>Node ID:</strong> {node.id || "N/A"}</span>
                  </div>
                </div>

                {index < nodes.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <HiArrowSmDown className="text-indigo-400 w-6 h-6 animate-bounce" />
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT ADS */}
        <div className="hidden lg:block col-span-3 space-y-6">
          <Suspense fallback={<div className="h-40 bg-gray-200 rounded animate-pulse" />}>
            <GoogleDisplayAds />
            <GoogleMultiplexAd />
          </Suspense>
        </div>
      </div>

      {/* ================= LEARNING FLOW ================= */}
     {/* ================= LEARNING FLOW ================= */}
{edges.length > 0 && (
  <div className="max-w-6xl mx-auto mt-24 px-2 sm:px-0">

    <h2 className="text-[1.1rem] sm:text-2xl font-bold text-center mb-10 text-gray-900">
      Learning Flow Structure
    </h2>

    <div className="space-y-8">

      {edges.map((edge, i) => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);

        return (
          <div
            key={edge._id || i}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 sm:p-8"
          >

            {/* ===== MOBILE VIEW (STACKED) ===== */}
            <div className="flex flex-col sm:hidden items-center text-center space-y-4">

              {/* FROM */}
              <div className="w-full bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 mb-1">FROM</p>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {sourceNode?.title || edge.source || "N/A"}
                </h3>
                <p className="text-xs text-indigo-500">
                  Type: {sourceNode?.type || "N/A"}
                </p>
              </div>

              {/* DOWN ARROW */}
              <div className="text-indigo-500 text-xl animate-bounce">
                ↓
              </div>

              {/* RELATION */}
              {edge.label && (
                <div className="text-xs text-gray-400">
                  <strong>Relation:</strong> {edge.label}
                </div>
              )}

              {/* DOWN ARROW */}
              <div className="text-indigo-500 text-xl animate-bounce">
                ↓
              </div>

              {/* TO */}
              <div className="w-full bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 mb-1">TO</p>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {targetNode?.title || edge.target || "N/A"}
                </h3>
                <p className="text-xs text-indigo-500">
                  Type: {targetNode?.type || "N/A"}
                </p>
              </div>

            </div>

            {/* ===== DESKTOP VIEW (HORIZONTAL) ===== */}
            <div className="hidden sm:flex items-center gap-6">

              {/* SOURCE */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 mb-1">FROM</p>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {sourceNode?.title || edge.source || "N/A"}
                </h3>
                <p className="text-xs text-indigo-500">
                  Type: {sourceNode?.type || "N/A"}
                </p>
              </div>

              {/* ARROW */}
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md">
                  →
                </div>
              </div>

              {/* TARGET */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border">
                <p className="text-xs text-gray-400 mb-1">TO</p>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {targetNode?.title || edge.target || "N/A"}
                </h3>
                <p className="text-xs text-indigo-500">
                  Type: {targetNode?.type || "N/A"}
                </p>
              </div>

            </div>

          </div>
        );
      })}

    </div>
  </div>
)}
      {/* FOOTER */}
      <div className="text-center mt-20 text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Roadmap Portal
      </div>

    </div>
  );
};

export default RoadmapDetail;