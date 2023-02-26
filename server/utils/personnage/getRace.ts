import { firestore } from "../firebase";
import { _getSort } from "./getSort";

export const _getRace = async (personnage: Personnage) => {
  if (personnage.raceRef) {
    const snap = await firestore.collection("races").doc(personnage.raceRef).get();

    const race = {
      id: snap.id,
      ...snap.data(),
    } as Race;

    if (race.sortsRacialRef) {
      race.sortsRacial = await Promise.all(race.sortsRacialRef.map((ref) => _getSort(ref)));
    }
    return race;
  }
};
