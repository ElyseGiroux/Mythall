import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const ecole: Ecole = body.ecole;

    // Map data to DB data to remove unwanted properties
    const ecoleDB: EcoleDB = {
      createdAt: ecole.createdAt ? ecole.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: ecole.nom,
    };

    if (params.id == "creation") {
      await firestore
        .collection("ecoles")
        .doc()
        .create(ecoleDB as any);
    } else {
      await firestore
        .collection("ecoles")
        .doc(params.id)
        .update(ecoleDB as any);
    }

    return true;
  }
});
