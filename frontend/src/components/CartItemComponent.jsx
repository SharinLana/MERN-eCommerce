import React from "react";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";

const CartItemComponent = ({ item, orderCreated = false }) => {
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
              src={item.image ? item.image.path !== null : null}
            />
          </Col>

          <Col md={2}>{item.name}</Col>

          <Col md={2}>
            <b>${item.price}</b>
          </Col>

          <Col md={3}>
            <Form.Select disabled={orderCreated} value={item.quantity}>
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
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
