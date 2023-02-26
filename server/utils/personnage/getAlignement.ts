import { firestore } from "../firebase";

export const _getAlignement = async (personnage: Personnage) => {
  if (personnage.alignementRef) {
    const snap = await firestore.collection("alignements").doc(personnage.alignementRef).get();
    return {
      id: snap.id,
      ...snap.data(),
    } as Alignement;
  }
};
