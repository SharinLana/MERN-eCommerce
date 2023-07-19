import React from "react";
import { useSelector } from "react-redux";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  return <UserOrderDetailsPageComponent userInfo={userInfo} />;
};

export default UserOrderDetailsPage;
