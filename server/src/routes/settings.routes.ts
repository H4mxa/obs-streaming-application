import express, { Router } from "express";
import ExpressValidation from "express-joi-validation";
import { verifyToken } from "../middleware/authentication";
import { Settings } from "../controllers/settings/settings.controller";
import Joi from "joi";

const router = express.Router();

const settings = Settings.getInstance();

const validator = ExpressValidation.createValidator({});

const channelSettingsSchema = Joi.object({
  username: Joi.string().min(3).max(12),
  description: Joi.string().min(3).max(255),
  title: Joi.string().min(3).max(30),
  avatarUrl: Joi.string().uri(),
});

const changePasswordSchema = Joi.object({
  password: Joi.string().min(3).max(255),
  newPassword: Joi.string().min(3).max(255),
});

router.get("/channel", verifyToken, settings.getChannelSettings);

router.put(
  "/channel",
  verifyToken,
  validator.body(channelSettingsSchema),
  settings.putChannelSettings
);

router.patch(
  "/password",
  verifyToken,
  validator.body(changePasswordSchema),
  settings.patchChangeSettings
);

export const settingsRouter: Router = router;
