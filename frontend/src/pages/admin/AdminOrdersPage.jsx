import React from "react";
import axios from "axios";
import OrdersPageComponent from "./components/OrdersPageComponent";

const fetchOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const AdminOrdersPage = () => {
  return <OrdersPageComponent fetchOrders={fetchOrders} />;
};

export default AdminOrdersPage;
