import {
  findAllActiveStaff,
  findAllStaff,
  findStaffById,
  createStaffDocument,
  updateStaffDocument,
  deactivateStaffDocument,
} from "../repositories/staff.repository.js";
import { createStaffSchema, updateStaffSchema } from "../schemas/staff.schema.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { Staff } from "../types/index.js";

export async function getAllStaff(activeOnly: boolean = true): Promise<Staff[]> {
  return activeOnly ? findAllActiveStaff() : findAllStaff();
}

export async function getStaffById(id: string): Promise<Staff> {
  const staff = await findStaffById(id);
  if (!staff) throw new NotFoundError("Personel");
  return staff;
}

export async function createStaff(data: Record<string, unknown>): Promise<{ id: string }> {
  const parsed = createStaffSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
  }
  const id = await createStaffDocument(parsed.data as Omit<Staff, "id" | "createdAt" | "updatedAt">);
  return { id };
}

export async function updateStaff(id: string, data: Record<string, unknown>): Promise<void> {
  const parsed = updateStaffSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
  }
  await getStaffById(id);
  await updateStaffDocument(id, parsed.data as Partial<Staff>);
}

export async function deactivateStaff(id: string): Promise<void> {
  await getStaffById(id);
  await deactivateStaffDocument(id);
}
