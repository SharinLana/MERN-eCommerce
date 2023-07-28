import React from "react";
import { useSelector } from "react-redux";
import EditProductPageComponent from "./components/EditProductPage";

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return <EditProductPageComponent categories={categories} />;
};

export default AdminEditProductPage;
