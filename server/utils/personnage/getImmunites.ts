export const _getImmunites = async (personnage: Personnage) => {
  if (!personnage.immunites) personnage.immunites = [];

  //Race Immunites
  if (personnage?.race?.immunitesRef) {
    personnage.immunites = [
      ...(<Immunite[]>personnage.immunites),
      ...personnage.race.immunitesRef.map((ref) => {
        return {
          id: ref,
        } as Immunite;
      }),
    ];
  }

  //Classes Immunites
  personnage.classes?.forEach((classeItem) => {
    if (classeItem?.classe?.immunitesRef) {
      personnage.immunites = [
        ...(<Immunite[]>personnage.immunites),
        ...classeItem.classe.immunitesRef.map((ref) => {
          return {
            id: ref,
          } as Immunite;
        }),
      ];
    }
  });

  //Aptitudes Immunites
  personnage.aptitudes?.forEach((aptitudeItem) => {
    if (aptitudeItem?.aptitude?.immunitesRef) {
      personnage.immunites = [
        ...(<Immunite[]>personnage.immunites),
        ...aptitudeItem?.aptitude?.immunitesRef.map((ref) => {
          return {
            id: ref,
          } as Immunite;
        }),
      ];
    }
  });

  //Dons Immunites
  personnage.dons?.forEach((donItem) => {
    if (donItem.don?.immunitesRef) {
      personnage.immunites = [
        ...(<Immunite[]>personnage.immunites),
        ...donItem.don.immunitesRef.map((ref) => {
          return {
            id: ref,
          } as Immunite;
        }),
      ];
    }
  });

  // Load Immunites
  personnage.immunites = await Promise.all(personnage.immunites.map((i) => _getImmunite(<string>i.id)));

  return personnage.immunites;
};

const _getImmunite = async (id: string) => {
  const snap = await firestore.collection("immunites").doc(id).get();
  return { id: snap.id, ...snap.data() } as Immunite;
};
