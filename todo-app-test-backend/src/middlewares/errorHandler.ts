import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validation error" });
  }
  const error = err as any;

  const status = error.status || 500;
  const message = error.message || "Internal server error";

  res.status(status).json({ error: message });
};
