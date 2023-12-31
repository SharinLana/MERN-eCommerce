import React from "react";
import { Row, Col, ListGroup, Image, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({
  item,
  orderCreated = false,
  changeQuantity = false,
  removeFromCartHandler = false,
}) => {
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
              crossOrigin="anonymous"
              src={item.image ? item.image.path ?? null : null}
            />
          </Col>

          <Col md={2}>{item.name}</Col>

          <Col md={2}>
            <b>${item.price * item.quantity}</b>
          </Col>

          <Col md={3}>
            <Form.Select
              onChange={
                changeQuantity
                  ? (e) => changeQuantity(item.productId, e.target.value)
                  : undefined
              }
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productId={item.productId}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
        <br />
      </ListGroup.Item>
    </>
  );
};

export default CartItemComponent;
