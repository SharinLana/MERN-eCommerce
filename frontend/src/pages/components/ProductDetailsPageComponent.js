import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  dispatch,
  getProductDetails,
  userInfo,
}) => {
  const { id } = useParams(); // the product id extracted from the route
  const [productQuantity, setProductQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);

  const addToCartHandler = () => {
    dispatch(addToCartReduxAction(id, productQuantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (product.images) {
      var options = {
        // width: 400,
        // zoomWidth: 500,
        // fillContainer: true,
        // zoomPosition: "bottom",
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };

      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  });

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        );
      });
  }, []);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    console.log("click")

    const formInputs = {
      comment: e.currentTarget.comment.value, // comment came from the "name" property in the <Form.Select>
      rating: e.currentTarget.rating.value
    }

    if (e.currentTarget.checkValidity() === true) {
      console.log(product._id, formInputs);
    }
    setProductReviewed(true);
  }

  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {loading ? (
          <h2>Loading product details...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            {/* zIndex needed for zooming in on the image */}
            <Col md={4} style={{ zIndex: 1 }}>
              {product.images
                ? product.images.map((image, id) => (
                    <div key={id} id={`imageId${id + 1}`}>
                      {/* fluid prop helps to fit the component nicely to the parent element */}
                      <Image fluid src={`${image.path ?? null}`} />
                    </div>
                  ))
                : null}

              <br />
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />{" "}
                      ({product.reviews.length})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      Status: {product.count > 0 ? "in stock" : "out of stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price: <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Form.Select
                        value={productQuantity}
                        onChange={(e) =>
                          setProductQuantity(e.currentTarget.value)
                        }
                        size="sm"
                        aria-label="Default select example"
                        style={{ zIndex: 2000 }}
                      >
                        <option>Choose:</option>
                        {[...Array(product.count).keys()].map((number) => (
                          <option key={number + 1} value={number + 1}>
                            {number + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button variant="danger" onClick={addToCartHandler}>
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              {/* Review section */}
              <Row>
                <Col className="mt-5">
                  <h5>REVIEWS</h5>
                  <ListGroup variant="flush">
                    {product.reviews.map((review, idx) => (
                      <ListGroup.Item key={idx}>
                        {review.user.name} <br />{" "}
                        <Rating
                          readonly
                          size={20}
                          initialValue={review.rating}
                        />
                        <br />
                        {review.createdAt.substring(0, 10)}
                        <br />
                        {review.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
              <hr />

              {/* Send review form */}
              {!userInfo.name && (
                <Alert variant="danger">Login first to write a review</Alert>
              )}

              <Form onSubmit={sendReviewHandler}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Write a review</Form.Label>
                  <Form.Control
                    name="comment"
                    as="textarea"
                    rows={3}
                    required
                    disabled={!userInfo.name}
                  />
                </Form.Group>
                <Form.Select
                  name="rating"
                  aria-label="Default select example"
                  required
                  disabled={!userInfo.name}
                >
                  <option value="">Open this select menu</option>
                  <option value="5">5 (excellent)</option>
                  <option value="4">4 (good)</option>
                  <option value="3">3 (average)</option>
                  <option value="2">2 (bad)</option>
                  <option value="1">1 (awful)</option>
                </Form.Select>
                <Button
                  variant="primary"
                  className="mb-3 mt-3"
                  disabled={!userInfo.name}
                  type="submit"
                >
                  Submit
                </Button>
                {productReviewed}
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
