export const _getCapaciteSpeciales = async (personnage: Personnage) => {
  if (!personnage.capaciteSpeciales) personnage.capaciteSpeciales = [];

  personnage.capaciteSpeciales = personnage.statistiques?.filter(
    (si) => !Object.values(statistiqueIds).find((id) => si.statistiqueRef == id)
  );

  return personnage;
};
