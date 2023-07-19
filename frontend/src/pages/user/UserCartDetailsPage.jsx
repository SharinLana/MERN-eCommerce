import React from "react";
import { useSelector } from "react-redux";
import UserCartDetailsPageComponent from "./components/UserCartDetailPageComponent";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
    />
  );
};

export default UserCartDetailsPage;
