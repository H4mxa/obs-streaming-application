import {
  StrictEffect,
  call,
  delay,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { channelService } from "services/channel";
import { channelActions } from ".";
import { updateChannelSettingsPayloadTypes } from "./types";
import toast from "react-hot-toast";
import { selectChannels } from "./selector";

interface body {
  email: string;
  password: string;
}

function* watchChannelSettingsProcess(action: {}): Generator<
  StrictEffect,
  void,
  any
> {
  try {
    const result = yield call(channelService.getChannelSettings);
    if (result && result.status >= 200 && result.status < 300 && result.data) {
      yield put(channelActions.processChannelSettingsSuccess(result.data));
    }
  } catch (error) {
    yield put(channelActions.processChannelSettingsFailed());

    throw error;
  }
}

function* watchUpdateChannelSettingsProcess(action: {
  payload: updateChannelSettingsPayloadTypes;
}): Generator<StrictEffect, void, any> {
  try {
    const result = yield call(
      channelService.updateChannelSettings,
      action.payload
    );
    if (result && result.status >= 200 && result.status < 300 && result.data) {
      yield put(
        channelActions.processUpdateChannelSettingsSuccess(result.data)
      );
    }
  } catch (error) {
    yield put(channelActions.processUpdateChannelSettingsFailed());

    throw error;
  }
}

function* watchFollowedChannelProcess(): Generator<StrictEffect, void, any> {
  try {
    const result = yield call(channelService.getFollowedChannel);

    if (result.status >= 200 && result.status < 300 && result.data) {
      yield put(
        channelActions.processFollowedChannelSuccess(
          result.data.followedChannels
        )
      );
    }
  } catch (error) {
    yield put(channelActions.processFollowedChannelFailed());
    toast.error("Error occured when fetching the following channel");
  }
}

function* watchChannelsProcess(): Generator<StrictEffect, void, any> {
  try {
    const result = yield call(channelService.getChannels);

    if (result.status >= 200 && result.status < 300 && result.data) {
      yield put(channelActions.processChannelsSuccess(result.data.channels));
    }
  } catch (error) {
    yield put(channelActions.processChannelsFailed());
    toast.error("Error occured when fetching channels");
  }
}

function* watchChannelsDetailsProcess(
  action: any
): Generator<StrictEffect, void, any> {
  try {
    const payload = action.payload;
    const result = yield call(channelService.getChannelDetailsById, payload);
    if (result.status >= 200 && result.status < 300 && result.data) {
      yield put(channelActions.processChannelDetailsSuccess(result.data));
    }
  } catch (error: any) {
    yield put(channelActions.processChannelDetailsFailed());
    toast.error(
      error?.message ?? "Error occured when fetching channel details"
    );
  }
}

export default function* () {
  yield takeLatest<any>(
    channelActions.processChannelSettings.type,
    watchChannelSettingsProcess
  );
  yield takeLatest<any>(
    channelActions.processUpdateChannelSettings.type,
    watchUpdateChannelSettingsProcess
  );

  yield takeLatest<any>(
    channelActions.processFollowedChannel.type,
    watchFollowedChannelProcess
  );

  yield takeLatest<any>(
    channelActions.processChannels.type,
    watchChannelsProcess
  );
  yield takeLatest<any>(
    channelActions.processChannelDetails.type,
    watchChannelsDetailsProcess
  );
}
