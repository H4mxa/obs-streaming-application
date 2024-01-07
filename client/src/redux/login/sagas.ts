import { takeLatest } from "redux-saga/effects";
import { loginActions } from ".";

function* watchUserLoginProcess() {}

export default function* () {
  yield takeLatest(loginActions.processUserLogin.type, watchUserLoginProcess);
}
