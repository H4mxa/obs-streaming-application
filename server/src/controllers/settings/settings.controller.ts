import { Request, Response } from "express";
import { logger } from "../../server";

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

      return response.status(200).json({
        message: "This route is secured",
        userId: userId,
      });
    } catch (err) {
      logger.error(err);
      return response.status(500).send("Something went wrong");
    }
  }
}
