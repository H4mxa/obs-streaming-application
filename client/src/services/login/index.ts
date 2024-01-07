import { request } from "libs/request";

export const LoginService = {
  doLogin: (body: any) => {
    let url = ``;

    const headerOpt = {
      method: "POST",
      contentType: "application/json",
    };
    const promise: any = request(url, body, headerOpt);

    return promise;
  },
};
