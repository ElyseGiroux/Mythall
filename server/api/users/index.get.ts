import { firestore } from "../../utils/firebase";

export default defineEventHandler(async () => {
  const snap = await firestore.collection("users").get();
  return snap.docs.map((snap) => {
    return {
      createdAt: snap.data()?.createdAt,
      updatedAt: snap.data()?.updatedAt,
      uid: snap.data()?.uid,
      email: snap.data()?.email,
      displayname: snap.data()?.displayname,
      photoURL: snap.data()?.photoURL,
      roles: snap.data()?.roles,
    } as UserDB;
  });
});
