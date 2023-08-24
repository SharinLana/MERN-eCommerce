import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductListPageComponent from "./components/ProductListPageComponent";

const getAllProducts = async (
  filters = {},
  sortOption = "",
  categoryName = "",
  pageNumParam = null,
  searchQuery = ""
) => {
  const { data } = await axios.get("/api/products");
  return data;
};

const ProductListPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <ProductListPageComponent
      getAllProducts={getAllProducts}
      categories={categories}
    />
  );
};

export default ProductListPage;
