import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';


import React, { useState, useEffect } from 'react';



function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export default function CategoryCarousel(props){
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <Carousel fade controls={false} indicators={false}>
      <Carousel.Item>
          <img
              className="d-block w-100"
              src={props.image}
              alt="Third slide"
              style={{
                height: windowDimensions.height/2,
                minHeight: "200px",
                objectFit: "cover",
                filter: "blur(3px)",
                webkitFilter: "blur(3px)"
              }}
            />
      <Carousel.Caption className="carousel-caption">
              <h1 className="display-1" style={{fontFamily: "'Cinzel', serif",color:"white",top: "50%",transform:"translateY(-50%)",bottom: "initial",fontSize:"100px"}}>{props.title}</h1>
      </Carousel.Caption>  
      </Carousel.Item>      
    </Carousel> 
  );
} 
