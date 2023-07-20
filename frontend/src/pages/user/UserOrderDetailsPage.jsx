import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadScript } from "@paypal/paypal-js";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const loadPayPalScript = () => {
    loadScript({
      "client-id":
        "Abf4b19XpbIsGXjbzV4dAu9wNNMXuugazAsDWgLVF-cGx-rcqBUOJ5XzgX2H2ysMo1dugs0ovwd1Aq0n",
    })
      .then((paypal) => {
        // console.log(paypal);
        paypal
          .Buttons({
            createOrder: createPayPalOrderHandler, // providing order data to PayPal
            onCancel: onCancelHandler,
            onApprove: onApproveHandler,
            onError: onErrorHandler,
          })
          .render("#paypal-container-element"); // the button elements is in the UserOrderDetailsPageComponent.js
      })
      .catch((err) =>
        console.error("Failed to load the PayPal JS SDK script", err)
      );
  };

  const createPayPalOrderHandler = () => {
    console.log("create order");
  };

  const onCancelHandler = () => {
    console.log("cancel");
  };

  const onApproveHandler = () => {
    console.log("approve");
  };

  const onErrorHandler = () => {
    console.log("error");
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailsPage;
