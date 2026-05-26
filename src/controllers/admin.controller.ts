import { Request, Response } from "express";
import { verifyPassword, changePassword } from "../services/admin.service.js";
import { generateAdminToken, verifyAdminToken } from "../middleware/adminAuth.js";
import { UnauthorizedError, ValidationError } from "../utils/errors.js";

export async function adminLogin(req: Request, res: Response): Promise<void> {
  const { password } = req.body;

  if (!password || typeof password !== "string") {
    res.status(400).json({ success: false, message: "Şifre gerekli" });
    return;
  }

  const valid = await verifyPassword(password);

  if (!valid) {
    res.status(401).json({ success: false, message: "Hatalı şifre" });
    return;
  }

  const token = generateAdminToken();
  res.json({ success: true, token });
}

export function adminVerify(req: Request, res: Response): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token gerekli");
  }

  const token = authHeader.split(" ")[1];
  verifyAdminToken(token);
  res.json({ valid: true });
}

export async function adminChangePassword(req: Request, res: Response): Promise<void> {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({
      success: false,
      message: "Mevcut şifre ve yeni şifre gerekli",
    });
    return;
  }

  await changePassword(currentPassword, newPassword);
  res.json({ success: true, message: "Şifre başarıyla değiştirildi" });
}
