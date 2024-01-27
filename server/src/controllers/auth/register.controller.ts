import { Request, Response } from "express";
import userModel from "../../models/user/user.model";
import jwt from "jsonwebtoken";
import { getTokenKey } from "../../utils/env";
import { hashPassword } from "../../utils/methods";
import channel from "../../models/channel/channel.model";

export class RegisterController {
  private static instance: RegisterController;

  private constructor() {}

  public static getInstance(): RegisterController {
    if (!RegisterController.instance) {
      return (RegisterController.instance = new RegisterController());
    }
    return RegisterController.instance;
  }

  public async registerUser(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body;

      const userExists = await userModel.exists({ email });

      if (userExists) {
        return response.status(409).send("E-mail is already in use");
      }

      const encryptPassword = hashPassword(password);

      const newChannel = await channel.create({});

      const user = await userModel.create({
        username,
        email: email.toLowerCase(),
        password: encryptPassword,
        channel: newChannel._id,
      });

      const token = jwt.sign(
        {
          userId: user._id,
          email,
        },
        getTokenKey(),
        {
          expiresIn: "8h",
        }
      );

      return response.status(201).json({
        userDetails: {
          email,
          username,
          token,
        },
      });
    } catch (error) {
      return response
        .status(500)
        .send(`Error occurred. Please try again ${error}`);
    }
  }
}
