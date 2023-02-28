import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const ordre: Ordre = body.ordre;

    // Map data to DB data to remove unwanted properties
    const ordreDB: OrdreDB = {
      createdAt: ordre.createdAt ? ordre.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: ordre.nom,
      description: ordre.description,
      classeRef: ordre.classeRef,
      multiclassementRef: ordre.multiclassementRef,
      alignementPermisRef: ordre.alignementPermisRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("ordres")
        .doc()
        .create(ordreDB as any);
    } else {
      await firestore
        .collection("ordres")
        .doc(params.id)
        .update(ordreDB as any);
    }

    return true;
  }
});
