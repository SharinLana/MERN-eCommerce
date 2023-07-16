import React from "react";
import axios from "axios";
import UserProfilePageComponent from "./components/UserProfilePageComponent";

const UserProfilePage = () => {
  const updateUserProfileApiRequest = async (
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password
  ) => {
    const { data } = await axios.post("/api/users/profile", {
      name,
      lastName,
      phoneNumber,
      address,
      country,
      zipCode,
      city,
      state,
      password,
    });

    return data;
  };
  return (
    <UserProfilePageComponent
      updateUserProfileApiRequest={updateUserProfileApiRequest}
    />
  );
};

export default UserProfilePage;
