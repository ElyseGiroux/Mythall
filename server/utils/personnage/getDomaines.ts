import { firestore } from "../firebase";

export const _getDomaines = async (personnage: Personnage): Promise<DomaineItem[] | undefined> => {
  if (personnage.domainesRef) {
    const snaps = await Promise.all(personnage.domainesRef.map((ref) => firestore.collection("domaines").doc(ref).get()));
    return snaps.map((snap) => {
      return {
        id: snap.id,
        ...snap.data(),
      } as Domaine;
    });
  }
};
