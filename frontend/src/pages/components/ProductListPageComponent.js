import React, { useState, useEffect } from "react";
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import ProductCardComponent from "../../components/ProductCardComponent";
import SortingComponent from "../../components/SortingComponent";
import PaginationComponent from "../../components/PaginationComponent";
import AttributesFilterComponent from "../../components/filteringOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filteringOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filteringOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filteringOptions/RatingFilterComponent";

const ProductListPageComponent = ({ getAllProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) =>
      setProducts(data.products).catch((err) => console.log(err))
    );
  }, []);

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
                <PriceFilterComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <RatingFilterComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <CategoryFilterComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <AttributesFilterComponent />
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary">Primary</Button>{" "}
                <Button variant="danger">Danger</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {products.map((product) => (
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
            ))}
            <PaginationComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListPageComponent;
