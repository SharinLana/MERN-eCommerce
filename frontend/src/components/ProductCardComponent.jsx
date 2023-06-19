import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";

const ProductCardComponent = ({ images, idx }) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        {/* Product Image */}
        <Col lg={5}>
          <Card.Img
            variant="top"
            src={"/images/" + images[idx] + "-category.png"}
          />
        </Col>
        {/* Product Description */}
        <Col lg={7}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              {` Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={5} />
              (1)
            </Card.Text>
            <Card.Text>
              $124{" "}
              <LinkContainer to="/product-details:/1">
                <Button variant="danger">See product</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCardComponent;
