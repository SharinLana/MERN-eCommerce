import React from "react";
import axios from "axios";
import OrderDetailsComponent from "./components/OrderDetailsComponent";

const getOrderDetails = async (orderId) => {
  const { data } = await axios.get(`/api/orders/user/${orderId}`);
  return data;
};

const AdminOrderDetailsPage = () => {
  return <OrderDetailsComponent getOrderDetails={getOrderDetails} />;
};

export default AdminOrderDetailsPage;
