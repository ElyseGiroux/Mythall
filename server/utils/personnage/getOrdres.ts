import { firestore } from "../firebase";

export const _getOrdres = async (personnage: Personnage): Promise<Ordre[] | undefined> => {
  if (personnage.ordresRef) {
    const snaps = await Promise.all(personnage.ordresRef.map((ordreRef) => firestore.collection("ordres").doc(ordreRef).get()));
    return snaps.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      } as Ordre;
    });
  }
};
