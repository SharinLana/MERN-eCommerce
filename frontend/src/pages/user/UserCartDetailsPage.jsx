import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCartDetailsPageComponent from "./components/UserCartDetailPageComponent";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const dispatch = useDispatch()

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      dispatch={dispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );
};

export default UserCartDetailsPage;
