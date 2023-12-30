import { Request, Response } from "express";

export class LoginController {
  public loginUser(_: Request, response: Response) {
    return response.send("user is login");
  }
}
