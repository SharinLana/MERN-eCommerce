import React from "react";
import { Button, Card } from "react-bootstrap";

const CategoryCardComponent = () => {
  return (
    <Card >
      <Card.Img variant="top" src="images/games-category.png" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
