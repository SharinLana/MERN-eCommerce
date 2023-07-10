import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import LoginPageComponent from "./components/LoginPageComponent";
import { setReduxUserState } from "../redux/dispatchers/userDispatchers";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });

  return data;
};

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      dispatch={dispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default LoginPage;
