import React from "react";
import axios from "axios";
import OrdersPageController from "./components/OrdersPageController";

const fetchOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const AdminOrdersPage = () => {
  return <OrdersPageController fetchOrders={fetchOrders} />;
};

export default AdminOrdersPage;
