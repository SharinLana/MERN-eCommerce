import React from "react";
import axios from "axios";
import ProductListPageComponent from "./components/ProductListPageComponent";

const getAllProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

const ProductListPage = () => {
  return <ProductListPageComponent getAllProducts={getAllProducts} />;
};

export default ProductListPage;
