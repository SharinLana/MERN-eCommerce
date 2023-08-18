import React from "react";
import axios from "axios";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const writeReviewAPIRequest = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/users/review/${productId}`, {
    ...formInputs,
  });
  return data;
};

const ProductDetailsPage = () => {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const dispatch = useDispatch();

  return (
    <ProductDetailsPageComponent
      addToCartReduxAction={addToCart}
      dispatch={dispatch}
      getProductDetails={getProductDetails}
      userInfo={userInfo}
      writeReviewAPIRequest={writeReviewAPIRequest}
    />
  );
};

export default ProductDetailsPage;
