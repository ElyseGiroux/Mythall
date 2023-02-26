import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const personnage: Personnage = body.personnage;

    // Map data to DB data to remove unwanted properties
    const personnageDB: PersonnageDB = {
      createdAt: personnage.createdAt ? personnage.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: personnage.nom,
      // niveau: personnage.niveau,
      // porte: personnage.porte,
      // duree: personnage.duree,
      // zone: personnage.zone,
      // sommaire: personnage.sommaire,
      // description: personnage.description,
      // incantation: personnage.incantation,
      // ecoleRef: personnage.ecoleRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("personnages")
        .doc()
        .create(personnageDB as any);
    } else {
      await firestore
        .collection("personnages")
        .doc(params.id)
        .update(personnageDB as any);
    }

    return true;
  }
});
