import React from "react";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  return (
    <ProductDetailsPageComponent
      addToCartHandler={addToCartHandler}
      dispatch={dispatch}
    />
  );
};

export default ProductDetailsPage;
