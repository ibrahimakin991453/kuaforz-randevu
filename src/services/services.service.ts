import {
  findAllActiveServices,
  findAllServices,
  findServiceById,
  createServiceDocument,
  updateServiceDocument,
  deactivateServiceDocument,
} from "../repositories/services.repository.js";
import { createServiceSchema, updateServiceSchema } from "../schemas/service.schema.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { Service } from "../types/index.js";

export async function getAllServices(activeOnly: boolean = true): Promise<Service[]> {
  return activeOnly ? findAllActiveServices() : findAllServices();
}

export async function getServiceById(id: string): Promise<Service> {
  const service = await findServiceById(id);
  if (!service) throw new NotFoundError("Hizmet");
  return service;
}

export async function createService(data: Record<string, unknown>): Promise<{ id: string }> {
  const parsed = createServiceSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
  }
  const id = await createServiceDocument(parsed.data as Omit<Service, "id" | "createdAt" | "updatedAt">);
  return { id };
}

export async function updateService(id: string, data: Record<string, unknown>): Promise<void> {
  const parsed = updateServiceSchema.safeParse(data);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
  }
  await getServiceById(id);
  await updateServiceDocument(id, parsed.data as Partial<Service>);
}

export async function deactivateService(id: string): Promise<void> {
  await getServiceById(id);
  await deactivateServiceDocument(id);
}
