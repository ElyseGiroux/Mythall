import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("ordres").doc(params.id).get();
    return {
      id: snap.id,
      ...snap.data(),
    } as Ordre;
  }
});
