import express, { Router } from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import { ChannelsController } from "../controllers/channels/channels.controller";

const router = express.Router();
const channelController = ChannelsController.getInstance();

const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

router.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  channelController.getChannelDetails
);

export const channelsRouter: Router = router;
