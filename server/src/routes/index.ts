import express, { Router } from "express";

import { usersRouter } from "./user.routes";
import { authRouter } from "./auth.routes";

const router: Router = express.Router();

router.use("/users", usersRouter);
router.use("/api/auth/", authRouter);

export const applicationRouter: Router = router;
