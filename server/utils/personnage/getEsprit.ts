import { firestore } from "../firebase";

export const _getEsprit = async (personnage: Personnage) => {
  if (personnage.espritRef) {
    const snap = await firestore.collection("esprits").doc(personnage.espritRef).get();
    return {
      id: snap.id,
      ...snap.data(),
    } as Esprit;
  }
};
