import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import CarouselComponent from "../../components/CarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";

const HomePageComponent = ({ categories, getBestsellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    getBestsellers()
      .then((data) => setBestsellers(data))
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <>
      <CarouselComponent bestsellers={bestsellers} />
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
