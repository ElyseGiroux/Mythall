import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const race: Race = body.race;

    // Map data to DB data to remove unwanted properties
    const raceDB: RaceDB = {
      createdAt: race.createdAt ? race.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: race.nom,
      description: race.description,
      obligations: race.obligations,
      avantages: race.avantages,
      desavantages: race.desavantages,
      alignementPermisRef: race.alignementPermisRef,
      classesDisponibleRef: race.classesDisponibleRef,
      ajustement: race.ajustement,
      immunitesRef: race.immunitesRef,
      sortsRacialRef: race.sortsRacialRef,
      donsRacialRef: race.donsRacialRef,
      aptitudesRacialRef: race.aptitudesRacialRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("races")
        .doc()
        .create(raceDB as any);
    } else {
      await firestore
        .collection("races")
        .doc(params.id)
        .update(raceDB as any);
    }

    return true;
  }
});
