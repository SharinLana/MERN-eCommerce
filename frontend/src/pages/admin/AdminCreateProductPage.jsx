import React from "react";
import axios from "axios";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";

import { useSelector, useDispatch } from "react-redux";
import {
  newCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      dispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
    />
  );
};

export default AdminCreateProductPage;
