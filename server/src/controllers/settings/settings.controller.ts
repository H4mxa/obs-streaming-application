import { Request, Response } from "express";
import { logger } from "../../server";
import User from "../../models/user/user.model";
import userModel from "../../models/user/user.model";
import channelModel from "../../models/channel/channel.model";
import { ComparePassword, hashPassword } from "../../utils/methods";

export interface IChannelSettingsRequest extends Request {
  user?: any;
}

export class Settings {
  private static instance: Settings;

  private constructor() {}

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  public async getChannelSettings(
    request: IChannelSettingsRequest,
    response: Response
  ) {
    try {
      const { userId } = request.user;

      const userData: any = await User.findById(userId, {
        channels: 1,
        username: 1,
      }).populate("channel");

      return response.status(200).json({
        message: "success",
        data: {
          id: userData?._id,
          username: userData?.username,
          title: userData?.channel?.title,
          description: userData?.channel?.description,
          avatarUrl: userData?.channel?.avatarUrl,
          streamKey: userData?.channel?.streamKey,
        },
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).send("Something went wrong");
    }
  }

  public async putChannelSettings(
    request: IChannelSettingsRequest,
    response: Response
  ) {
    try {
      const { userId } = request.user;

      const { title, description, avatarUrl, username } = request.body;

      const userData = await userModel.findById(userId, {
        username: 1,
        channel: 1,
      });

      if (userData?.username !== username) {
        await userModel.updateOne(
          {
            _id: userId,
          },
          {
            username,
          }
        );
      }

      const channelData = await channelModel.findByIdAndUpdate(
        userData?.channel,
        {
          title,
          description,
          avatarUrl,
          isActive: true,
        },
        {
          new: true,
        }
      );

      return response.status(201).json({
        message: "success",
        data: {
          username,
          title: channelData?.title,
          description: channelData?.description,
          avatarUrl: channelData?.avatarUrl,
          channelId: channelData?._id,
        },
      });
    } catch (error) {
      logger.error(error);
      return response.status(500).send("Something went wrong");
    }
  }

  public async patchChangeSettings(
    request: IChannelSettingsRequest,
    response: Response
  ) {
    try {
      const { userId } = request.user;

      const { password, newPassword } = request.body;

      const userData = await userModel.findById(userId, {
        password: 1,
      });

      const isPasswordCorrect = ComparePassword({
        password,
        encryptedPassword: userData?.password ?? "",
      });

      if (!isPasswordCorrect) {
        return response.status(400).send("Invalid password. Please try again");
      }

      const ecryptedPassword = hashPassword(newPassword);

      await userModel.updateOne(
        {
          _id: userId,
        },
        {
          password: ecryptedPassword,
        }
      );

      return response.status(200).json({
        success: true,
        message: "Password changed succesfully",
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).send("Something went wrong");
    }
  }
}
