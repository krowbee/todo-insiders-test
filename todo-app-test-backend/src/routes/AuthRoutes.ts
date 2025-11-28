import { authController } from "../controllers/AuthController";
import { isAuth } from "../middlewares/isAuth";
import { validate } from "../middlewares/validate";
import { LoginSchema, registerSchema } from "../validation/user.schema";

const express = require("express");

export const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(LoginSchema), authController.login);
