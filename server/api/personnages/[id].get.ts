import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("personnages").doc(params.id).get();
    // const ecoleSnap = await firestore.collection("ecoles").doc(snap.data()?.ecoleRef).get();
    return {
      id: snap.id,
      ...snap.data(),
      // ecole: ecoleSnap.data(),
    } as Sort;
  }
});
