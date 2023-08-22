import React from "react";

import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {

  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((item, idx) => {
          return (
            <div key={idx}>
              <Form.Label>
                <b>{item.key}</b>
              </Form.Label>
              {item.value.map((val, i) => {
                return (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    id="default-checkbox"
                    label={val}
                    onChange={e => setAttrsFromFilter(items => {
                      console.log(item.key)
                    })}
                  />
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default AttributesFilterComponent;
