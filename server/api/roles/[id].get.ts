import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("roles").doc(params.id).get();
    return {
      ...snap.data(),
    } as Roles;
  }
});
