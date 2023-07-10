import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginPageComponent = ({ loginUserApiRequest }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const doNotLogout = e.currentTarget.doNotLogout.checked;

    if (e.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });

      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            error: "",
            loading: false,
          });

          if (
            res.success === "User logged in successfully" &&
            !res.userLoggedIn.isAdmin
          ) {
            navigate("/user", { replace: true });
          } else if (
            res.success === "User logged in successfully" &&
            res.userLoggedIn.isAdmin
          ) {
            navigate("/admin/orders", { replace: true });
          }
        })
        .catch((err) =>
          setLoginUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          })
        );
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                {`Don't you have an account?`}
                <Link to={"/register"}> Register </Link>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              {loginUserResponseState &&
              loginUserResponseState.loading === "true" ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Login
            </Button>

            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "Wrong credentials"
              }
              variant="danger"
              className="mt-2"
            >
              Wrong credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
