import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


    return (
      <Alert
        variant="success"
        show={showCartMessage}
        onClose={() => setShowCartMessage(false)}
        dismissible
      >
        <Alert.Heading>The product was added to your cart!</Alert.Heading>
        <p>
          <Button variant="success" onClick={goBack}>Go back</Button>{" "}
          <Link to="/cart">
            <Button variant="danger">Go to cart</Button>
          </Link>
        </p>
      </Alert>
    );

};

export default AddedToCartMessageComponent;
