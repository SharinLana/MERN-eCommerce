import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import CarouselComponent from "../../components/CarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";

const HomePageComponent = ({ categories }) => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/")) 
    );
  }, [categories]);

  return (
    <>
      <CarouselComponent />

      <Container style={{ marginTop: "40px" }}>
        <Row xs={1} md={2} className="g-4">
          {mainCategories.map((item, index) => (
            <CategoryCardComponent item={item} key={index} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
