import { Navigate } from "react-router-dom";
import { STORAGE_KEY } from "../constants";

export const AppLayout = () => {
  const token = localStorage.getItem(STORAGE_KEY.TOKEN);

  return token ? <Navigate to={"/"} /> : <Navigate to="/login" replace />;
};
