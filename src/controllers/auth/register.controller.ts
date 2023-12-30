import { Request, Response } from "express";
import userModel from "../../models/user/user.model";

export class RegisterController {
  public async registerUser(request: Request, response: Response) {
    const user = await userModel.create({
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
    });

    console.log(user);

    return response.send("User has been added to database");
  }
}
