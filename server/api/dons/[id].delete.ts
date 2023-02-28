import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    await firestore.collection("dons").doc(params.id).delete();
    return true;
  }
});
