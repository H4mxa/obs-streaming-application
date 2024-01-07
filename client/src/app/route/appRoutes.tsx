import Authentication from "app/pages/authentication";
import Dashboard from "app/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  { path: "/auth", element: <Authentication /> },
  { path: "/", element: <Dashboard /> },
]);

export default Router;
