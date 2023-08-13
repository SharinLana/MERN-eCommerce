import React from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateProductPageComponent = ({
  createProductApiRequest,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  categories,
  dispatch,
  newCategory,
}) => {
  const [validated, setValidated] = useState(false);
  const [attributesArray] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChosen, setCategoryChosen] = useState("Choose category");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesArray: attributesArray,
    };
    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("too many files");
        return;
      }
      createProductApiRequest(formInputs)
        .then((data) => {
          if (images) {
            // eslint-disable-next-line
            if (process.env.NODE_ENV === "production") {
              // to do: change to !==
              uploadImagesApiRequest(images, data.productId)
                .then((res) => console.log(res))
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(images, data.productId);
            }
          }
          if (data.message === "Product was successfully created")
            navigate("/admin/products");
        })
        .catch((er) => {
          setCreateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const selectCategory = (e) => {
    setCategoryChosen(e.target.value);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      dispatch(newCategory(e.target.value));
      // To automatically select a new category right after its creation
      setTimeout(() => {
       
        let element = document.getElementById("cats")
        element.value = e.target.value;
        setCategoryChosen(e.target.value);
        e.target.value = "";
      }, 200);
    }
  };
  console.log(categoryChosen);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton />(<small>remove selected</small>)
              </Form.Label>
              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={selectCategory}
              >
                <option value="Choose category">Choose category</option>
                {categories.map((category, idx) => {
                  return (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control
                onKeyUp={newCategoryHandler}
                name="newCategory"
                type="text"
              />
            </Form.Group>

            <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>Choose attribute </Form.Label>
                  <Form.Select
                    name="atrrKey"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute</option>
                    <option value="red">color</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Select
                    name="atrrVal"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute value</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>attr key</td>
                    <td>attr value</td>
                    <td>
                      <CloseButton />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create category"
                    required={true}
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="primary">
              After typing attribute key and value press enter on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => uploadHandler(e.target.files)}
              />
              {isCreating}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
