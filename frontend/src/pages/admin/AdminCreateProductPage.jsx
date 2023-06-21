import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminCreateProductPage = () => {

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>

        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;
