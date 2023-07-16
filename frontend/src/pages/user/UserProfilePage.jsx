import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePageComponent from "./components/UserProfilePageComponent";
import { setReduxUserState } from "../../redux/actions/userActions";

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

const fetchUserProfileData = async (user_id) => {
  const { data } = await axios.get(`/api/users/profile/${user_id}`); // the user_id will be fetched from the Redux state userInfo: _id
  return data;
};

const UserProfilePage = () => {
  // fetch it here and not in side of the UserProfilePageComponent
  // because it will make the testing easier (you will be able to replace it in the testing function)
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const dispatch = useDispatch();

  return (
    <UserProfilePageComponent
      updateUserProfileApiRequest={updateUserProfileApiRequest}
      fetchUserProfileData={fetchUserProfileData}
      userInfoFromRedux={userInfo}
      dispatch={dispatch}
      setReduxUserState={setReduxUserState}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default UserProfilePage;
