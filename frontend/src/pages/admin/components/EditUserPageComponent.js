import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdmin(data.isAdmin);
      })
      .catch((err) =>
        setUpdateUserResponseState(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const name = e.currentTarget.name.value;
    const lastName = e.currentTarget.lastName.value;
    const email = e.currentTarget.email.value;
    const isAdmin = e.currentTarget.isAdmin.checked;

    if (e.currentTarget.checkValidity() === true) {
      updateUserApiRequest(id, name, lastName, email, isAdmin).then((data) => {
        if (data.message === "user updated") {
          navigate("/admin/users");
        }
      });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/users" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit user</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={user.name}
                required
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={user.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                defaultValue={user.email}
                required
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="Is admin"
                onChange={(e) => setIsAdmin(e.target.checked)}
                checked={isAdmin}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
