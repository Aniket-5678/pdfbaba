import React from "react";
import Slider from "react-slick";
import "../style/style.css";
import gauravSharmaImage from "../images/gauravsharma.jpeg";
import dhruvImage from "../images/dhruv.png"
import jayImage from "../images/jay.jpeg"
import johndoe from "../images/johndoe.avif"



// ReviewCard Component
const ReviewCard = ({ image, name, review, stars }) => (
  <div className="review-card">
    <img src={image} alt={name} className="review-card-image" />
    <div className="review-content">
      <h3 className="review-name">{name}</h3>
      <p className="review-text">{review}</p>
      <div className="review-stars">
        {"⭐".repeat(stars)} {/* Star rating representation */}
      </div>
    </div>
  </div>
);

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button className="slider-arrow left" onClick={onClick}>
    {"<"}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="slider-arrow right" onClick={onClick}>
    {">"}
  </button>
);

// Main ReviewSlider Component
const ReviewSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />, // Using custom previous arrow
    nextArrow: <CustomNextArrow />, // Using custom next arrow
  };

  return (
    <div className="review-slider">
      <h2 className="review-section-heading">What Our Users Say</h2>
      <Slider {...settings}>
        {/* User Reviews */}
        <ReviewCard
          image={gauravSharmaImage}
          name="Gaurav Sharma"
          review="The MERN stack PDF was incredibly detailed and easy to follow. I learned a lot!"
          stars={5}
        />
        <ReviewCard
          image={jayImage}
          name="Jay"
          review="The backend development resources were really helpful. Great content!"
          stars={5}
        />
        <ReviewCard
          image={johndoe }
          name="John doe"
          review="Digital Marketing strategies explained in the PDFs were spot on. Highly recommend!"
          stars={4}
        />
        <ReviewCard
          image={dhruvImage}
          name="Dhruv"
          review="JavaScript guide was really helpful for my web development course. Thanks a lot!"
          stars={5}
        />
      </Slider>
    </div>
  );
};

export default ReviewSlider;

