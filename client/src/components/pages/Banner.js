import React from 'react';
import Carousel from 'react-material-ui-carousel';
import javacriptImage from "../images/javascriptbanner.png"
import HtmlImage from "../images/htmlbanner.png"
import bscImage from "../images/bsc.png"



// Import more images as needed

const data = [
  bscImage ,
  javacriptImage,
  HtmlImage

 
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
          height: '104px',
          borderRadius: '0px',
          fontSize: '0.9rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Adding shadow to nav buttons */
          transition: 'background-color 0.3s ease, color 0.3s ease' /* Smooth color transition */
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
