import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import CartItemComponent from "../../../components/CartItemComponent";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadScript,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { id } = useParams();
  const paypalContainer = useRef()
  console.log(paypalContainer)

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          state: data.state,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Your order is finished");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Pay for your order");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("Wait for your order. You pay on delivery");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        loadScript({
          "client-id":
            "Abf4b19XpbIsGXjbzV4dAu9wNNMXuugazAsDWgLVF-cGx-rcqBUOJ5XzgX2H2ysMo1dugs0ovwd1Aq0n",
        })
          .then((paypal) => {
            // console.log(paypal);
            paypal.Buttons({}).render("#paypal-container-element");
          })
          .catch((err) => console.log(err));
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>

        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.zipCode} <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>

            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select
                disabled={false}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>

            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Delivered at {isDelivered}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />

          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
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
                  {orderButtonMessage}
                </Button>
              </div>

              {/* PayPal Buttons */}
              <div style={{ position: "relative", zIndex: 1, marginTop: "20px" }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
