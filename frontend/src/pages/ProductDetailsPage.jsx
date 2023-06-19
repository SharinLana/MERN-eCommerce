import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetailsPage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>images</Col>
        <Col md={8}>
          <Row>
            <Col md={8}>product name, prise, description, rating</Col>
            <Col md={4}>product status, quantity</Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
            </Col>
          </Row>
          <hr />
          send review form
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
