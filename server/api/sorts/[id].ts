import { db } from "~/server/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await db.collection("sorts").doc(params.id).get();
    const ecoleSnap = await db.collection("ecoles").doc(snap.data()?.ecoleRef).get();
    return {
      id: snap.id,
      ...snap.data(),
      ecole: ecoleSnap.data() as Ecole,
    } as Sort;
  }
});
