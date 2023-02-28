import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const fourberie: Fourberie = body.fourberie;

    // Map data to DB data to remove unwanted properties
    const fourberieDB: FourberieDB = {
      createdAt: fourberie.createdAt ? fourberie.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: fourberie.nom,
      description: fourberie.description,
      afficherNiveau: fourberie.afficherNiveau,
      fourberiesRequisRef: fourberie.fourberiesRequisRef,
      donsEquivalentRef: fourberie.donsEquivalentRef,
      modificateurRef: fourberie.modificateurRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("fourberies")
        .doc()
        .create(fourberieDB as any);
    } else {
      await firestore
        .collection("fourberies")
        .doc(params.id)
        .update(fourberieDB as any);
    }

    return true;
  }
});
