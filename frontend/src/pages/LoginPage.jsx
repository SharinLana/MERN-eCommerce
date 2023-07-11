import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import LoginPageComponent from "./components/LoginPageComponent";
import { setReduxUserState } from "../redux/actions/userActions";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });

  // Store the logged in user info in the local storage if the "Do Not Logout" box was checked
  if (data.userLoggedIn.doNotLogout) {
    // data will remain in the local storage even after closing the browser and reopening it
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  } else {
    // data will remain in the session storage only until closing browser 
    sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }

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
