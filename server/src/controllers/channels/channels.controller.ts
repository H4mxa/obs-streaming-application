import { Request, Response } from "express";
import Channel from "../../models/channel/channel.model";
import User from "../../models/user/user.model";
import { logger } from "../../server";
import channelModel from "../../models/channel/channel.model";
import userModel from "../../models/user/user.model";
import axios from "axios";
interface IPostFollowChannelRequest extends Request {
  user?: any;
}

export class ChannelsController {
  private static instance: ChannelsController;
  private constructor() {}

  public static getInstance(): ChannelsController {
    if (!ChannelsController.instance) {
      ChannelsController.instance = new ChannelsController();
    }
    return ChannelsController.instance;
  }

  public async getChannelDetails(request: Request, response: Response) {
    try {
      const { channelId } = request.params;

      let channel;
      if (channelId && channelId.match(/^[0-9a-fA-F]{24}$/)) {
        channel = await Channel.findById(channelId);
      } else {
        return response.status(400).json({
          success: false,
          message: "Channel not found. Please check your channel url",
        });
      }

      if (!channel || !channel.isActive) {
        return response.status(404).send("Channel not found");
      }

      const user = await User.findOne(
        { channel: channelId },
        {
          username: 1,
        }
      );

      const streamUrl = `http://localhost:8001/live/${channel.streamKey}.flv`;

      let requestData;
      try {
        requestData = await axios.get("http://localhost:8001/api/streams");
      } catch (_e) {
        requestData = null;
      }

      const activeStreams = requestData?.data;

      let liveStreams: any = [];

      for (const streamId in activeStreams?.live) {
        if (
          activeStreams.live[streamId].publisher &&
          activeStreams.live[streamId].publisher !== null
        ) {
          liveStreams.push(streamId);
        }
      }

      const isOnline = liveStreams.includes(channel.streamKey);

      return response.status(200).json({
        id: channel._id,
        title: channel.title,
        description: channel.description,
        username: user?.username,
        isOnline,
        streamUrl,
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).json({
        success: false,
        message: "Channel not found. Please check your channel url",
      });
    }
  }

  public async getChannels(_request: Request, response: Response) {
    try {
      const user: any = await User.find(
        {},
        {
          channel: 1,
          username: 1,
        }
      ).populate("channel");

      let requestData;

      try {
        requestData = await axios.get("http://localhost:8001/api/streams");
      } catch (e) {
        requestData = null;
      }

      const activeStreams = requestData?.data;

      let liveStreams: any = [];

      if (activeStreams) {
        for (const streamId in activeStreams?.live) {
          if (
            activeStreams.live[streamId].publisher &&
            activeStreams.live[streamId].publisher !== null
          ) {
            liveStreams.push(streamId);
          }
        }
      }

      const channels = user
        .filter((u: any) => u.channel.isActive)
        .map((_user: any) => {
          return {
            id: _user.channel._id,
            title: _user.channel.title,
            avatarUrl: _user.channel.avatarUrl,
            isOnline: liveStreams.includes(_user.channel.streamKey),
            username: _user.username,
          };
        });

      return response.json({
        channels,
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).send("Something went wrong");
    }
  }

  public async postFollowChannel(
    request: IPostFollowChannelRequest,
    response: Response
  ) {
    try {
      const { userId } = request.user;

      const { channelId } = request.body;

      const userData = await User.findById(userId, {
        followedChannels: 1,
      });

      const isChannelExist = await channelModel.findById(channelId);

      if (!isChannelExist) {
        return response.status(404).json({
          success: false,
          message: "Channel doesn't exist",
        });
      }

      if (userData?.followedChannels.includes(channelId)) {
        return response.status(400).json({
          success: false,
          message: "You are already following this channel",
        });
      }

      userData?.followedChannels.push(channelId);

      await userData?.save();

      return response.status(200).json({
        success: true,
        message: "Channel followed successfully",
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  public async getFollowedChannels(
    request: IPostFollowChannelRequest,
    response: Response
  ) {
    try {
      const { userId } = request.user;

      const userData = await userModel.findById(userId, {
        followedChannels: 1,
      });

      console.log("===? userData ===??", userData);

      return response.status(200).json({
        success: true,
        followedChannels: userData?.followedChannels,
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).json({
        success: false,
        message: "Error occurred when fetching followed channels",
      });
    }
  }
}
