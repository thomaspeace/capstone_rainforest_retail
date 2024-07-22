import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/RegionCarousel.css';
import { Button } from 'react-bootstrap';

const RegionCarousel = () => {
  return (
    <Carousel className='carousel-class'>
      <Carousel.Item interval={4000} className="carousel-item">
        <div className="carousel-background">
          <Carousel.Caption>
            <h3>London</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={4000} className="carousel-item">
        <div className="carousel-background">
          <Carousel.Caption>
            <h3>South West</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={4000} className="carousel-item">
        <div className="carousel-background">
          <Carousel.Caption>
            <h3>Midlands</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default RegionCarousel;
