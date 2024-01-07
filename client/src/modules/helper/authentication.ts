const TOKEN_PREFIX: string = "token";
const LOGIN_STATUS_PREFIX: string = "login";
export const AuthenticationHelper = {
  saveToken: (token: string): void => {
    localStorage.setItem(TOKEN_PREFIX, token);
  },
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_PREFIX) || null;
  },
  logout: (): void => {
    localStorage.removeItem("currentView");
    localStorage.removeItem(TOKEN_PREFIX);
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
};
