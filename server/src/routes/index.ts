import express, { Router } from "express";

import { usersRouter } from "./user.routes";
import { authRouter } from "./auth.routes";
import { channelsRouter } from "./channels.routes";

const router: Router = express.Router();

router.use("/users", usersRouter);
router.use("/api/auth/", authRouter);
router.use("/api/channels", channelsRouter);

export const applicationRouter: Router = router;
