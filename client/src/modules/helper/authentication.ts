import { STORAGE_KEY } from "modules/common/constants";

const LOGIN_STATUS_PREFIX: string = "login";
export const AuthenticationHelper = {
  saveToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEY.TOKEN, token);
  },
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEY.TOKEN) || null;
  },
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    AuthenticationHelper.removeLoginStatus();
  },
  isLoggedIn: (): boolean => {
    return !!AuthenticationHelper.getToken();
  },
  saveLoginStatus: (isCreated: 0 | 1) => {
    localStorage.setItem(LOGIN_STATUS_PREFIX, `${isCreated}`);
  },
  getLoginStatus: () => {
    return localStorage.getItem(LOGIN_STATUS_PREFIX);
  },
  removeLoginStatus: () => {
    return localStorage.removeItem(LOGIN_STATUS_PREFIX);
  },
  getUserDetails: () => {
    const userDetails = localStorage.getItem(STORAGE_KEY.USER_DETAILS);

    if (userDetails) {
      return JSON.parse(userDetails);
    }
  },
};
