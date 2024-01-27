import express, { Router } from "express";
import { verifyToken } from "../middleware/authentication";
import { Settings } from "../controllers/settings/settings.controller";

const router = express.Router();

const settings = Settings.getInstance();

router.get("/channel", verifyToken, settings.getChannelSettings);

export const settingsRouter: Router = router;
