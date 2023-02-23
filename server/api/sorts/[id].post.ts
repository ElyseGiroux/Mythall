import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const sort: Sort = body.sort;

    // Map data to DB data to remove unwanted properties
    const sortDB: SortDB = {
      createdAt: sort.createdAt ? sort.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: sort.nom,
      niveau: sort.niveau,
      porte: sort.porte,
      duree: sort.duree,
      zone: sort.zone,
      sommaire: sort.sommaire,
      description: sort.description,
      incantation: sort.incantation,
      ecoleRef: sort.ecoleRef,
    };

    if (params.id == "creation") {
      await firestore
        .collection("sorts")
        .doc()
        .create(sortDB as any);
    } else {
      await firestore
        .collection("sorts")
        .doc(params.id)
        .update(sortDB as any);
    }

    return true;
  }
});
