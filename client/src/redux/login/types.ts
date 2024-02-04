export interface ILoginState {
  loading: boolean;
  token: string | null;
  isLoggedIn: boolean;
}

export type loginPayload = {
  payload: {
    email: string;
    password: string;
  };
};
