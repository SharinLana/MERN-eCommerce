import React from "react";
import axios from "axios";
import ProductsPageComponent from "./components/ProductsPageComponent";

const fetchProducts = async () => {
  const { data } = await axios.get(`/api/products/admin`);
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};

const AdminProductsPage = () => {
  return (
    <ProductsPageComponent
      fetchProducts={fetchProducts}
      deleteProduct={deleteProduct}
    />
  );
};

export default AdminProductsPage;
