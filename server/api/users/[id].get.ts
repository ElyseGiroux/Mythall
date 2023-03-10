import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("users").doc(params.id).get();
    return {
      id: snap.id,
      createdAt: snap.data()?.createdAt,
      updatedAt: snap.data()?.updatedAt,
      uid: snap.data()?.uid,
      email: snap.data()?.email,
      displayname: snap.data()?.displayname,
      photoURL: snap.data()?.photoURL,
      roles: snap.data()?.roles,
    } as UserDB;
  }
});
