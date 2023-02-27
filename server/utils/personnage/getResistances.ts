export const _getResistances = async (personnage: Personnage) => {
  // Add or update value and consider if cumulable or not
  const _setResistance = (ri: ResistanceItem) => {
    if (!personnage.resistances) personnage.resistances = [];
    const resistance = personnage?.resistances?.find((s) => s.resistanceRef == ri.resistanceRef);
    if (resistance) {
      resistance.valeur = ri.cummulable
        ? (resistance.valeur += ri.valeur) // Cumulable l'ajoute à la valeur
        : (resistance.valeur = Math.max(resistance.valeur, ri.valeur)); // Non Cumulable prend la plus forte valeur
    } else {
      personnage.resistances?.push(ri);
    }
  };

  // Race Resistances
  if (personnage.race && personnage.race.resistances) {
    personnage.race.resistances.forEach((ri) => _setResistance(ri));
  }

  // Classe Resistances
  if (personnage.classes) {
    personnage?.classes
      .flatMap((ci) => ci.classe?.resistances?.filter((s) => ci.niveau >= s.niveau))
      .forEach((ri) => _setResistance(<ResistanceItem>ri));
  }

  // Aptitude Resistances
  if (personnage.aptitudes) {
    personnage?.aptitudes
      .flatMap((ai) => ai.aptitude?.resistances?.filter((s) => personnage.niveauReel >= s.niveau))
      .forEach((ri) => _setResistance(<ResistanceItem>ri));
  }

  // Don Resistances
  if (personnage.dons) {
    personnage?.dons.flatMap((di) => di.don?.resistances).forEach((ri) => _setResistance(<ResistanceItem>ri));
  }

  // Load resistance data of resistances which aren't currently populated
  if (personnage.resistances) {
    const missingResistances = await Promise.all(
      personnage.resistances.filter((ri) => !ri.resistance).map((ri) => _getResistance(ri.resistanceRef))
    );
    missingResistances.forEach((s) => {
      // @ts-ignore
      personnage.resistances.find((ps) => ps.resistanceRef == s.id).resistance = s;
    });
  }

  return personnage.resistances;
};

const _getResistance = async (id: string) => {
  const snap = await firestore.collection("resistances").doc(id).get();
  return { id: snap.id, ...snap.data() } as Resistance;
};
