import { Request, Response } from "express";
import userModel from "../../models/user/user.model";
import { hashPassword } from "../../utils/methods";
import jwt from "jsonwebtoken";
import { getTokenKey } from "../../utils/env";

export class LoginController {
  private static instance: LoginController;
  private constructor() {}

  public static getInstance(): LoginController {
    if (!LoginController.instance) {
      LoginController.instance = new LoginController();
    }
    return LoginController.instance;
  }

  public async loginUser(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const user = await userModel.findOne({
        email,
      });

      const encryptPassword = hashPassword(password);

      if (user && encryptPassword === user.password) {
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

        return response.status(200).json({
          success: true,
          userDetails: {
            email,
            userName: user.username,
            token,
          },
        });
      }

      return response
        .status(400)
        .send("Invalid credentials. Please try again.");
    } catch (error) {
      return response
        .status(500)
        .send("Something went wrong. Please try again.");
    }
  }
}
