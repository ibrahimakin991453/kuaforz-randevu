import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError } from "../utils/errors.js";

export interface AdminTokenPayload {
  role: "admin";
}

export function generateAdminToken(): string {
  return jwt.sign({ role: "admin" } as AdminTokenPayload, env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
}

export function adminAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Yetkilendirme token'ı gerekli");
  }

  const token = authHeader.split(" ")[1];

  try {
    verifyAdminToken(token);
    next();
  } catch {
    throw new UnauthorizedError("Geçersiz veya süresi dolmuş token");
  }
}
