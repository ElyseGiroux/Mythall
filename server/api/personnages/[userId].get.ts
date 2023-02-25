import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.userId) {
    const snap = await firestore.collection("personnages").where("userRef", "==", `${params.userId}`).orderBy("createdAt").get();
    return snap.docs.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      };
    });
  }
});
