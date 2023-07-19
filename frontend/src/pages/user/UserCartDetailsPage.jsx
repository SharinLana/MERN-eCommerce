import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import UserCartDetailsPageComponent from "./components/UserCartDetailPageComponent";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
    return data;
  };

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      dispatch={dispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      getUser={getUser}
    />
  );
};

export default UserCartDetailsPage;
