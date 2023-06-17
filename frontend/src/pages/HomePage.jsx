import React from "react";
import { Row, Container } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";

const categories = [
  "Audio",
  "Movies",
  "Books",
  "Electronics",
  "Cars",
  "Smartphones",
];

const HomePage = () => {
  return (
    <>
      <CarouselComponent />

      <Container>
        <Row xs={1} md={2} className="g-4" mt={5}>
          {categories.map((item, index) => (
            <CategoryCardComponent item={item} key={index} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
