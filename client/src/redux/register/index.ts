import { IRegisterState, registerPayload } from "./types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import registerSaga from "./sagas";

const initialState: IRegisterState = {
  loading: false,
};

// slice
export const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    processRegister: (state, { payload }: { payload: registerPayload }) => {
      state.loading = true;
    },
    processRegisterSuccess: (state) => {
      state.loading = true;
    },
    processRegisterFailed: (state) => {
      state.loading = true;
    },
  },
});

export const { actions: registerActions, reducer: registerReducer } = slice;

export const useRegisterSlice = () => {
  const reducerLoaded = useInjectReducer({
    key: slice.name,
    reducer: registerReducer,
  });
  const sagaLoaded = useInjectSaga({ key: slice.name, saga: registerSaga });
  const registerSliceLoaded = reducerLoaded && sagaLoaded;
  return { actions: slice.actions, registerSliceLoaded };
};
