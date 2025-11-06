import React from "react";
import Slider from "react-slick";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

import earthImagefirst from "../images/earth1.png";
import earthImagetwo from "../images/earth2.png";
import earthImagethird from "../images/earth3.png";
import earthImagefourth from "../images/earth4.png";
import earthImagefifth from "../images/earth5.png";
import earthImagesixth from "../images/earth6.png";
import earthImageseven from "../images/earth7.png";
import chakraImageone from "../images/chakra1.png";
import chakraImagetwo from "../images/chakra2.png";
import chakraImagethree from "../images/chakra3.png";
import chakraImagefour from "../images/chakra4.png";
import jupiterfirst from "../images/jupiter1.png";
import jupitersecond from "../images/jupiter2.png";
import jupiterthird from "../images/jupiter3.png";

const PdfFormat = () => {
  const [theme] = useTheme();

  const images = [
    earthImagefirst,
    earthImagetwo,
    earthImagethird,
    earthImagefourth,
    earthImagefifth,
    earthImagesixth,
    earthImageseven,
    chakraImageone,
    chakraImagetwo,
    chakraImagethree,
    chakraImagefour,
    jupiterfirst,
    jupitersecond,
    jupiterthird,
  ];

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-35px] top-1/2 -translate-y-1/2 bg-white shadow px-2 py-2 rounded-full hover:bg-gray-200 z-10"
    >
      <AiOutlineLeft size={22} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-35px] top-1/2 -translate-y-1/2 bg-white shadow px-2 py-2 rounded-full hover:bg-gray-200 z-10"
    >
      <AiOutlineRight size={22} />
    </button>
  );

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-6 p-6 font-[Poppins] mt-12 ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Slider */}
      <div className="w-full sm:w-1/2 relative">
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <div key={i} className="flex justify-center">
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                className="w-4/5 max-h-[300px] object-contain rounded-lg shadow"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Text Content */}
      <div className="w-full sm:w-1/2 text-center sm:text-left px-3">
        <h2 className="text-xl sm:text-3xl font-bold mb-4">
          Enhance Your Learning with Comprehensive PDF Resources
        </h2>

        <p
          className={`text-sm sm:text-base leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          PDFs serve as a vital resource for any learner. With clear organization,
          easy navigation, and compatibility across all devices, PDF notes transform
          your study experience.
        </p>
      </div>
    </div>
  );
};

export default PdfFormat;
