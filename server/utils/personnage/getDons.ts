import { firestore } from "../firebase";

export const _getDons = async (personnage: Personnage) => {
  let dons = personnage.dons || [];

  // Dons racial
  if (personnage.race) {
    dons = [
      ...(dons as DonItem[]),
      ...(personnage.race.donsRacialRef?.map((ref) => {
        return {
          donRef: ref,
        };
      }) as DonItem[]),
    ];
  }

  // Dons des Classes (Obtenue via progression)
  if (personnage.classes) {
    personnage.classes.forEach((ci) => {
      dons = [...(dons as DonItem[]), ...(ci.classe?.dons?.filter((di) => ci.niveau >= di.niveauObtention) as DonItem[])];
    });
  }

  // Dons de Domaines (Obtenue via progression)
  if (personnage.domaines) {
    const niveauPretreDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "fNqknNgq0QmHzUaYEvEd")?.niveau || 0;
    personnage.domaines.forEach((domaine) => {
      dons = [...(dons as DonItem[]), ...(domaine.dons?.filter((di) => niveauPretreDuPersonnage >= di.niveauObtention) as DonItem[])];
    });
  }

  // Dons d'Esprit (Obtenue via progression)
  if (personnage.esprit) {
    const niveauChamanDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "wW48swrqmr77awfyADMX")?.niveau || 0;
    dons = [
      ...(dons as DonItem[]),
      ...(personnage.esprit.dons?.filter((di) => niveauChamanDuPersonnage >= di.niveauObtention) as DonItem[]),
    ];
  }

  // Dons de fourberies (équivalence)
  if (personnage.fourberies) {
    personnage.fourberies
      .filter((fi) => fi.fourberie?.donsEquivalentRef && fi.fourberie?.donsEquivalentRef?.length > 0)
      .forEach((fi) => {
        dons = [
          ...(dons as DonItem[]),
          ...(fi?.fourberie?.donsEquivalentRef?.map((ref) => {
            return {
              donRef: ref,
              niveauObtention: fi.niveauObtention,
            };
          }) as DonItem[]),
        ];
      });
  }

  // Dons d'Aptitudes (équivalence)
  if (personnage.aptitudes) {
    personnage.aptitudes
      .filter((ai) => ai.aptitude?.donsEquivalentRef && ai.aptitude?.donsEquivalentRef?.length > 0)
      .forEach((ai) => {
        dons = [
          ...(dons as DonItem[]),
          ...(ai?.aptitude?.donsEquivalentRef?.map((ref) => {
            return {
              donRef: ref,
              niveauObtention: ai.niveauObtention,
            };
          }) as DonItem[]),
        ];
      });
  }

  // Filter Duplicates
  dons = dons.filter((di, i, self) => i === self.findIndex((a) => a.donRef === di.donRef));

  // Fetch dons data from database
  const donsData = await Promise.all(dons.map((di) => _getDon(di.donRef)));

  // Asdign each dons to it's coresponding data
  dons.map((di, i) => {
    di.don = donsData[i];
  });

  return dons;
};

export const _getDon = async (id: string) => {
  const snap = await firestore.collection("dons").doc(id).get();
  return { id: snap.id, ...snap.data() } as Don;
};
