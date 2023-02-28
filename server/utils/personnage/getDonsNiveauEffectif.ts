export const _getDonsNiveauEffectif = async (personnage: Personnage) => {
  if (personnage.dons && personnage.statistiques) {
    personnage.dons
      .filter((di) => di?.don?.afficherNiveau)
      .sort((a: DonItem, b: DonItem) => (a.don && b.don && a.don?.nom > b.don?.nom ? 1 : -1))
      .forEach((di) => {
        //Niveau Effectif du Personnage et Niveau d'Obtention
        di.niveauEffectif = personnage.niveauEffectif - (di.niveauObtention - 1);

        // Modificateurs de statistiques
        di.don?.modificateursRef?.forEach((ref) => {
          di.niveauEffectif += personnage.statistiques?.find((si) => si.statistiqueRef == ref)?.valeur || 0;
        });
      });
  }

  return personnage;
};
