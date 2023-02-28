import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const alignement: Alignement = body.alignement;

    // Map data to DB data to remove unwanted properties
    const alignementDB: AlignementDB = {
      createdAt: alignement.createdAt ? alignement.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: alignement.nom,
    };

    if (params.id == "creation") {
      await firestore
        .collection("alignements")
        .doc()
        .create(alignementDB as any);
    } else {
      await firestore
        .collection("alignements")
        .doc(params.id)
        .update(alignementDB as any);
    }

    return true;
  }
});
