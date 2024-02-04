import { request } from "libs/request";
import { API_URLS } from "./apiConstants";
import toast from "react-hot-toast";
import { STORAGE_KEY } from "modules/common/constants";

export const channelService = {
  getChannelSettings: () => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.channelSettings}`;

    const headerOpt = {
      method: "GET",
      contentType: "application/json",
      token: localStorage.getItem(STORAGE_KEY.TOKEN),
    };
    return request(url, null, headerOpt as any);
  },
  updateChannelSettings: (body: any) => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.channelSettings}`;

    const headerOpt = {
      method: "PUT",
      contentType: "application/json",
      token: localStorage.getItem(STORAGE_KEY.TOKEN),
    };
    return request(url, body, headerOpt as any);
  },

  getFollowedChannel: () => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.followedChannel}`;

    const headerOpt = {
      method: "GET",
      contentType: "application/json",
      token: localStorage.getItem(STORAGE_KEY.TOKEN),
    };
    return request(url, null, headerOpt as any);
  },

  getChannels: () => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.channels}`;

    const headerOpt = {
      method: "GET",
      contentType: "application/json",
    };
    return request(url, null, headerOpt as any);
  },

  getChannelDetailsById: (id: string) => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.channels}/${id}`;

    const headerOpt = {
      method: "GET",
      contentType: "application/json",
    };

    return request(url, null, headerOpt as any);
  },
};
