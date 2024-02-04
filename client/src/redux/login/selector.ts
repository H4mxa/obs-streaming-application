import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

const selectLoginSlice = (state: RootState) => state.login;

export const selectIsLoggedIn = createSelector(
  [selectLoginSlice],
  (state) => state?.isLoggedIn ?? false
);
