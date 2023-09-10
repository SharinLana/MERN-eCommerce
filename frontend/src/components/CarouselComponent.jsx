import React from "react";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CarouselComponent = ({ bestsellers }) => {
  return bestsellers.numOfBestsellers > 0 ? (
    <Carousel>
      {bestsellers.bestsellers.map((item, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.images ? item.images[0].path : null}
              alt="First slide"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <LinkContainer
                to={`/product-details/${item._id}`}
                style={{ cursor: "pointer" }}
              >
                <h3>Bestseller in {item.category} Category</h3>
              </LinkContainer>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  ) : null;
};

export default CarouselComponent;
