import { findAppointmentsByStaffAndDate } from "../repositories/appointments.repository.js";
import { getStaffById } from "./staff.service.js";
import { TimeSlot } from "../types/index.js";

const SLOT_DURATION = 30;

interface WorkingHours {
  open: string;
  close: string;
  isWorkingDay: boolean;
}

const DEFAULT_WORKING_HOURS: WorkingHours = { open: "09:00", close: "18:00", isWorkingDay: true };
const SUNDAY_HOURS: WorkingHours = { open: "09:00", close: "18:00", isWorkingDay: false };

function getWorkingHours(dayOfWeek: string): WorkingHours {
  return dayOfWeek === "sun" ? SUNDAY_HOURS : DEFAULT_WORKING_HOURS;
}

export function generateDaySlots(workingHours: WorkingHours): TimeSlot[] {
  if (!workingHours.isWorkingDay) return [];

  const slots: TimeSlot[] = [];
  const [openH, openM] = workingHours.open.split(":").map(Number);
  const [closeH, closeM] = workingHours.close.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  for (let minutes = openMinutes; minutes + SLOT_DURATION <= closeMinutes; minutes += SLOT_DURATION) {
    const startH = Math.floor(minutes / 60);
    const startM = minutes % 60;
    const endH = Math.floor((minutes + SLOT_DURATION) / 60);
    const endM = (minutes + SLOT_DURATION) % 60;

    slots.push({
      startTime: `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}`,
      endTime: `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`,
      isAvailable: true,
    });
  }

  return slots;
}

function getDayOfWeek(dateStr: string): string {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const date = new Date(dateStr + "T12:00:00");
  return dayNames[date.getDay()];
}

function isDateInPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr + "T12:00:00");
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
}

function isTimeInPast(dateStr: string, timeStr: string): boolean {
  const now = new Date();
  const slotTime = new Date(`${dateStr}T${timeStr}:00`);
  return slotTime <= now;
}

export async function getAvailableSlots(staffId: string, date: string): Promise<TimeSlot[]> {
  const staff = await getStaffById(staffId);
  const dayOfWeek = getDayOfWeek(date);
  const workingHours = getWorkingHours(dayOfWeek);

  if (!workingHours.isWorkingDay) {
    return [];
  }

  let slots = generateDaySlots(workingHours);

  if (isDateInPast(date)) {
    return slots.map((s) => ({ ...s, isAvailable: false }));
  }

  const appointments = await findAppointmentsByStaffAndDate(staffId, date);
  const bookedStartTimes = new Set(
    appointments
      .filter((a) => a.status !== "cancelled")
      .map((a) => a.startTime)
  );

  const isToday = date === new Date().toISOString().split("T")[0];

  slots = slots.map((slot) => {
    if (bookedStartTimes.has(slot.startTime)) {
      return { ...slot, isAvailable: false };
    }
    if (isToday && isTimeInPast(date, slot.startTime)) {
      return { ...slot, isAvailable: false };
    }
    return slot;
  });

  return slots;
}

export async function getWeekSlots(
  staffId: string,
  startDate: string
): Promise<Record<string, TimeSlot[]>> {
  const result: Record<string, TimeSlot[]> = {};
  const start = new Date(startDate + "T12:00:00");

  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(current.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];
    result[dateStr] = await getAvailableSlots(staffId, dateStr);
  }

  return result;
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [h, m] = startTime.split(":").map(Number);
  const totalMinutes = h * 60 + m + durationMinutes;
  const endH = Math.floor(totalMinutes / 60);
  const endM = totalMinutes % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}
