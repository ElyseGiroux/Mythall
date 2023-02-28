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
      alignementRef: personnage.alignementRef,
      classes: personnage.classes?.map((ci) => {
        delete ci.classe;
        return ci;
      }),
      dons: personnage.dons?.map((di) => {
        delete di.don;
        return di;
      }),
      aptitudes: personnage.aptitudes?.map((ai) => {
        delete ai.aptitude;
        return ai;
      }),
      sorts: personnage.sorts?.map((si) => {
        delete si.sort;
        return si;
      }),
      fourberies: personnage.fourberies?.map((fi) => {
        delete fi.fourberie;
        return fi;
      }),
      raceRef: personnage.raceRef,
      userRef: personnage.userRef,
      ecoleRef: personnage.ecoleRef,
      espritRef: personnage.espritRef,
      dieuRef: personnage.dieuRef,
      ordresRef: personnage.ordresRef,
      domainesRef: personnage.domainesRef,
      vie: personnage.vie,
      gnEffectif: personnage.gnEffectif,
    };

    // @ts-ignore
    Object.keys(personnageDB).forEach((key) => personnageDB[key] === undefined && delete personnageDB[key]);

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
