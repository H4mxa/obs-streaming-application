import { lazyLoad } from "utils/loadable";

export const AuthenticationPage = lazyLoad(
  () => import("./index"),
  (module) => module.Authentication
);
