import ChannelView from "app/features/channelView";
import Channels from "app/features/channels";
import Settings from "app/features/settings";
import { AuthenticationPage } from "app/pages/authentication/Loadable";
import { DashboardPage } from "app/pages/dashboard/Loadable";
import { STORAGE_KEY } from "modules/common/constants";
import { AppLayout } from "modules/common/layouts";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  // { path: "/", element: <AppLayout /> },
  {
    path: "/",
    element: <DashboardPage />,
    loader: () => {
      const token = localStorage.getItem(STORAGE_KEY.TOKEN);
      return token ? true : false;
    },
    children: [
      {
        path: "channels",
        element: <Channels />,
        children: [
          {
            path: ":id",
            element: <ChannelView />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);

export default Router;
