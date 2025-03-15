import React from 'react';
import Carousel from 'react-material-ui-carousel';
import JavascriptnewImage from "../images/javascript.png"
import techzoneImage from "../images/techzone.png"
import reactjsImage from "../images/reactjs.png"
import spaceImage from "../images/space.png"
import spritualImage from "../images/spritual.png"
import mysteryImage from "../images/mystery.png"
import quizbannerImage from "../images/quiz.png"
import serviceBannerImage from "../images/availableservice.png"


// Import more images as needed

const data = [
  JavascriptnewImage,
  quizbannerImage,
  serviceBannerImage ,
  spaceImage,
  techzoneImage,
  reactjsImage,
  spritualImage,
  mysteryImage


 
  // Add more imported images to this array
];

const Banner = () => {
  return (
    <Carousel
    className="coursel-container"
      autoPlay={true} // Enable autoplay
      animation="slide" // Slide animation for smoother transitions
      indicators={false} // Remove indicators
      navButtonsAlwaysVisible={true} // Always show navigation buttons
      cycleNavigation={true} // Enable infinite loop
      interval={3000} // Duration each slide stays on screen (in milliseconds)
      timeout={800} // Transition duration (in milliseconds)
      navButtonsProps={{
        style: {
          backgroundColor: 'white',
          color: 'black',
          height: '50px', // Circle size
          width: '50px', // Circle size
          borderRadius: '50%', // Makes it circular
          fontSize: '1.5rem', // Adjusted font size for the arrows
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow effect
          transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth color transition
          cursor: 'pointer',
        }
      }}
    >
      {data.map((image, index) => (
        <div className='banner-main' key={index}>
          <img className='banner-image' src={image} alt={`banner-${index}`} />
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
