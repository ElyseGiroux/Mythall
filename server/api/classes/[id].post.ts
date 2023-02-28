import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const classe: Classe = body.classe;

    // Map data to DB data to remove unwanted properties
    const classeDB: ClasseDB = {
      createdAt: classe.createdAt ? classe.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      nom: classe.nom,
      description: classe.description,
      obligations: classe.obligations,
      avantages: classe.avantages,
      desavantages: classe.desavantages,
      alignementPermisRef: classe.alignementPermisRef,
      multiclassementRef: classe.multiclassementRef,
      aptitudes: classe.aptitudes,
      sortsDisponible: classe.sortsDisponible,
      sorts: classe.sorts,
      choix: classe.choix,
      dons: classe.dons,
      statistiques: classe.statistiques,
      resistances: classe.resistances,
      immunitesRef: classe.immunitesRef,
      type: classe.type,
      sort: classe.sort,
      prestige: classe.prestige,
    };

    if (params.id == "creation") {
      await firestore
        .collection("classes")
        .doc()
        .create(classeDB as any);
    } else {
      await firestore
        .collection("classes")
        .doc(params.id)
        .update(classeDB as any);
    }

    return true;
  }
});
