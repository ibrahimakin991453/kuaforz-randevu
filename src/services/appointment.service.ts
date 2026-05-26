import { db } from "../config/firebase.js";
import { Appointment, AppointmentStatus } from "../types/index.js";
import { createAppointmentSchema, updateAppointmentStatusSchema } from "../schemas/appointment.schema.js";
import { ValidationError, NotFoundError, ConflictError } from "../utils/errors.js";
import { getStaffById } from "./staff.service.js";
import { getServiceById } from "./services.service.js";
import { calculateEndTime, getAvailableSlots } from "./availability.service.js";
import {
  findAppointmentById,
  findAppointmentsByPhone,
  createAppointmentDocument,
  updateAppointmentDocument,
  findAppointmentsByStaffAndDate,
} from "../repositories/appointments.repository.js";
import { getCollection } from "./firebase.service.js";

const ALLOWED_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

export async function createAppointment(data: Record<string, unknown>): Promise<{ id: string; appointment: Appointment }> {
  const parsed = createAppointmentSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
  }

  const input = parsed.data;

  const [staff, service] = await Promise.all([
    getStaffById(input.staffId),
    getServiceById(input.serviceId),
  ]);

  if (!staff.active) {
    throw new ValidationError("Seçilen personel şu anda aktif değil");
  }
  if (!service.active) {
    throw new ValidationError("Seçilen hizmet şu anda aktif değil");
  }

  const today = new Date().toISOString().split("T")[0];
  if (input.date < today) {
    throw new ValidationError("Geçmiş bir tarih için randevu oluşturulamaz");
  }

  const now = new Date();
  const slotDateTime = new Date(`${input.date}T${input.startTime}:00`);
  if (input.date === today && slotDateTime <= now) {
    throw new ValidationError("Geçmiş bir saat için randevu oluşturulamaz");
  }

  const endTime = calculateEndTime(input.startTime, service.durationMinutes);

  const result = await db.runTransaction(async (transaction) => {
    const lockRef = db.collection("zamanKilitleri").doc(
      `${input.staffId}_${input.date}_${input.startTime}`
    );
    const lockDoc = await transaction.get(lockRef);

    if (lockDoc.exists && lockDoc.data()?.locked) {
      throw new ConflictError("Bu saat dilimi için başka bir randevu oluşturuluyor");
    }

    const existingAppointments = await transaction.get(
      db
        .collection("randevular")
        .where("staffId", "==", input.staffId)
        .where("date", "==", input.date)
        .where("startTime", "==", input.startTime)
        .where("status", "in", ["pending", "confirmed"])
    );

    if (!existingAppointments.empty) {
      throw new ConflictError("Bu saat dilimi dolu");
    }

    transaction.set(lockRef, {
      staffId: input.staffId,
      date: input.date,
      startTime: input.startTime,
      endTime,
      locked: true,
      expiresAt: new Date(Date.now() + 30000).toISOString(),
    });

    const appointmentRef = db.collection("randevular").doc();

    const appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt"> & { id: string } = {
      id: appointmentRef.id,
      staffId: staff.id,
      staffName: staff.name,
      serviceId: service.id,
      serviceName: service.name,
      durationMinutes: service.durationMinutes,
      price: service.price,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      date: input.date,
      startTime: input.startTime,
      endTime,
      status: "pending",
      notes: input.notes,
    };

    transaction.set(appointmentRef, {
      ...appointment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    transaction.update(lockRef, { locked: false });

    return appointment;
  });

  return { id: result.id, appointment: result };
}

export async function confirmAppointment(id: string): Promise<void> {
  const appointment = await findAppointmentById(id);
  if (!appointment) throw new NotFoundError("Randevu");

  if (!ALLOWED_TRANSITIONS[appointment.status].includes("confirmed")) {
    throw new ValidationError(
      `"${appointment.status}" durumundaki randevu onaylanamaz`
    );
  }

  await updateAppointmentDocument(id, { status: "confirmed" });
}

export async function cancelAppointment(id: string, reason?: string): Promise<void> {
  const appointment = await findAppointmentById(id);
  if (!appointment) throw new NotFoundError("Randevu");

  if (!ALLOWED_TRANSITIONS[appointment.status].includes("cancelled")) {
    throw new ValidationError(
      `"${appointment.status}" durumundaki randevu iptal edilemez`
    );
  }

  await updateAppointmentDocument(id, {
    status: "cancelled",
    cancelReason: reason,
  });
}

export async function completeAppointment(id: string): Promise<void> {
  const appointment = await findAppointmentById(id);
  if (!appointment) throw new NotFoundError("Randevu");

  if (!ALLOWED_TRANSITIONS[appointment.status].includes("completed")) {
    throw new ValidationError(
      `"${appointment.status}" durumundaki randevu tamamlanamaz`
    );
  }

  await updateAppointmentDocument(id, { status: "completed" });
}

export async function getAppointments(filters: {
  status?: string;
  date?: string;
  staffId?: string;
}): Promise<Appointment[]> {
  const where: [string, FirebaseFirestore.WhereFilterOp, unknown][] = [];

  if (filters.status) {
    where.push(["status", "==", filters.status]);
  }
  if (filters.date) {
    where.push(["date", "==", filters.date]);
  }
  if (filters.staffId) {
    where.push(["staffId", "==", filters.staffId]);
  }

  return getCollection<Appointment>("randevular", {
    where: where.length ? where : undefined,
  });
}

export async function getAppointmentById(id: string): Promise<Appointment> {
  const appt = await findAppointmentById(id);
  if (!appt) throw new NotFoundError("Randevu");
  return appt;
}

export async function getAppointmentsByPhone(phone: string): Promise<Appointment[]> {
  return findAppointmentsByPhone(phone);
}
