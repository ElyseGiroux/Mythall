import { firestore } from "../firebase";

export const _getClasses = async (personnage: Personnage): Promise<ClasseItem[] | undefined> => {
  if (personnage.classes) {
    const snaps = await Promise.all(personnage.classes.map((classeItem) => firestore.collection("classes").doc(classeItem.classeRef).get()));
    return snaps.map((snap, i) => {
      return {
        classeRef: snap.id,
        classe: snap.data(),
        niveau: personnage?.classes?.find((c) => c.classeRef == snap.id)?.niveau,
      } as ClasseItem;
    });
  }
};
