import React from "react";
import axios from "axios";
import AnalyticsPageComponent from "./components/AnalyticsPageComponent";
import socketIOClient from "socket.io-client"; // but first, start setting Socket.io in the server.js and in orderModel.js

const fetchOrdersForFirstDate = async(firstDateToCompare) => {
  const { data } = await axios.get("/api/orders/analysis/" + firstDateToCompare);
  return data;
};

const fetchOrdersForSecondDate = async (secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare
  );
  return data;
};


const AdminAnalyticsPage = () => {
  return (
    <AnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
