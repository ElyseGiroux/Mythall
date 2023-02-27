import { firestore } from "../firebase";

export const _getAptitudes = async (personnage: Personnage) => {
  let aptitudes: AptitudeItem[] = [];

  // Aptitudes Racial
  if (personnage.race && personnage.race.aptitudesRacialRef) {
    aptitudes = [
      ...aptitudes,
      ...personnage.race.aptitudesRacialRef.map((ref) => {
        return {
          aptitudeRef: ref,
        } as AptitudeItem;
      }),
    ];
  }

  // Aptitudes Classes
  if (personnage.classes) {
    personnage.classes.forEach((ci) => {
      aptitudes = [...(aptitudes as AptitudeItem[]), ...(ci.classe?.aptitudes?.filter((ai) => ci.niveau >= ai.niveauObtention) as AptitudeItem[])];
    });
  }

  // Aptitudes Domaines
  if (personnage.domaines) {
    const niveauPretreDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "fNqknNgq0QmHzUaYEvEd")?.niveau || 0;
    personnage.domaines.forEach((domaine) => {
      aptitudes = [...(aptitudes as AptitudeItem[]), ...(domaine.aptitudes?.filter((ai) => niveauPretreDuPersonnage >= ai.niveauObtention) as AptitudeItem[])];
    });
  }

  // Aptitudes Esprit
  if (personnage.esprit) {
    const niveauChamanDuPersonnage = personnage.classes?.find((ci) => ci.classeRef == "wW48swrqmr77awfyADMX")?.niveau || 0;
    aptitudes = [
      ...(aptitudes as AptitudeItem[]),
      ...(personnage.esprit.aptitudes?.filter((ai) => niveauChamanDuPersonnage >= ai.niveauObtention) as AptitudeItem[]),
    ];
  }

  // Filter Duplicates
  aptitudes = aptitudes.filter((ai, i, self) => i === self.findIndex((a) => a.aptitudeRef === ai.aptitudeRef));

  // Fetch aptitudes from database
  const snaps = await Promise.all(aptitudes.map((ai) => firestore.collection("aptitudes").doc(ai.aptitudeRef).get()));

  // Assign each aptitudes to it's coresponding data
  aptitudes.forEach((ai, i) => {
    ai.aptitude = { id: ai.aptitudeRef, ...snaps[i].data() } as Aptitude;
  });

  return aptitudes;
};
