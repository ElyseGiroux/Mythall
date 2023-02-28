import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const don: Don = body.don;

    // Map data to DB data to remove unwanted properties
    const donDB: DonDB = {
      createdAt: don.createdAt ? don.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: don.nom,
      description: don.description,
      niveauRequis: don.niveauRequis,
      nlsRequis: don.nlsRequis,
      niveauMaxObtention: don.niveauMaxObtention,
      categorie: don.categorie,
      afficherNiveau: don.afficherNiveau,
      classesAutorise: don.classesAutorise,
      donsRequisRef: don.donsRequisRef,
      immunitesRef: don.immunitesRef,
      racesAutoriseRef: don.racesAutoriseRef,
      resistances: don.resistances,
      statistiques: don.statistiques,
      modificateursRef: don.modificateursRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("dons")
        .doc()
        .create(donDB as any);
    } else {
      await firestore
        .collection("dons")
        .doc(params.id)
        .update(donDB as any);
    }

    return true;
  }
});
