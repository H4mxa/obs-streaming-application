import { lazyLoad } from "utils/loadable";

export const DashboardPage = lazyLoad(
  () => import("./index"),
  (module) => module.Dashboard
);
