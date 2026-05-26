import { z } from "zod";

const phoneRegex = /^(\+90|0)?[ -]?5\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createAppointmentSchema = z.object({
  staffId: z.string().min(1, "Personel seçilmesi zorunludur"),
  serviceId: z.string().min(1, "Hizmet seçilmesi zorunludur"),
  customerName: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim çok uzun"),
  customerPhone: z
    .string()
    .regex(phoneRegex, "Geçerli bir telefon numarası giriniz (+90 5XX XXX XX XX)"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih YYYY-MM-DD formatında olmalıdır"),
  startTime: z
    .string()
    .regex(timeRegex, "Saat HH:mm formatında olmalıdır"),
  notes: z.string().max(500, "Not 500 karakteri aşamaz").optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["confirmed", "cancelled", "completed"]),
  cancelReason: z.string().max(200).optional(),
});

export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
