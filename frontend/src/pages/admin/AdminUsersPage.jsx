import React from "react";
import axios from "axios";
import UsersPageComponent from "./components/UsersPageComponent";

const AdminUsersPage = () => {
  const { data } = axios.get("/api/users");

  return <UsersPageComponent users={data} />;
};

export default AdminUsersPage;
