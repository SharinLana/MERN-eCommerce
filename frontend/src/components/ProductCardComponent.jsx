import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ProductCardComponent = () => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        {/* Product Image */}
        <Col lg={5}>
          <Card.Img variant="top" src="/images/tablets-category.png" />
        </Col>
        {/* Product Description */}
        <Col lg={7}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              {` Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCardComponent;
