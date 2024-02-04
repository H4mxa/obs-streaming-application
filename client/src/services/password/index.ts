import { request } from "libs/request";

export const passwordService = {
  updatePassword: (body: any) => {
    let url = `${import.meta.env.API_BASE_URL}/settings/password`;

    const headerOpt = {
      method: "PATCH",
      contentType: "application/json",
      token: localStorage.token,
    };

    return request(url, body, headerOpt);
  },
};
