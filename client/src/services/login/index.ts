import { request } from "libs/request";
import { API_URLS } from "./apiConstants";
import toast from "react-hot-toast";

export const LoginService = {
  doLogin: (body: any) => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.login}`;

    const headerOpt = {
      method: "POST",
      contentType: "application/json",
    };

    const promise = request(url, body, headerOpt);

    toast.promise(promise, {
      loading: "Loading",
      success: "Login successful",
      error: "Invalid credentials",
    });

    return promise;
  },
};
