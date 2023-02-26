import { firestore } from "../firebase";

export const _getFourberies = async (personnage: Personnage) => {
  if (personnage.fourberies) {
    const snaps = await Promise.all(personnage.fourberies.map((fourberieItem) => firestore.collection("fourberies").doc(fourberieItem.fourberieRef).get()));
    return snaps.map((snap) => {
      return {
        fourberieRef: snap.id,
        fourberie: snap.data(),
        niveauEffectif: personnage.fourberies?.find((f) => f.fourberieRef == snap.id)?.niveauEffectif,
        niveauObtention: personnage.fourberies?.find((f) => f.fourberieRef == snap.id)?.niveauObtention,
      } as FourberieItem;
    });
  }
};
