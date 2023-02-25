import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query && query.userId) {
    const snap = await firestore.collection("personnages").where("userRef", "==", `${query.userId}`).orderBy("createdAt").get();
    return snap.docs.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      };
    });
  } else {
    const snap = await firestore.collection("personnages").get();
    return snap.docs.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      };
    });
  }
});
