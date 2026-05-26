import { getCollection, getDocument, addDocument, updateDocument } from "../services/firebase.service.js";
import { Staff } from "../types/index.js";

const COLLECTION = "staff";

export async function findAllActiveStaff(): Promise<Staff[]> {
  return getCollection<Staff>(COLLECTION, {
    where: [["active", "==", true]],
  });
}

export async function findAllStaff(): Promise<Staff[]> {
  return getCollection<Staff>(COLLECTION);
}

export async function findStaffById(id: string): Promise<Staff | null> {
  return getDocument<Staff>(COLLECTION, id);
}

export async function createStaffDocument(data: Omit<Staff, "id" | "createdAt" | "updatedAt">): Promise<string> {
  return addDocument(COLLECTION, data);
}

export async function updateStaffDocument(id: string, data: Partial<Staff>): Promise<void> {
  await updateDocument(COLLECTION, id, data);
}

export async function deactivateStaffDocument(id: string): Promise<void> {
  await updateDocument(COLLECTION, id, { active: false } as Partial<Staff>);
}
