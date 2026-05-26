import { getCollection, getDocument, addDocument, updateDocument, runTransaction, FieldValue } from "../services/firebase.service.js";
import { Appointment } from "../types/index.js";
import { db } from "../config/firebase.js";

const COLLECTION = "randevular";

export async function findAllAppointmentsByDate(date: string): Promise<Appointment[]> {
  return getCollection<Appointment>(COLLECTION, {
    where: [["date", "==", date]],
  });
}

export async function findAppointmentsByStaffAndDate(staffId: string, date: string): Promise<Appointment[]> {
  return getCollection<Appointment>(COLLECTION, {
    where: [
      ["staffId", "==", staffId],
      ["date", "==", date],
    ],
  });
}

export async function findAppointmentsByStaffAndDateRange(
  staffId: string,
  startDate: string,
  endDate: string
): Promise<Appointment[]> {
  return getCollection<Appointment>(COLLECTION, {
    where: [
      ["staffId", "==", staffId],
      ["date", ">=", startDate],
      ["date", "<=", endDate],
    ],
  });
}

export async function findAppointmentsByPhone(phone: string): Promise<Appointment[]> {
  return getCollection<Appointment>(COLLECTION, {
    where: [["customerPhone", "==", phone]],
  });
}

export async function findAppointmentById(id: string): Promise<Appointment | null> {
  return getDocument<Appointment>(COLLECTION, id);
}

export async function findAppointmentsByStatus(
  status: string,
  date?: string
): Promise<Appointment[]> {
  const where: [string, FirebaseFirestore.WhereFilterOp, unknown][] = [["status", "==", status]];
  if (date) {
    where.push(["date", "==", date]);
  }
  return getCollection<Appointment>(COLLECTION, { where });
}

export async function createAppointmentDocument(
  data: Omit<Appointment, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  return addDocument(COLLECTION, data);
}

export async function updateAppointmentDocument(
  id: string,
  data: Partial<Appointment>
): Promise<void> {
  await updateDocument(COLLECTION, id, data);
}

export async function runAppointmentTransaction<T>(
  fn: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> {
  return runTransaction(fn);
}
