import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import SmallBannerAd from "./SmallBannerAd";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const itemsPerPage = 6;

/* ================= Skeleton Card ================= */
const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl overflow-hidden border bg-white/60 dark:bg-white/5">
    <div className="h-40 w-full bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-20 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const ServiceList = () => {
  const [theme] = useTheme();
  const [page, setPage] = useState(1);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/sourcecode");
      setServices(res.data);
      setFilteredServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = services.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredServices(filtered);
    setPage(1);
  };

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginatedServices = filteredServices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const changePage = (num) => {
    setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">

        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          <h1 className="text-[1.3rem] sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Professional Source Code Marketplace
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore high-quality ready-made projects. Save weeks of development time and launch faster 🚀
          </p>
        </div>

        {/* ===== Search ===== */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects (Ecommerce, LMS, Admin Panel...)"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Banner */}
        <div className="flex justify-center mb-10">
          <SmallBannerAd />
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : paginatedServices.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No projects found
            </p>
          ) : (
            paginatedServices.map((service) => (
              <div
                key={service._id}
                onClick={() => navigate(`/service/${service._id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden border bg-white dark:bg-white/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={service.thumbnail || "/default-thumbnail.png"}
                    alt={service.title}
                    className="h-40 w-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Price badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    ₹{service.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="text-sm sm:text-base font-semibold line-clamp-2 text-gray-800 dark:text-gray-200">
                    {service.title}
                  </h3>

                  <div className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    View Details →
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== Pagination ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            
            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
              className="px-4 py-2 rounded-lg border bg-white dark:bg-white/5 disabled:opacity-40"
            >
              Prev
            </button>

            {/* Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`min-w-[38px] h-10 rounded-lg font-semibold transition ${
                  page === i + 1
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
              className="px-4 py-2 rounded-lg border bg-white dark:bg-white/5 disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServiceList;