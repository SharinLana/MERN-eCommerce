import React from "react";
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import ProductCartComponent from "../components/ProductCardComponent";

const ProductListPage = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button variant="primary">Primary</Button>
                <Button variant="danger">Danger</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            <ProductCartComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListPage;
