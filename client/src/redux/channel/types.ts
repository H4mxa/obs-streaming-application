export interface IChannelSlice {
  loading: boolean;
  followedChannelLoading: boolean;
  channels: IChannel[] | null;
  channelSettings: IChannelSettings | null;
  followedChannel: string[] | null;
  channelDetails: IChannelDetails | null;
}

export interface IChannelSettings {
  id: string;
  username: string;
  title: string;
  description: string;
  avatarUrl: string;
  streamKey: string;
}

export interface IChannel {
  id: string;
  title: string;
  avatarUrl: string;
  isOnline: boolean;
  username: string;
}

export type updateChannelSettingsPayloadTypes = {
  title: string;
  description: string;
  username: string;
  avatarUrl: string;
};

export interface IChannelDetails {
  id: string;
  title: string;
  description: string;
  username: string;
  isOnline: boolean;
  streamUrl: string;
}
