import express, { Router } from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import { ChannelsController } from "../controllers/channels/channels.controller";
import { verifyToken } from "../middleware/authentication";

const router = express.Router();
const channelController = ChannelsController.getInstance();

const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

router.get("/followed", verifyToken, channelController.getFollowedChannels);

router.post(
  "/follow",
  verifyToken,
  validator.body(channelDetailsSchema),
  channelController.postFollowChannel
);

router.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  channelController.getChannelDetails
);

router.get("/", channelController.getChannels);

export const channelsRouter: Router = router;
