import { z } from "zod";

const phoneRegex = /^(\+90|0)?[ -]?5\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;

export const bookingFormSchema = z.object({
  serviceId: z.string().min(1, "Hizmet seçiniz"),
  staffId: z.string().min(1, "Personel seçiniz"),
  date: z.string().min(1, "Tarih seçiniz"),
  startTime: z.string().min(1, "Saat seçiniz"),
  customerName: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim çok uzun"),
  customerPhone: z
    .string()
    .regex(phoneRegex, "Geçerli bir telefon numarası giriniz"),
  notes: z.string().max(500).optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
