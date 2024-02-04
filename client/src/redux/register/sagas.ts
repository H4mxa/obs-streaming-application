import { StrictEffect, call, put, takeLatest } from "redux-saga/effects";
import { LoginService } from "services/login";
import { navigateTo } from "app/route/utils";
import { registerActions } from ".";
import { registerPayload } from "./types";
import { RegisterService } from "services/register";
import toast from "react-hot-toast";

interface body {
  email: string;
  password: string;
}

function* watchRegisterProcess(action: {
  payload: registerPayload;
}): Generator<StrictEffect, void, any> {
  try {
    const result = yield call(RegisterService.register, action.payload);
    if (result && result.status >= 200 && result.status < 300) {
      toast.success(result?.message ?? "User created successfully");
      yield put(registerActions.processRegisterSuccess());
      navigateTo("/");
    }
  } catch (error: any) {
    toast.error(error?.message ?? "Something went wrong");
  }
}

export default function* () {
  yield takeLatest<any>(
    registerActions.processRegister.type,
    watchRegisterProcess
  );
}
