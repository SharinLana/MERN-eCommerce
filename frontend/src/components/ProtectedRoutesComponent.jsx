import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouteComponent = () => {
  let auth = true;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteComponent;
