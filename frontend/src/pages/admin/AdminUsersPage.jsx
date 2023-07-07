import React from "react";
import axios from "axios";
import UsersPageComponent from "./components/UsersPageComponent";

const fetchUsers = async () => {
  const { data } = await axios.get("/api/users");
  return data;
};

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};

const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;
