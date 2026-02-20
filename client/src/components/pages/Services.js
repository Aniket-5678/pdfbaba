import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const [theme] = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/sourcecode");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // arrows
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-md bg-black/10 dark:bg-white/10 hover:scale-110 transition items-center justify-center cursor-pointer"
    >
      <ChevronRight size={22} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-md bg-black/10 dark:bg-white/10 hover:scale-110 transition items-center justify-center cursor-pointer"
    >
      <ChevronLeft size={22} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2600,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!services.length)
    return <p className="text-center mt-10 text-gray-500">No projects available</p>;

  return (
    <section className={`py-14 px-3 sm:px-8 ${theme === "dark" ? "bg-[#121212]" : "bg-gray-50"}`}>

      {/* Heading */}
<h2 className="text-center font-semibold sm:font-medium mb-10 text-[1.1rem] sm:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
  Ready-Made Website Projects
</h2>
      {/* Slider */}
      <div className="relative">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service._id} className="px-2">
              
              <div
                onClick={() => navigate(`/service/${service._id}`)}
                className={`rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group
                ${theme === "dark"
                  ? "bg-[#1e1e1e] hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)]"
                  : "bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]"}
                hover:-translate-y-1`}
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={service.thumbnail || "/default-thumbnail.png"}
                    alt={service.title}
                    className="w-full h-[150px] sm:h-[170px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-3 text-center">
                  <h3 className="text-[0.85rem] sm:text-[0.95rem] font-semibold leading-tight line-clamp-2">
                    {service.title}
                  </h3>

                  <p className="text-indigo-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{service.price}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Services;