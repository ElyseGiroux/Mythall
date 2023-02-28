export const _getNiveauEffectif = (personnage: Personnage) => {
  // Niveau Effectif
  personnage.niveauEffectif = personnage?.classes?.map((ci) => ci.niveau).reduce((a, b) => a + +b, 0) || 0;

  // Niveau Réel
  personnage.niveauReel = personnage?.classes?.map((ci) => ci.niveau).reduce((a, b) => a + +b, 0) || 0;

  // Niveau Divin
  personnage.niveauDivin =
    personnage?.classes
      ?.filter((ci) => ci.classe?.sort == "Divin")
      .reduce((acc, ci) => {
        if (ci.classe?.type == "Lanceur de Sort") {
          return acc + +ci.niveau;
        } else {
          return acc + +Math.round(ci.niveau / 2);
        }
      }, 0) || 0;

  // Niveau Profane
  personnage.niveauProfane =
    personnage?.classes
      ?.filter((ci) => ci.classe?.sort == "Profane")
      .reduce((acc, ci) => {
        if (ci.classe?.type == "Lanceur de Sort") {
          return acc + +ci.niveau;
        } else {
          return acc + +Math.round(ci.niveau / 2);
        }
      }, 0) || 0;

  // Safety check if no classes are defined
  if (!personnage.niveauEffectif) personnage.niveauEffectif = 0;
  if (!personnage.niveauReel) personnage.niveauReel = 0;
  if (!personnage.niveauDivin) personnage.niveauDivin = 0;
  if (!personnage.niveauProfane) personnage.niveauProfane = 0;

  // Ajustement de niveau
  if (personnage?.race?.ajustement) {
    personnage.niveauEffectif += +personnage.race.ajustement;
    if (personnage.niveauProfane > 0) personnage.niveauProfane += +personnage.race.ajustement;
    if (personnage.niveauDivin > 0) personnage.niveauDivin += +personnage.race.ajustement;
  }

  return personnage;
};
