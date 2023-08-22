import React from "react";

import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter, idx) => {
          return (
            <div key={idx}>
              <Form.Label>
                <b>{filter.key}</b>
              </Form.Label>
              {filter.value.map((valForKey, i) => {
                return (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    id="default-checkbox"
                    label={valForKey}
                    onChange={(e) =>
                      setAttrsFromFilter((filters) => {
                        if (filters.length === 0) {
                          return [{ key: filter.key, values: [valForKey] }];
                        }
                        // If filters length is > than 0:
                        let index = filters.findIndex(
                          (item) => item.key === filter.key
                        );

                        if (index === -1) {
                          return [
                            ...filters,
                            { key: filter.key, values: [valForKey] },
                          ];
                        }

                        if (e.target.checked) {
                          filters[index].values.push(valForKey);
                          let unique = [...new Set(filters[index].values)];
                          filters[index].values = unique;

                          return [...filters]; // return modified filters
                        }

                        // If checked key was unchecked (user changed his mind and unchecked the box)
                        let valuesWithoutUnchecked = filters[
                          index
                        ].values.filter((val) => val !== valForKey);

                        filters[index].values = valuesWithoutUnchecked;
                        if (valuesWithoutUnchecked.length > 0) {
                          return [...filters];
                        } else {
                          let filtersWithoutOneKey = filters.filter(
                            (item) => item.key !== filter.key
                          );
                          return [...filtersWithoutOneKey];
                        }

                      })
                    }
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
