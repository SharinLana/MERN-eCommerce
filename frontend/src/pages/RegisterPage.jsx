import React from "react";
import axios from "axios";
import RegisterPageComponent from "./components/RegisterPageComponent";

const registerUserApiRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });

  return data;
};

const RegisterPage = () => {
  return (
    <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} />
  );
};

export default RegisterPage;
