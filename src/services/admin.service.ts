import crypto from "crypto";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { getAdminSettings, saveAdminSettings } from "../repositories/adminSettings.repository.js";
import { ValidationError } from "../utils/errors.js";

function sha256Hash(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function verifyPassword(password: string): Promise<boolean> {
  const settings = await getAdminSettings();

  if (settings) {
    return bcrypt.compare(password, settings.passwordHash);
  }

  const envHash = sha256Hash(password);
  if (envHash === env.ADMIN_PASSWORD_HASH) {
    await saveAdminSettings({
      passwordHash: await bcrypt.hash(password, 12),
    });
    return true;
  }

  return false;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const isValid = await verifyPassword(currentPassword);
  if (!isValid) {
    throw new ValidationError("Mevcut şifre hatalı");
  }

  if (newPassword.length < 4) {
    throw new ValidationError("Yeni şifre en az 4 karakter olmalıdır");
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await saveAdminSettings({ passwordHash: newHash });
}
