import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(2, "Hizmet adı en az 2 karakter olmalıdır")
    .max(100, "Hizmet adı çok uzun"),
  durationMinutes: z
    .number()
    .int()
    .min(15, "Süre en az 15 dakika olmalıdır")
    .max(180, "Süre en fazla 180 dakika olabilir"),
  price: z
    .number()
    .positive("Fiyat pozitif olmalıdır")
    .max(10000, "Fiyat çok yüksek"),
  category: z.enum(["Kesim", "Boyama", "Bakım", "Diğer"]),
  active: z.boolean().default(true),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = createServiceSchema.partial();

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
