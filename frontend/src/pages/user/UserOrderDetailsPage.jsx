import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
    />
  );
};

export default UserOrderDetailsPage;
