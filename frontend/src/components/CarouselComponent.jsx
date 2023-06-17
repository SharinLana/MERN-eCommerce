import React from "react";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/carousel/carousel-1.png"
          alt="First slide"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <LinkContainer to="/product-details" style={{ cursor: "pointer" }}>
            <h3>Bestseller in Laptops Category</h3>
          </LinkContainer>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/carousel/carousel-2.png"
          alt="Second slide"
          style={{ height: "300px", objectFit: "cover" }}
        />

        <Carousel.Caption>
          <LinkContainer to="/product-details" style={{ cursor: "pointer" }}>
            <h3>Bestseller in Books Category</h3>
          </LinkContainer>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/carousel/carousel-3.png"
          alt="Third slide"
          style={{ height: "300px", objectFit: "cover" }}
        />

        <Carousel.Caption>
          <LinkContainer to="/product-details" style={{ cursor: "pointer" }}>
            <h3>Bestseller in Cameras Category</h3>
          </LinkContainer>
          <p>Present commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
