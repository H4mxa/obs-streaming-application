import { useState } from "react";
import { STORAGE_KEY } from "../constants";
import { useDispatch } from "react-redux";
import { loginActions } from "redux/login";
import { navigateTo } from "app/route/utils";

const getUserDetails = () => {
  const userDetails = localStorage.getItem(STORAGE_KEY.USER_DETAILS);

  if (userDetails) {
    return JSON.parse(userDetails);
  }

  return null;
};

const useUserDetail = () => {
  const [userDetails, setUserDetails] = useState(getUserDetails());

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY.USER_DETAILS);
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    setUserDetails(null);
    dispatch(loginActions.logout());
    navigateTo("/");
  };

  return {
    isLogged: Boolean(userDetails),
    username: userDetails?.username ? userDetails.username : "Guest",
    logout,
  };
};

export default useUserDetail;
