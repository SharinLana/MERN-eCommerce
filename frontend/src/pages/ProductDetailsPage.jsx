import React from "react";
import axios from "axios";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  return (
    <ProductDetailsPageComponent
      addToCartReduxAction={addToCart}
      dispatch={dispatch}
      getProductDetails={getProductDetails}
    />
  );
};

export default ProductDetailsPage;
