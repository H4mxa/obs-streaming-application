import { request } from "libs/request";
import { API_URLS } from "./apiConstants";

export const RegisterService = {
  register: (body: any) => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.register}`;

    const headerOpt = {
      method: "POST",
      contentType: "application/json",
    };
    return request(url, body, headerOpt);
  },
};
