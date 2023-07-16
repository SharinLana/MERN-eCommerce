import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const UserProfilePageComponent = ({
  updateUserProfileApiRequest,
  fetchUserProfileData,
  userInfo,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [passwordMatchState, setPasswordMatchState] = useState(true);
  const [user, setUser] = useState({});

  // fetching the user profile data to fill out the form fields
  useEffect(() => {
    fetchUserProfileData(userInfo._id)
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  // Comparing password and confirmPassword fields
  const onChange = () => {
    const password = document.querySelector("input[name=password");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword"
    );

    if (confirmPassword.value === password.value) {
      setPasswordMatchState(true);
    } else {
      setPasswordMatchState(false);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const name = e.currentTarget.name.value;
    const lastName = e.currentTarget.lastName.value;
    const phoneNumber = e.currentTarget.phoneNumber.value;
    const address = e.currentTarget.address.value;
    const country = e.currentTarget.country.value;
    const zipCode = e.currentTarget.zipCode.value;
    const city = e.currentTarget.city.value;
    const state = e.currentTarget.state.value;
    const password = e.currentTarget.password.value;

    if (
      e.currentTarget.checkValidity() === true &&
      e.currentTarget.password.value === e.currentTarget.confirmPassword.value
    ) {
      updateUserProfileApiRequest(
        name,
        lastName,
        phoneNumber,
        address,
        country,
        zipCode,
        city,
        state,
        password
      )
        .then((data) => {
          console.log(data);
          setUpdateUserResponseState({ success: data.success }); //success came from the backend (updateUserProfile controller response in the userControllers.js)
        })
        .catch((err) =>
          setUpdateUserResponseState({
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
          <h1>Change your profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                disabled
                value={`${user.email} if you want to change email, remove account and create new one with new email address`}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                defaultValue={user.phoneNumber}
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street name and house number"
                defaultValue={user.address}
                name="address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                defaultValue={user.country}
                name="country"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Zip code"
                defaultValue={user.zipCode}
                name="zipCode"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                defaultValue={user.city}
                name="city"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                defaultValue={user.state}
                name="state"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordMatchState} // if passwords do not match, show error message
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordMatchState} // if passwords do not match, show error message
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>

            {updateUserResponseState &&
            updateUserResponseState.success ===
              "The profile has been updated" ? (
              <Alert variant="info" className="mt-2">
                User updated
              </Alert>
            ) : updateUserResponseState &&
              updateUserResponseState.error !== "" ? (
              <Alert variant="danger" className="mt-2">
                Something went wrong
              </Alert>
            ) : (
              ""
            )}
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePageComponent;
