import { RouterProvider } from "react-router-dom";
import Router from "./appRoutes";

const Navigation = () => {
  return <RouterProvider router={Router} />;
};

export default Navigation;
