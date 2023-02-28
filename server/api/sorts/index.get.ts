import { firestore } from "../../utils/firebase";

export default defineEventHandler(async () => {
  const snap = await firestore.collection("sorts").get();
  return snap.docs.map((snap) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as Sort;
  });
});
