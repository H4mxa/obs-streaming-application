import { ILoginState } from "./types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import loginSaga from "./sagas";

const initialState: ILoginState = {
  loading: false,
  token: null,
};

// slice
export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processUserLogin: (state) => {
      state.loading = true;
    },
    processUserLoginSuccess: (state) => {
      state.loading = false;
    },
    processUserLoginFailed: (state) => {
      state.loading = false;
    },

    logout(state) {
      state.token = null;
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
