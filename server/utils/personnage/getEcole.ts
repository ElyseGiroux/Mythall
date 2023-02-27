import { firestore } from "../firebase";

export const _getEcole = async (personnage: Personnage) => {
  if (personnage.ecoleRef) {
    const snap = await firestore.collection("ecoles").doc(personnage.ecoleRef).get();
    return {
      id: snap.id,
      ...snap.data(),
    } as Ecole;
  }
};
