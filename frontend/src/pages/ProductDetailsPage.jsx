import React from "react";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.value)

  const addToCartHandler = () => {
    dispatch(addToCart());
  };

  return (
    <ProductDetailsPageComponent
      addToCartHandler={addToCartHandler}
      products={products}
    />
  );
};

export default ProductDetailsPage;
