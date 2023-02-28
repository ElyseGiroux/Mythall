import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const aptitude: Aptitude = body.aptitude;

    // Map data to DB data to remove unwanted properties
    const aptitudeDB: AptitudeDB = {
      createdAt: aptitude.createdAt ? aptitude.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: aptitude.nom,
      description: aptitude.description,
      donsEquivalentRef: aptitude.donsEquivalentRef,
      sortsEquivalentRef: aptitude.sortsEquivalentRef,
      immunitesRef: aptitude.immunitesRef,
      resistances: aptitude.resistances,
      statistiques: aptitude.statistiques,
      choix: aptitude.choix,
    };

    if (params.id == "creation") {
      await firestore
        .collection("aptitudes")
        .doc()
        .create(aptitudeDB as any);
    } else {
      await firestore
        .collection("aptitudes")
        .doc(params.id)
        .update(aptitudeDB as any);
    }

    return true;
  }
});
