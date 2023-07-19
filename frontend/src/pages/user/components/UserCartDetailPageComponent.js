import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  dispatch,
  addToCart,
  removeFromCart,
  getUser,
  userInfo,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userShippingAddress, setUserShippingAddress] = useState(false);
  const [missingShippingAddress, setMissingShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");

  const changeQuantity = (productId, count) => {
    dispatch(addToCart(productId, count));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromCart(productId, quantity, price));
    }
  };

  // To disable the Pay For The Order button
  useEffect(() => {
    getUser()
      .then((data) => {
        if (
          !data.address ||
          !data.city ||
          !data.country ||
          !data.zipCode ||
          !data.state ||
          !data.phoneNumber
        ) {
          setButtonDisabled(true);
          setMissingShippingAddress(
            "To make order, please fill out your profile with correct address, city etc."
          );
        } else {
          setUserShippingAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
            state: data.state,
            phoneNumber: data.phoneNumber,
          });
          setMissingShippingAddress(false);
        }
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    console.log(orderData);
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userShippingAddress.address}{" "}
              {userShippingAddress.city} {userShippingAddress.state}{" "}
              {userShippingAddress.zipCode} <br />
              <b>Phone</b>: {userShippingAddress.phoneNumber} <br />
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select value={paymentMethod} onChange={choosePayment}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not delivered.
                  {missingShippingAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Not paid yet
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent
                item={item}
                key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeQuantity={changeQuantity}
              />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                  onClick={orderHandler}
                >
                  Pay for the order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPageComponent;
