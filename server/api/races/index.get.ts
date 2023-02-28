import { firestore } from "../../utils/firebase";

export default defineEventHandler(async () => {
  const snap = await firestore.collection("races").get();
  return snap.docs.map((snap) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as Race;
  });
});
