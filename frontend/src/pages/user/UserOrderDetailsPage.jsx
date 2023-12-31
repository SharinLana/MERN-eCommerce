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

  const loadPayPalScript = (
    cartSubtotal,
    cartItems,
    updateStateAfterMakingPayment,
    orderId
  ) => {
    loadScript({
      "client-id":
        "Abf4b19XpbIsGXjbzV4dAu9wNNMXuugazAsDWgLVF-cGx-rcqBUOJ5XzgX2H2ysMo1dugs0ovwd1Aq0n",
    })
      .then((paypal) => {
        // console.log(paypal);
        paypal
          .Buttons(
            buttons(
              cartSubtotal,
              cartItems,
              updateStateAfterMakingPayment,
              orderId
            )
          )
          .render("#paypal-container-element"); // the button elements is in the UserOrderDetailsPageComponent.js
      })
      .catch((err) =>
        console.error("Failed to load the PayPal JS SDK script", err)
      );
  };

  const buttons = (cartSubtotal, cartItems, updateStateAfterMakingPayment, orderId) => {
    // return several functions:
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          // following the PayPal documentation:
          purchase_units: [
            {
              amount: {
                value: cartSubtotal,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: cartSubtotal,
                  },
                },
              },
              items: cartItems.map((product) => {
                return {
                  name: product.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: product.price,
                  },
                  quantity: product.quantity,
                };
              }),
            },
          ],
        });
      }, // providing order data to PayPal

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          let transaction = orderData.purchase_units[0].payments.captures[0];

          if (
            transaction.status === "COMPLETED" &&
            Number(transaction.amount.value) === Number(cartSubtotal)
          ) {
            // update the order payment status in the DB (isPaid: true)
            updateOrder(orderId)
              .then((data) => {
                if (data.isPaid) {
                  updateStateAfterMakingPayment(data.paidAt);
                }
              })
              .catch((err) => console.log(err));
          } else {
            console.log("something went wrong");
          }
        });
      },

      onError: onErrorHandler,
      onCancel: onCancelHandler,
    };
  };

  const onCancelHandler = () => {
    console.log("cancel");
  };

  const onErrorHandler = () => {
    console.log("error");
  };

  const updateOrder = async (orderId) => {
    const { data } = await axios.put(`/api/orders/paid/${orderId}`);
    return data;
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
