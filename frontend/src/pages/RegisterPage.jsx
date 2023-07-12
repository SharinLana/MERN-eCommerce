import React from "react";
import axios from "axios";
import RegisterPageComponent from "./components/RegisterPageComponent";

import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerUserApiRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });

  sessionStorage.setItem("userInfo", JSON.stringify(data.newUser));
  // redirect the user to the /user page
  if (data.message === "User has been created!") window.location.href = "/user";

  return data;
};

const RegisterPage = () => {
  const dispatch = useDispatch();

  return (
    <RegisterPageComponent
      registerUserApiRequest={registerUserApiRequest}
      dispatch={dispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default RegisterPage;
