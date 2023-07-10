import React from "react";
import axios from "axios";
import LoginPageComponent from "./components/LoginPageComponent";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });

  return data;
};

const LoginPage = () => {
  return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} />;
};

export default LoginPage;
