import React from "react";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";

const CartItemComponent = () => {
  return (
    <>
      <ListGroup.Item>
        <br />
        <Row>
          <Col md={2}>
            {/* crossorigin="anonymous": without this prop the images 
            will not be correctly fetched from the external server */}
            <Image
              fluid
              crossorigin="anonymous"
              src="images/games-category.png"
            />
          </Col>

          <Col md={2}>
            Logotech series <br />
            Gaming mouse
          </Col>

          <Col md={2}>
            <b>$89</b>
          </Col>

          <Col md={3}>
            <Form.Select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.confirm("Are you sure?")}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Col>
        </Row>
        <br />
      </ListGroup.Item>
    </>
  );
};

export default CartItemComponent;
