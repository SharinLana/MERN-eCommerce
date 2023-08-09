import React from "react";
import axios from "axios";
import CreateProductPageComponent from "./components/CreateProductPageComponent";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
};

const uploadImagesCloudinaryApiRequest = (images, productId) => {
  // the "dasv6qbzy" string came from Cloudinary => Settings => Account => Product environment cloud name
  const url = "https://api.cloudinary.com/v1_1/dasv6qbzy/image/upload";

  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    // ! Make sure that you are appending images to the UNSIGNED upload preset!
    formData.append("upload_preset", "ywbtq4ii"); // the "ywbtq4ii" was taken from Cloudinary => settings => Upload => Upload presets: add upload preset => Upload preset name => Upload preset name => Save
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        axios.post(
          "/api/products/admin/upload?cloudinary=true&productId=" + productId,
          data
        );
      });
  }
};

const AdminCreateProductPage = () => {
  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminCreateProductPage;
