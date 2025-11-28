import { NextFunction, Response, Request } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
