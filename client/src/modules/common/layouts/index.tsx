import { Navigate } from "react-router-dom";

export const AppLayout = () => {
  return false ? <></> : <Navigate to="/login" replace />;
};
