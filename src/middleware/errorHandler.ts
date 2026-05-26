import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import logger from "../utils/logger.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  logger.error("Unhandled error:", err.message, err.stack);

  res.status(500).json({
    error: {
      message: "Sunucu hatası",
      code: "INTERNAL_ERROR",
    },
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: "Bulunamadı",
      code: "NOT_FOUND",
    },
  });
}
