export interface ILoginState {
  loading: boolean;
  token: string | null;
}

export type loginPayload = {
  payload: {
    email: string;
    password: string;
  };
};
