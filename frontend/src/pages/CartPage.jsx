import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import CartPageComponent from "./components/CartPageComponent";

const CartPage = () => {
  return <CartPageComponent />;
};

export default CartPage;
