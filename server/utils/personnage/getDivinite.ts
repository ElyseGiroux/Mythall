import { firestore } from "../firebase";

export const _getDivinite = async (personnage: Personnage) => {
  if (personnage.dieuRef) {
    const snap = await firestore.collection("dieux").doc(personnage.dieuRef).get();
    return {
      id: snap.id,
      ...snap.data(),
    } as Divinite;
  }
};
