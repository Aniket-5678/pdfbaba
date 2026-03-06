import React, { useEffect, useState } from "react";
import bannerpro from "../images/bannerpro.png";

const slides = [bannerpro];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Auto Slide
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
    <div className="w-full relative overflow-hidden mt-28">

      {/* Banner Container */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-[320px] lg:h-[400px] xl:h-[420px]">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`slide-${index}`}
              className="w-full h-full object-contain sm:object-cover"
            />
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer transition-all duration-300 rounded-full ${
                index === current
                  ? "w-6 h-2 bg-blue-600"
                  : "w-2 h-2 bg-white/70"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Banner;