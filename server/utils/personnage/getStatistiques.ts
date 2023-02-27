export const statistiqueIds = {
  constitution: "OdzM6YHkYw41HXMIcTsw",
  dexterite: "oFeJq3NgdDDEwi0Y1rdR",
  force: "gOg0TFSbU8mvlv8baCXE",
  intelligence: "yKfNuFBQY5UknrTNOxpA",
  sagesse: "HkaChqWpHOlINdla02ja",
  pVTorse: "sCcNIQDoWKUIIcSpkB2m",
  pVBras: "ZSnV9s6cyzYihdFR6wfr",
  pVJambes: "69jKTq64XUCk51EmY0Z1",
  lutte: "Rp8BG8OtlNKl8aeuojdi",
  mana: "3f75skgSz3CWqdERXcqG",
  ki: "py44fmGyDCUnkkBZmto9",
};

export const _getStatistiquesDeBase = async () => {
  // Statistiques de base
  const statistiquesDeBase: Statistique[] = await Promise.all([
    _getStatistique(statistiqueIds.constitution),
    _getStatistique(statistiqueIds.dexterite),
    _getStatistique(statistiqueIds.force),
    _getStatistique(statistiqueIds.intelligence),
    _getStatistique(statistiqueIds.sagesse),
    _getStatistique(statistiqueIds.pVTorse),
    _getStatistique(statistiqueIds.pVBras),
    _getStatistique(statistiqueIds.pVJambes),
    _getStatistique(statistiqueIds.lutte),
    _getStatistique(statistiqueIds.mana),
    _getStatistique(statistiqueIds.ki),
  ]);

  let statistiques: StatistiqueItem[] = statistiquesDeBase.map((s) => {
    const si: StatistiqueItem = {
      statistiqueRef: s.id || "",
      statistique: s,
      valeur: 0,
    };

    if (si.statistiqueRef == statistiqueIds.pVTorse) si.valeur = 3;
    if (si.statistiqueRef == statistiqueIds.pVBras) si.valeur = 2;
    if (si.statistiqueRef == statistiqueIds.pVJambes) si.valeur = 2;
    if (si.statistiqueRef == statistiqueIds.lutte) si.valeur = 3;

    return si;
  });

  return statistiques;
};

export const _getStatistiques = async (personnage: Personnage) => {
  // Add or update value and consider if cumulable or not
  const _setStatistique = (si: StatistiqueItem) => {
    const statistique = personnage?.statistiques?.find((s) => s.statistiqueRef == si.statistiqueRef);
    if (statistique) {
      statistique.valeur = si.cummulable
        ? (statistique.valeur += si.valeur) // Cumulable l'ajoute à la valeur
        : (statistique.valeur = Math.max(statistique.valeur, si.valeur)); // Non Cumulable prend la plus forte valeur
    } else {
      personnage.statistiques?.push(si);
    }
  };

  // Race Statistiques
  if (personnage.race && personnage.race.statistiques) {
    personnage.race.statistiques.filter((si) => personnage.niveauReel >= si.niveau).forEach((si) => _setStatistique(si));
  }

  // Classe Statistiques
  if (personnage.classes) {
    personnage?.classes
      .flatMap((ci) => ci.classe?.statistiques?.filter((s) => ci.niveau >= s.niveau))
      .forEach((si) => _setStatistique(<StatistiqueItem>si));
  }

  // Aptitude Statistiques
  if (personnage.aptitudes) {
    personnage?.aptitudes
      .flatMap((ai) => ai.aptitude?.statistiques?.filter((s) => personnage.niveauReel >= s.niveau))
      .forEach((si) => _setStatistique(<StatistiqueItem>si));
  }

  // Don Statistiques
  if (personnage.dons) {
    personnage?.dons.flatMap((di) => di.don?.statistiques).forEach((si) => _setStatistique(<StatistiqueItem>si));
  }

  // Load statistique data of statistiques which aren't currently populated
  if (personnage.statistiques) {
    const missingStatistiques = await Promise.all(
      personnage.statistiques.filter((si) => !si.statistique).map((si) => _getStatistique(si.statistiqueRef))
    );
    missingStatistiques.forEach((s) => {
      // @ts-ignore
      personnage.statistiques.find((ps) => ps.statistiqueRef == s.id).statistique = s;
    });
  }

  // Modificateurs
  if (personnage.statistiques) {
    // Statistiques du personnage
    const constitution = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.constitution);
    const force = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.force);
    const dexterite = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.dexterite);
    const intelligence = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.intelligence);
    const sagesse = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.sagesse);
    const pvTorse = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.pVTorse);
    const pVBras = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.pVBras);
    const pVJambes = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.pVJambes);
    const lutte = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.lutte);
    const mana = personnage.statistiques.find((s) => s.statistiqueRef == statistiqueIds.mana);

    // Points de vie
    if (constitution) {
      if (pvTorse) pvTorse.valeur += constitution.valeur;
      if (pVBras) pVBras.valeur += constitution.valeur;
      if (pVJambes) pVJambes.valeur += constitution.valeur;
    }

    // Correcteur de points de vie
    if (pvTorse && pvTorse?.valeur <= 0) pvTorse.valeur = 1;
    if (pVBras && pVBras?.valeur <= 0) pVBras.valeur = 1;
    if (pVJambes && pVJambes?.valeur <= 0) pVJambes.valeur = 1;

    // Points de lutte
    if (lutte) {
      if (force) lutte.valeur += force?.valeur;
      if (dexterite) lutte.valeur += dexterite?.valeur;
    }

    // Correcteur de lutte
    if (lutte && lutte.valeur < 0) lutte.valeur = 0;

    // Mana
    let manaProfane = 0;
    let manaDivine = 0;
    const ajustement = personnage.race?.ajustement || 0;

    // Profane
    if (personnage.niveauProfane > ajustement) {
      manaProfane += personnage.niveauProfane;
      manaProfane += 4;

      if (intelligence && intelligence.valeur == 1) {
        manaProfane += 1;
        manaProfane = Math.round(personnage.niveauProfane / 2 + manaProfane);
      }

      if (intelligence && intelligence?.valeur > 1) {
        manaProfane += 2;
        manaProfane = Math.round((personnage.niveauProfane + 1) / 2 + manaProfane);
      }
    }

    // Divin
    if (personnage.niveauDivin > ajustement) {
      manaDivine += personnage.niveauDivin;
      manaDivine += 4;

      // Modificateur Sagesse
      if (sagesse && sagesse.valeur == 1) {
        manaDivine += 1;
        manaDivine = Math.round(personnage.niveauDivin / 2 + manaDivine);
      }

      if (sagesse && sagesse?.valeur > 1) {
        manaDivine += 2;
        manaDivine = Math.round((personnage.niveauDivin + 1) / 2 + manaDivine);
      }
    }

    // Use the best value for mana
    if (mana) mana.valeur = manaProfane >= manaDivine ? manaProfane : manaDivine;
  }

  return personnage.statistiques;
};

const _getStatistique = async (id: string) => {
  const snap = await firestore.collection("statistiques").doc(id).get();
  return { id: snap.id, ...snap.data() } as Statistique;
};
