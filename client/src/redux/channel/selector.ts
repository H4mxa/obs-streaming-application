import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

const selectChannelSlice = (state: RootState) => state.channel;

export const selectChannelSettings = createSelector(
  [selectChannelSlice],
  (state) => state && state.channelSettings
);

export const selectChannelLoading = createSelector(
  [selectChannelSlice],
  (state) => state && state.loading
);

export const selectFollowedChannel = createSelector(
  [selectChannelSlice],
  (state) => state && state.followedChannel
);

export const selectChannels = createSelector(
  [selectChannelSlice],
  (state) => state && state.channels
);

export const selectChannelDetails = createSelector(
  [selectChannelSlice],
  (state) => state && state.channelDetails
);
