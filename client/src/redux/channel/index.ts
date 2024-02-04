import { IChannelSlice, updateChannelSettingsPayloadTypes } from "./types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import channelSaga from "./sagas";

const initialState: IChannelSlice = {
  loading: false,
  followedChannelLoading: false,
  channels: null,
  channelSettings: null,
  followedChannel: null,
  channelDetails: null,
};

// slice
export const slice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    processChannels: (state) => {
      state.loading = true;
    },
    processChannelsSuccess: (state, action) => {
      state.loading = false;
      state.channels = action.payload;
    },
    processChannelsFailed: (state) => {
      state.loading = false;
    },

    processChannelDetails: (state, _action) => {
      state.loading = true;
    },
    processChannelDetailsSuccess: (state, action) => {
      state.channelDetails = action.payload;
      state.loading = false;
    },
    processChannelDetailsFailed: (state) => {
      state.loading = false;
    },

    processChannelSettings: (state) => {
      state.loading = true;
    },
    processChannelSettingsSuccess: (state, action) => {
      state.channelSettings = action.payload;
      state.loading = false;
    },
    processChannelSettingsFailed: (state) => {
      state.loading = false;
    },

    processFollowedChannel: (state) => {
      state.followedChannelLoading = true;
    },

    processFollowedChannelSuccess: (state, action) => {
      state.followedChannel = action.payload;
      state.followedChannelLoading = false;
    },

    processFollowedChannelFailed: (state) => {
      state.followedChannelLoading = false;
    },

    processUpdateChannelSettings: (
      state,
      {
        payload,
      }: {
        payload: updateChannelSettingsPayloadTypes;
      }
    ) => {
      state.loading = true;
    },
    processUpdateChannelSettingsSuccess: (state, action) => {
      state.channelSettings = action.payload;
      state.loading = false;
    },
    processUpdateChannelSettingsFailed: (state) => {
      state.loading = false;
    },
  },
});

export const { actions: channelActions, reducer: channelReducer } = slice;

export const useChannelSlice = () => {
  const reducerLoaded = useInjectReducer({
    key: slice.name,
    reducer: channelReducer,
  });
  const sagaLoaded = useInjectSaga({ key: slice.name, saga: channelSaga });
  const channelsSliceLoaded = reducerLoaded && sagaLoaded;
  return { actions: slice.actions, channelsSliceLoaded };
};
