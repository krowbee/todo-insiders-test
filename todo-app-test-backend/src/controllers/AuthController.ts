import { tokenService } from "../services/TokenService";
import { userService } from "../services/UserService";
import { NextFunction, Request, Response } from "express";

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const user = await userService.registerUser(data.email, data.password);
      const token = tokenService.generateAccessToken(user.email, user.id);
      return res.status(201).json({
        message: "Created succesfully",
        accessToken: token,
        user: { id: user.id, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const user = await userService.loginUser(data.email, data.password);
      const token = tokenService.generateAccessToken(user.email, user.id);
      return res.status(200).json({
        message: "Login succesful",
        accessToken: token,
        user: { id: user.id, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  };
}

export const authController = new AuthController();
