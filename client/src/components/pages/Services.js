import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/v1/sourcecode");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl p-4 animate-pulse ${
        isDark ? "bg-white/5 border border-white/10" : "bg-white shadow border-gray-200"
      }`}
    >
      <div className="h-32 rounded bg-gray-300/40 mb-3"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300/40 mb-2"></div>
      <div className="h-4 w-1/2 rounded bg-gray-300/40"></div>
    </div>
  );

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={`py-14 px-3 sm:px-8 ${isDark ? "bg-[#121212]" : "bg-gray-50"}`}>
      {/* Heading - left aligned */}
 <h2 className="text-left font-light sm:font-light mb-10 text-[1.1rem] sm:text-2xl lg:text-3xl tracking-tight text-gray-900 dark:text-white">
  Ready-Made Website Projects
</h2>

      {/* Slider container */}
      <div className="relative">
        {/* Optional arrows for desktop */}
        <div
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center cursor-pointer bg-black/10 dark:bg-white/10 rounded-full hover:scale-110 transition"
          onClick={() => scrollSlider("left")}
        >
          <ChevronLeft size={22} />
        </div>
        <div
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center cursor-pointer bg-black/10 dark:bg-white/10 rounded-full hover:scale-110 transition"
          onClick={() => scrollSlider("right")}
        >
          <ChevronRight size={22} />
        </div>

        {/* Slider */}
        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          >
            {services.map((service) => (
              <div
                key={service._id}
                onClick={() => navigate(`/service/${service._id}`)}
                className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isDark
                    ? "bg-[#1e1e1e] hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)] text-gray-200"
                    : "bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] text-gray-900"
                }`}
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={service.thumbnail || "/default-thumbnail.png"}
                    alt={service.title}
                    className="w-full h-40 sm:h-44 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-[0.85rem] sm:text-[0.95rem] font-semibold line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default Services;