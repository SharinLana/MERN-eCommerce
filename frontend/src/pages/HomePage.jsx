import React from "react";
import { useSelector } from "react-redux";
import HomePageComponent from "./components/HomePageComponent";

const HomePage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  return <HomePageComponent categories={categories} />;
};

export default HomePage;
