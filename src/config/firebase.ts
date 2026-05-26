import admin from "firebase-admin";
import { env } from "./env.js";

let firebaseInitialized = false;

function ensureInitialized(): void {
  if (firebaseInitialized) return;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

  firebaseInitialized = true;
}

function getFirestore(): admin.firestore.Firestore {
  ensureInitialized();
  return admin.firestore();
}

export function isFirebaseReady(): boolean {
  try {
    ensureInitialized();
    return true;
  } catch {
    return false;
  }
}

export const db = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    return Reflect.get(getFirestore(), prop);
  },
});

export { admin };
