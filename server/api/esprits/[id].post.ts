import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const esprit: Esprit = body.esprit;

    // Map data to DB data to remove unwanted properties
    const espritDB: EspritDB = {
      createdAt: esprit.createdAt ? esprit.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: esprit.nom,
      description: esprit.description,
      aptitudes: esprit.aptitudes,
      dons: esprit.dons,
      sorts: esprit.sorts,
    };

    if (params.id == "creation") {
      await firestore
        .collection("esprits")
        .doc()
        .create(espritDB as any);
    } else {
      await firestore
        .collection("esprits")
        .doc(params.id)
        .update(espritDB as any);
    }

    return true;
  }
});
