import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage";

const ProtectedRoutesComponent = ({ adminRoute }) => {
  const [isAuth, setIsAuth] = useState("admin");

  useEffect(() => {
    axios
      .get("/api/get-token")
      .then(function (data) {
        if (data.data.token) {
          setIsAuth(data.data.token);
        }
        return isAuth;
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized. Please log in") {
          setIsAuth();
          return isAuth;
        }
      });
  }, [isAuth]);

  // if the user is not logged in
  if (isAuth === undefined) {
    return <LoginPage />;
  }

  // if the user is logged in, NOT and admin and trying to access admin's routes
  else if (isAuth && adminRoute && isAuth !== "admin") {
    return (
      <>
        <Navigate to="/login" />
        <LoginPage />
      </>
    );
  }

  // if the user is logged in, is admin and trying to access admin's routes
  else if (isAuth && adminRoute) {
    return <Outlet />;
  }

  // if the user is logged in, is admin and trying to access user's protected routes
  else if (isAuth && !adminRoute) {
    return (
      <>
        <UserChatComponent />
        {/* all routes inside of the protected user route */}
        <Outlet />
      </>
    );
  }
  // other cases
  else {
    return (
      <>
        <Navigate to="/login" />
        <LoginPage />
      </>
    );
  }
};

export default ProtectedRoutesComponent;
