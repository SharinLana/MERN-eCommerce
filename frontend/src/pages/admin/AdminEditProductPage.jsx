import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EditProductPageComponent from "./components/EditProductPage";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  console.log(productId);
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const uploadHandler = async (images, productId) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });

  await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    // eslint-disable-next-line
    if (process.env.NODE_ENV === "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      dispatch={dispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadHandler={uploadHandler}
    />
  );
};

export default AdminEditProductPage;
