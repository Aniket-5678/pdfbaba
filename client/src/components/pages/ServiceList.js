import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import SmallBannerAd from "./SmallBannerAd";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 6;

const ServiceList = () => {
  const [theme] = useTheme();
  const [page, setPage] = useState(1);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const gridRef = useRef(null);
  const [auth] = useAuth();
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

  const paginatedServices = filteredServices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Layout>
      <div
        className={`pt-20 min-h-screen px-4 sm:px-8 ${
          theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <h2 className="text-center text-xl font-bold">📂 Professional Source Code Projects</h2>
        <p className="text-center text-sm mt-1 mb-5">
          Explore high-quality, ready-to-use website and app source codes.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full sm:w-1/2 md:w-1/3 px-4 py-2 rounded-lg border ${
              theme === "dark" ? "bg-[#1e1e1e] border-gray-700 text-gray-200" : "bg-white border-gray-400"
            }`}
          />
        </div>

        {/* Banner */}
        <div className="flex justify-center mb-6">
          <SmallBannerAd />
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="loader"></div>
            </div>
          ) : paginatedServices.length === 0 ? (
            <p className="col-span-full text-center mt-10 text-lg opacity-70">
              No projects found matching your search.
            </p>
          ) : (
            paginatedServices.map((service) => (
              <div
                key={service._id}
                onClick={() => navigate(`/service/${service._id}`)}
                className={`cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition ${
                  theme === "dark" ? "bg-[#1b1b1b]" : "bg-white"
                }`}
              >
                <img
                  src={service.thumbnail || "/default-thumbnail.png"}
                  alt={service.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3 text-center">
                  <h3 className="text-sm">{service.title}</h3>
                  <p className="font-bold text-blue-600 dark:text-green-400 text-lg">
                    ₹{service.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredServices.length > itemsPerPage && (
          <div className="flex justify-center py-10 space-x-2">
            {Array.from(
              { length: Math.ceil(filteredServices.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md border ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ServiceList;
