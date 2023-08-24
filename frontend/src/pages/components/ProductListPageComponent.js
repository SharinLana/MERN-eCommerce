import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import ProductCardComponent from "../../components/ProductCardComponent";
import SortingComponent from "../../components/SortingComponent";
import PaginationComponent from "../../components/PaginationComponent";
import AttributesFilterComponent from "../../components/filteringOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filteringOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filteringOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filteringOptions/RatingFilterComponent";

const ProductListPageComponent = ({ getAllProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]); // collect category attributes from DB and show on the webpage
  const [attrsFromFilter, setAttrsFromFilter] = useState([]); // collect user filters for category attributes
  const [showResetFiltersBtn, setShowResetFiltersBtn] = useState(false);
  const [filters, setFilters] = useState({}); // collect all filters
  const [price, setPrice] = useState(500);
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});

  const { categoryName } = useParams() || "";
  const location = useLocation();

  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );

      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);

  // Fetching category attributes when a category checkbox on the left is selected
  useEffect(() => {
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      let cat = [];
      let count;
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          let name = category.split("/")[0];
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          if (count === 1) {
            let index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      });
    }
  }, [categoriesFromFilter, categories]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    console.log(filters);
  }, [filters]);

  const handleFilters = () => {
    setShowResetFiltersBtn(true);
    setFilters({
      price: price,
      rating: ratingsFromFilter,
      category: categoriesFromFilter,
      attrs: attrsFromFilter,
    });
  };

  const resetFilters = () => {
    setShowResetFiltersBtn(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="mb-3 mt-3">
                <SortingComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                FILTER: <br />
                <PriceFilterComponent price={price} setPrice={setPrice} />
              </ListGroup.Item>
              <ListGroup.Item>
                <RatingFilterComponent
                  setRatingsFromFilter={setRatingsFromFilter}
                />
              </ListGroup.Item>
              
              {!location.pathname.match(/\/category/) && (
                <ListGroup.Item>
                  <CategoryFilterComponent
                    setCategoriesFromFilter={setCategoriesFromFilter}
                  />
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <AttributesFilterComponent
                  attrsFilter={attrsFilter}
                  setAttrsFromFilter={setAttrsFromFilter}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handleFilters}>
                  Filter
                </Button>{" "}
                {showResetFiltersBtn && (
                  <Button variant="danger" onClick={resetFilters}>
                    Reset filters
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {loading ? (
              <h2>Loading products...</h2>
            ) : error ? (
              <h2>Error while loading products. Try again later</h2>
            ) : (
              products.map((product) => (
                <ProductCardComponent
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                />
              ))
            )}

            <PaginationComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListPageComponent;
