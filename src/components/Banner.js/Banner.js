import React from 'react';
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap
import Carousel from './Carousel'; // Assuming Carousel component is defined elsewhere

const Banner = () => {
  return (
    <div className="banner" style={{ backgroundImage: "url(./stock.jpeg)" }}>
      <Container className="banner-content d-flex flex-column justify-content-between align-items-center">
        <div className="tagline text-center">
          <h2 className="fw-bold mb-3 text-gold" style={{ color: '#9ca1a6'}}>Crypto Tracker</h2>
          <p className="text-darkgrey text-capitalize">Get all the Info regarding your favorite Crypto Currency</p>
        </div>
        <div className="carousel d-flex align-items-center">
          <Carousel /> {/* Assuming Carousel is a Bootstrap-compatible component */}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
