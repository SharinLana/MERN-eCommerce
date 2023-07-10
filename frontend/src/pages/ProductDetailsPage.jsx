import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  // To zoom in on the images
  let options = {
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
    width: 400,
    zoomWidth: 500,
    fillContainer: true,
    zoomPosition: "right",
  };

  useEffect(() => {
    new ImageZoom(document.querySelector("#first"), options);
    new ImageZoom(document.querySelector("#second"), options);
    new ImageZoom(document.querySelector("#third"), options);
    new ImageZoom(document.querySelector("#fourth"), options);
  }, []);

  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
        {/* zIndex needed for zooming in on the image */}
        <Col md={4} style={{ zIndex: 1 }}>
          <div id="first">
            {/* fluid prop helps to fit the component nicely to the parent element */}
            <Image fluid src="/images/games-category.png" />
          </div>
          <br />

          <div id="second">
            <Image fluid src="/images/monitors-category.png" />
          </div>
          <br />

          <div id="third">
            <Image fluid src="/images/tablets-category.png" />
          </div>
          <br />

          <div id="fourth">
            <Image fluid src="/images/games-category.png" />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>Product title</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={3} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Vestibulum at eros. Porta ac consectetur ac .Porta ac
                  consectetur ac .Porta ac consectetur ac
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="fw-bold">$345</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Select size="lg" aria-label="Default select example">
                    <option>Quantity:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* Review section */}
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <ListGroup.Item key={idx}>
                    John Doe <br />{" "}
                    <Rating readonly size={20} initialValue={4} />
                    <br />
                    06-19-2023
                    <br />
                    drhgfh cfhjfyj erter fg dsfdf jkuk xdfsd ffd sdf
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          {/* Send review form */}
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="5">5 (excellent)</option>
              <option value="4">4 (good)</option>
              <option value="3">3 (average)</option>
              <option value="2">2 (bad)</option>
              <option value="1">1 (awful)</option>
            </Form.Select>
            <Button variant="primary" className="mb-3 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
