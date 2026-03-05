import React, { useEffect, useState } from "react";
import JavascriptnewImage from "../images/javascript.png";
import reactjsImage from "../images/reactjs.png";

const slides = [
  JavascriptnewImage,
  reactjsImage,
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // ✅ Auto Slide
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(slider);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative w-full overflow-hidden mt-14" >

      {/* Slides */}
      <div className="relative h-[180px] sm:h-[300px] md:h-[420px] lg:h-[500px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide}
              alt={`slide-${index}`}
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg transition hidden sm:flex"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg transition hidden sm:flex"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === current
                ? "w-6 bg-blue-600"
                : "w-2 bg-white/70"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default Banner;