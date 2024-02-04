import { Request, Response, NextFunction } from "express";
import { logger } from "../../server";
import { verify } from "jsonwebtoken";
import { getTokenKey } from "../../utils/env";

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token =
      request.body.token ||
      request.params.token ||
      (request.headers["authorization"] as string) ||
      (request.headers["x-access-token"] as string);

    if (!token) {
      return response.status(401).json({
        errorCode: 5001,
        message: "A token is required for authentication",
      });
    }

    try {
      token = token.replace(/^Bearer\s+/, "");
      const decoded = verify(token, getTokenKey());

      Object.assign(request, {
        user: decoded,
      });
    } catch (error) {
      logger.error(error);
      return response.status(401).json({
        message: "Invalid token",
        errorCode: 5002,
      });
    }
  } catch (error) {
    logger.error(error);
    return response.status(500).send("Something went wrong");
  }

  return next();
};
