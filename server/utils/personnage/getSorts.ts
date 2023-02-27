import { firestore } from "../firebase";

export const _getSorts = async (personnage: Personnage) => {
  let sorts: SortItem[] = [];

  // Sorts des Classes (Obtenue via progression)
  if (personnage.classes) {
    personnage.classes.forEach((ci) => {
      sorts = [...(sorts as SortItem[]), ...(ci.classe?.sorts?.filter((si) => ci.niveau >= si.niveauObtention) as SortItem[])];
    });
  }

  // Sorts de Domaines (Obtenue via progression)
  if (personnage.domaines) {
    const niveauPretreDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "fNqknNgq0QmHzUaYEvEd")?.niveau || 0;
    personnage.domaines.forEach((domaine) => {
      sorts = [...(sorts as SortItem[]), ...(domaine.sorts?.filter((si) => niveauPretreDuPersonnage >= si.niveauObtention) as SortItem[])];
    });
  }

  // Sorts d'Esprit (Obtenue via progression)
  if (personnage.esprit) {
    const niveauChamanDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "wW48swrqmr77awfyADMX")?.niveau || 0;
    sorts = [
      ...(sorts as SortItem[]),
      ...(personnage.esprit.sorts?.filter((si) => niveauChamanDuPersonnage >= si.niveauObtention) as SortItem[]),
    ];
  }

  // Sorts d'Aptitudes (équivalence)
  if (personnage.aptitudes) {
    personnage.aptitudes
      .filter((ai) => ai.aptitude?.sortsEquivalentRef && ai.aptitude?.sortsEquivalentRef?.length > 0)
      .forEach((ai) => {
        sorts = [
          ...(sorts as SortItem[]),
          ...(ai?.aptitude?.sortsEquivalentRef?.map((ref) => {
            return {
              sortRef: ref,
              niveauObtention: ai.niveauObtention,
            };
          }) as SortItem[]),
        ];
      });
  }

  // Filter Duplicates
  sorts = sorts.filter((si, i, self) => i === self.findIndex((a) => a.sortRef === si.sortRef));

  // Fetch sorts data from database
  const sortsData = await Promise.all(sorts.map((si) => _getSort(si.sortRef)));

  // Assign each sorts to it's coresponding data
  sorts.forEach((si, i) => {
    si.sort = sortsData[i];
  });

  return sorts;
};

export const _getSort = async (id: string) => {
  const snap = await firestore.collection("sorts").doc(id).get();
  const ecoleSnap = await firestore.collection("ecoles").doc(snap.data()?.ecoleRef).get();
  return { id: snap.id, ...snap.data(), ecole: ecoleSnap.data() } as Sort;
};
