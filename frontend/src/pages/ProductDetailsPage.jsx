import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";

const ProductDetailsPage = () => {
  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
        <Col md={4}>
          {/* fluid prop helps to fit the component nicely to the parent element */}
          <Image fluid src="/images/games-category.png" />
          <Image fluid src="/images/monitors-category.png" />
          <Image fluid src="/images/tablets-category.png" />
          <Image fluid src="/images/games-category.png" />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>Product name</ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={3} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger">Danger</Button>
                </ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              </ListGroup>
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
