import { Request, Response } from "express";
import Channel from "../../models/channel/channel.model";
import User from "../../models/user/user.model";
import { logger } from "../../server";

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
        return response.status(400).send("Invalid argument");
      }

      if (!channel || channel.isActive) {
        return response.status(404).send("Channel not found");
      }

      const user = await User.findOne(
        { channel: channelId },
        {
          username: 1,
        }
      );

      const streamUrl = "http";

      const isOnline = false;

      return response.status(200).json({
        id: channel._id,
        title: channel.title,
        description: channel.descriptions,
        username: user?.username,
        isOnline,
        streamUrl,
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).send("Something went wrong");
    }
  }
}
