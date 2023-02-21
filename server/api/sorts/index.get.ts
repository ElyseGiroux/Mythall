import { db } from "~/server/firebase";

export default defineEventHandler(async (event) => {
  const snap = await db.collection("sorts").get();
  return snap.docs.map((snap) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as Sort;
  });
});
