import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const domaine: Domaine = body.domaine;

    // Map data to DB data to remove unwanted properties
    const domaineDB: DomaineDB = {
      createdAt: domaine.createdAt ? domaine.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: domaine.nom,
      bonus: domaine.bonus,
      domaineContraireRef: domaine.domaineContraireRef,
      alignementPermisRef: domaine.alignementPermisRef,
      multiclassementRef: domaine.multiclassementRef,
      aptitudes: domaine.aptitudes,
      dons: domaine.dons,
      sorts: domaine.sorts,
      choix: domaine.choix,
    };

    if (params.id == "creation") {
      await firestore
        .collection("domaines")
        .doc()
        .create(domaineDB as any);
    } else {
      await firestore
        .collection("domaines")
        .doc(params.id)
        .update(domaineDB as any);
    }

    return true;
  }
});
