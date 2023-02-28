import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const divinite: Divinite = body.divinite;

    // Map data to DB data to remove unwanted properties
    const diviniteDB: DiviniteDB = {
      createdAt: divinite.createdAt ? divinite.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: divinite.nom,
      prononciation: divinite.prononciation,
      titre: divinite.titre,
      rang: divinite.rang,
      alignementRef: divinite.alignementRef,
      alignementPermisRef: divinite.alignementPermisRef,
      domainesRef: divinite.domainesRef,
      armeDePredilection: divinite.armeDePredilection,
      relations: divinite.relations,
      dogmes: divinite.dogmes,
    };

    if (params.id == "creation") {
      await firestore
        .collection("dieux")
        .doc()
        .create(diviniteDB as any);
    } else {
      await firestore
        .collection("dieux")
        .doc(params.id)
        .update(diviniteDB as any);
    }

    return true;
  }
});
