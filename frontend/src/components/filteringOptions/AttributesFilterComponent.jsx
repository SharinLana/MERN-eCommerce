import React from "react";

import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
      {[
        { color: ["red", "blue", "green"] },
        { ram: ["1 TB", "2 TB", "3 TB"] },
      ].map((item, index) => (
        <div key={index}>
          <Form.Label>
            <b>{Object.keys(item)}</b>
          </Form.Label>
          {item[Object.keys(item)].map((i, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              id="default-checkbox"
              label={i}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributesFilterComponent;
