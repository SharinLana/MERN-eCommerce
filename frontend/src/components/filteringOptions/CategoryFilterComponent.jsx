import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {
  const { categories } = useSelector((state) => state.getCategories);

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter(items => {
      return {...items, [category.name]: e.target.checked}
    });
  };

  return (
    <Form>
      <span className="fw-bold">Category</span>
      {categories.map((category, idx) => (
        <div key={idx} className="mb-3">
          <Form.Check type="checkbox" id={`check-api2-${idx}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              onChange={(e) => selectCategory(e, category, idx)}
            />
            <Form.Check.Label>{category.name}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
};

export default CategoryFilterComponent;
