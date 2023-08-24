import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {
  const { categories } = useSelector((state) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const myRefs = useRef([]); // array of input checkboxes

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      return { ...items, [category.name]: e.target.checked };
    });

    var selectedMainCategory = category.name.split("/")[0];

    var allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    }); // ids of allCategories are the same as of categories inside of the Redux object

    var indexOfMainCategory = allCategories.reduce((acc, item) => {
      var cat = item.name.split("/")[0];
      if (selectedMainCategory === cat) {
        acc.push(item.idx);
      }
      return acc;
    }, []);

    // Disabling the unselected categories
    if (e.target.checked) {
      setSelectedCategories((oldCategories) => [...oldCategories, "cat"]);
      myRefs.current.map((_, idx) => {
        if (!indexOfMainCategory.includes(idx)) {
          myRefs.current[idx].disabled = true;
          return "";
        }
      });
    } else {
      // if non of the categories is selected, make them all active
      setSelectedCategories((oldCategories) => {
        var a = [...oldCategories]; // made a copy of the old categories
        a.pop();
        if (a.length === 0) {
          window.location.href = "/product-list";
        }
        return a;
      });
    }

    myRefs.current.map((_, idx2) => {
      if (allCategories.length === 1) {
        if (idx2 !== idx) {
          myRefs.current[idx2].disabled = false;
        } else if (selectedCategories.length === 1) {
          myRefs.current[idx2].disabled = false;
        }
      }
      return "";
    });
  };

  return (
    <Form>
      <span className="fw-bold">Category</span>
      {categories.map((category, idx) => (
        <div key={idx} className="mb-3">
          <Form.Check type="checkbox" id={`check-api2-${idx}`}>
            <Form.Check.Input
              ref={(el) => (myRefs.current[idx] = el)} // collecting all the inputs
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
