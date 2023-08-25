import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductListPageComponent from "./components/ProductListPageComponent";

let filtersUrl = "";

const getAllProducts = async (
  filters = {},
  sortOption = "",
  categoryName = "",
  pageNumParam = null,
  searchQuery = ""
) => {
  //   filtersUrl = "&price=60&rating=1,2,3&category=a,b,c,d&attrs=color-red-blue,size-1TB-2TB";
  filtersUrl = "";
  console.log(filters);
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const url = `/api/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;
  const { data } = await axios.get(url);
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
