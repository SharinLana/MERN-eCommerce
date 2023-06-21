import React from "react";
import AdminLinksComponent from "../../components/AdminLinksComponent";
import { Row, Col } from "react-bootstrap";

const AdminChatsPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatsPage;
