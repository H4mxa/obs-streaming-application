import express, { Router } from "express";
import { LoginController } from "../controllers/auth/login.controller";
import { RegisterController } from "../controllers/auth/register.controller";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";

const router: Router = express.Router();
const loginController: LoginController = LoginController.getInstance();
const registerController: RegisterController = RegisterController.getInstance();

const validator = ExpressValidation.createValidator();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
});

router.post("/login", validator.body(loginSchema), loginController.loginUser);
router.post(
  "/register",
  validator.body(registerSchema),
  registerController.registerUser
);

export const authRouter: Router = router;
