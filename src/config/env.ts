import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  FIREBASE_PROJECT_ID: z.string().min(1, "FIREBASE_PROJECT_ID required"),
  FIREBASE_CLIENT_EMAIL: z.string().min(1, "FIREBASE_CLIENT_EMAIL required"),
  FIREBASE_PRIVATE_KEY: z.string().min(1, "FIREBASE_PRIVATE_KEY required"),
  ADMIN_PASSWORD_HASH: z.string().min(1, "ADMIN_PASSWORD_HASH required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Environment variable validation failed:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
