import { firestore } from "../firebase";

export const _getSort = async (id: string) => {
  const snap = await firestore.collection("sorts").doc(id).get();
  const ecoleSnap = await firestore.collection("ecoles").doc(snap.data()?.ecoleRef).get();
  return { id: snap.id, ...snap.data(), ecole: ecoleSnap.data() } as Sort;
};
