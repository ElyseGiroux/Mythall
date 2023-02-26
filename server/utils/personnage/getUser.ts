import { firestore } from "../firebase";

export const _getUser = async (id: string) => {
  const snap = await firestore.collection("users").doc(id).get();
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
};
