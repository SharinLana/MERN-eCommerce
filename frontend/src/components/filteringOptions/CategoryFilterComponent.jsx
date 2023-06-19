import React from "react";
import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <Form>
      <span className="fw-bold">Category</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="mb-3">
          <Form.Check type="checkbox" id={`check-api2-${idx}`}>
            <Form.Check.Input type="checkbox" isValid />
            <Form.Check.Label>Category-{idx}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
};

export default CategoryFilterComponent;
