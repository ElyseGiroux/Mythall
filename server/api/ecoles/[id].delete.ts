import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    await firestore.collection("ecoles").doc(params.id).delete();
    return true;
  }
});
