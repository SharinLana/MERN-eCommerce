import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import HomePageComponent from "./components/HomePageComponent";

const getBestsellers = async() => {
  const {data} = await axios.get("/api/products/bestsellers");
  return data;
}

const HomePage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  return (
    <HomePageComponent
      categories={categories}
      getBestsellers={getBestsellers}
    />
  );
};

export default HomePage;
