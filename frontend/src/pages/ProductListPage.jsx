import React from "react";
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import ProductCartComponent from "../components/ProductCardComponent";
import SortingSidebarComponent from "../components/SortingSidebarComponent";
import PaginationComponent from "../components/PaginationComponent";
import AttributesFilterComponent from "../components/filteringOptions/AttributesFilterComponent";

const ProductListPage = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <SortingSidebarComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <AttributesFilterComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary">Primary</Button>
                <Button variant="danger">Danger</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            <ProductCartComponent />
            <PaginationComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListPage;
