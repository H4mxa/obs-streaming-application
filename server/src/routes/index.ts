import express, { Router } from "express";

import { usersRouter } from "./user.routes";
import { authRouter } from "./auth.routes";
import { channelsRouter } from "./channels.routes";
import { settingsRouter } from "./settings.routes";

const router: Router = express.Router();

router.use("/users", usersRouter);
router.use("/api/auth/", authRouter);
router.use("/api/channels", channelsRouter);
router.use("/api/settings", settingsRouter);

export const applicationRouter: Router = router;
