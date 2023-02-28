import { firestore } from "../../utils/firebase";

export default defineEventHandler(async () => {
  const snap = await firestore.collection("dieux").get();
  return snap.docs.map((snap) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as Divinite;
  });
});
