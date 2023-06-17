import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ item }) => {
  return (
    <Card>
      <Card.Img variant="top" src="images/games-category.png" />
      <Card.Body>
        <Card.Title>{item}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </Card.Text>

        <LinkContainer to="/product-list">
          <Button variant="primary">Go to Category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
