import { getDocument, setDocument } from "../services/firebase.service.js";

const COLLECTION = "adminAyarlari";
const DOC_ID = "auth";

interface AdminSettingsDoc {
  passwordHash: string;
  updatedAt?: string;
}

export async function getAdminSettings(): Promise<AdminSettingsDoc | null> {
  return getDocument<AdminSettingsDoc>(COLLECTION, DOC_ID);
}

export async function saveAdminSettings(data: AdminSettingsDoc): Promise<void> {
  await setDocument(COLLECTION, DOC_ID, data as unknown as Record<string, unknown>, true);
}
