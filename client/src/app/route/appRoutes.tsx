import { AuthenticationPage } from "app/pages/authentication/Loadable";
import Dashboard from "app/pages/dashboard";
import { AppLayout } from "modules/common/layouts";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  { path: "/", element: <AppLayout /> },
  { path: "/dashboard", element: <Dashboard /> },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);

export default Router;
