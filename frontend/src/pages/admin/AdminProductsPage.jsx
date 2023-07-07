import React from "react";
import axios from "axios";
import ProductsPageComponent from "./components/ProductsPageComponent";

const fetchProducts = async () => {
  const { data } = await axios.get(`/api/products/admin`);
  return data;
};

const AdminProductsPage = () => {
  return <ProductsPageComponent fetchProducts={fetchProducts} />;
};

export default AdminProductsPage;
