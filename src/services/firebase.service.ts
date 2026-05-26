import { db } from "../config/firebase.js";
import firebaseAdmin from "firebase-admin";

const FieldValue = firebaseAdmin.firestore.FieldValue;

interface FindOptions {
  where?: [string, firebaseAdmin.firestore.WhereFilterOp, unknown][];
  orderBy?: [string, firebaseAdmin.firestore.OrderByDirection];
  limit?: number;
}

function getRef(collection: string) {
  return db.collection(collection);
}

export async function getCollection<T>(collection: string, options?: FindOptions) {
  let query: firebaseAdmin.firestore.Query = getRef(collection);

  if (options?.where) {
    for (const [field, op, value] of options.where) {
      query = query.where(field, op, value);
    }
  }

  if (options?.orderBy) {
    query = query.orderBy(...options.orderBy);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const snapshot = await query.get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as T)
  );
}

export async function getDocument<T>(collection: string, id: string) {
  const doc = await getRef(collection).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as T;
}

export async function addDocument<T extends Record<string, unknown>>(
  collection: string,
  data: T
) {
  const docRef = await getRef(collection).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

export async function setDocument<T extends Record<string, unknown>>(
  collection: string,
  id: string,
  data: T,
  merge = true
) {
  await getRef(collection)
    .doc(id)
    .set(
      { ...data, updatedAt: FieldValue.serverTimestamp() },
      { merge }
    );
}

export async function updateDocument<T extends Record<string, unknown>>(
  collection: string,
  id: string,
  data: T
) {
  await getRef(collection)
    .doc(id)
    .update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    } as firebaseAdmin.firestore.UpdateData<T>);
}

export async function deleteDocument(collection: string, id: string) {
  await getRef(collection).doc(id).delete();
}

export async function runTransaction<T>(
  fn: (transaction: firebaseAdmin.firestore.Transaction) => Promise<T>
): Promise<T> {
  return db.runTransaction(fn);
}

export { FieldValue };
