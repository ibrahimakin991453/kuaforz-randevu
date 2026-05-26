import { z } from "zod";

export const createStaffSchema = z.object({
  name: z
    .string()
    .min(2, "Personel adı en az 2 karakter olmalıdır")
    .max(50, "Personel adı çok uzun"),
  role: z
    .string()
    .min(1, "Rol gerekli")
    .max(50, "Rol çok uzun"),
  active: z.boolean().default(true),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;

export const updateStaffSchema = createStaffSchema.partial();

export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
