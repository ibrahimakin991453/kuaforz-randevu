import { getCollection, getDocument, addDocument, updateDocument } from "../services/firebase.service.js";
import { Service } from "../types/index.js";

const COLLECTION = "services";

export async function findAllActiveServices(): Promise<Service[]> {
  return getCollection<Service>(COLLECTION, {
    where: [["active", "==", true]],
  });
}

export async function findAllServices(): Promise<Service[]> {
  return getCollection<Service>(COLLECTION);
}

export async function findServiceById(id: string): Promise<Service | null> {
  return getDocument<Service>(COLLECTION, id);
}

export async function createServiceDocument(data: Omit<Service, "id" | "createdAt" | "updatedAt">): Promise<string> {
  return addDocument(COLLECTION, data);
}

export async function updateServiceDocument(id: string, data: Partial<Service>): Promise<void> {
  await updateDocument(COLLECTION, id, data);
}

export async function deactivateServiceDocument(id: string): Promise<void> {
  await updateDocument(COLLECTION, id, { active: false } as Partial<Service>);
}
