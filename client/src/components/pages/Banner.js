import React from 'react';
import Carousel from 'react-material-ui-carousel';
import bscImage from "../images/bsc.png"
import JavascriptnewImage from "../images/javascriptbest.png"
import techzoneImage from "../images/techzone.png"



// Import more images as needed

const data = [
  JavascriptnewImage,
  bscImage ,
  techzoneImage


 
  // Add more imported images to this array
];

const Banner = () => {
  return (
    <Carousel
    className='coursel-container'
    autoPlay={true}
    animation="slide"
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
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
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Shadow effect */
        transition: 'background-color 0.3s ease, color 0.3s ease', /* Smooth color transition */
        cursor: 'pointer'
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
