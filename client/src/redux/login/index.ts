import { ILoginState, loginPayload } from "./types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import loginSaga from "./sagas";
import { AuthenticationHelper } from "modules/helper/authentication";

const initialState: ILoginState = {
  loading: false,
  token: null,
  isLoggedIn: AuthenticationHelper.isLoggedIn(),
};

// slice
export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processInitApp: () => {},

    processUserLogin: (state, { payload }: loginPayload) => {
      state.loading = true;
    },
    processUserLoginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    },
    processUserLoginFailed: (state) => {
      state.loading = false;
    },

    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { actions: loginActions, reducer: loginReducer } = slice;

export const useLoginSlice = () => {
  const reducerLoaded = useInjectReducer({
    key: slice.name,
    reducer: loginReducer,
  });
  const sagaLoaded = useInjectSaga({ key: slice.name, saga: loginSaga });
  const loginSliceLoaded = reducerLoaded && sagaLoaded;
  return { actions: slice.actions, loginSliceLoaded };
};
