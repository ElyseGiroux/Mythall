import { firestore } from "../../../utils/firebase";
import { _getRace } from "~~/server/utils/personnage/getRace";
import { _getUser } from "~~/server/utils/personnage/getUser";
import { _getClasses } from "~~/server/utils/personnage/getClasses";
import { _getAlignement } from "~~/server/utils/personnage/getAlignement";
import { _getDivinite } from "~~/server/utils/personnage/getDivinite";
import { _getOrdres } from "~~/server/utils/personnage/getOrdres";
import { _getFourberies } from "~~/server/utils/personnage/getFourberies";
import { _getNiveauEffectif } from "~~/server/utils/personnage/getNiveauEffectif";
import { _getEcole } from "~~/server/utils/personnage/getEcole";
import { _getDomaines } from "~~/server/utils/personnage/getDomaines";
import { _getEsprit } from "~~/server/utils/personnage/getEsprit";
import { _getAptitudes } from "~~/server/utils/personnage/getAptitudes";
import { _getSorts } from "~~/server/utils/personnage/getSorts";
import { _getStatistiquesDeBase } from "~~/server/utils/personnage/getStatistiques";
import { _getResistances } from "~~/server/utils/personnage/getResistances";
import { _getImmunites } from "~~/server/utils/personnage/getImmunites";
import { _getDonsNiveauEffectif } from "~~/server/utils/personnage/getDonsNiveauEffectif";
import { _getCapaciteSpeciales } from "~~/server/utils/personnage/getCapaciteSpeciales";

export default defineEventHandler(async (event): Promise<Personnage | undefined> => {
  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("personnages").doc(params.id).get();

    const personnage = {
      id: snap.id,
      ...snap.data(),
    } as Personnage;

    // Assemblage de votre personnage...
    let data: any = await Promise.all([
      _getUser(personnage.userRef),
      _getRace(personnage),
      _getClasses(personnage),
      _getAlignement(personnage),
      _getDivinite(personnage),
      _getOrdres(personnage),
      _getFourberies(personnage),
    ]);
    personnage.user = data[0];
    personnage.race = data[1];
    personnage.classes = data[2];
    personnage.alignement = data[3];
    personnage.divinite = data[4];
    personnage.ordres = data[5];
    personnage.fourberies = data[6];

    // Niveau Effectif...
    _getNiveauEffectif(personnage);

    // École, Domaines & Esprits...
    data = await Promise.all([_getEcole(personnage), _getDomaines(personnage), _getEsprit(personnage)]);
    personnage.ecole = data[0];
    personnage.domaines = data[1];
    personnage.esprit = data[2];

    // Aptitudes...
    personnage.aptitudes = await _getAptitudes(personnage);

    // Sorts & Dons...
    data = await Promise.all([_getSorts(personnage), _getDons(personnage)]);
    personnage.sorts = data[0];
    personnage.dons = data[1];

    // Statistiques de base...
    personnage.statistiques = await _getStatistiquesDeBase();

    // Statistiques, Resistances & Immunities...
    await Promise.all([_getStatistiques(personnage), _getResistances(personnage), _getImmunites(personnage)]);

    // Niveau de dons & Capacité spéciales...
    await Promise.all([_getDonsNiveauEffectif(personnage), _getCapaciteSpeciales(personnage)]);

    // Assemblage du personnage terminé!");

    // Completed
    return personnage;
  }
});
