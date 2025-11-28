import { Request, Response, NextFunction } from "express";
import { HttpException } from "../errors/HttpException";
import { tokenService } from "../services/TokenService";

const extractBearerFromHeader = (req: Request): string | undefined => {
  const auth = req.headers.authorization;
  if (!auth) return undefined;

  const [type, token] = auth.split(" ");
  if (type !== "Bearer") return undefined;
  return token;
};
export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractBearerFromHeader(req);
    if (!token) {
      throw new HttpException(401, "Unauthorized error");
    }
    const payload = tokenService.verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
