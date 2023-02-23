import { Timestamp } from "firebase-admin/firestore";
import { User } from "firebase/auth";

declare global {
  interface Alignement extends AlignementDB {
    id?: string;
  }
  interface AlignementDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
  }

  interface Aptitude {
    id?: string;
  }
  interface AptitudeDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    donsEquivalentRef?: string[];
    sortsEquivalentRef?: string[];
    immunitesRef?: string[];
    resistances?: ResistanceItem[];
    statistiques?: StatistiqueItem[];
    choix?: Choix[];
  }
  interface AptitudeItem {
    aptitude?: Aptitude;
    aptitudeRef: string;
    niveauObtention: number;
  }

  interface Choix {
    type: string;
    quantite: number;
    niveauObtention: number;
    categorie?: string;
    domaine?: Domaine;
    ref: string;
  }

  interface Classe extends ClasseDB {
    id?: string;
  }
  interface ClasseDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    obligations: string;
    avantages: string;
    desavantages: string;
    alignementPermisRef: string[];
    multiclassementRef: string[];
    aptitudes?: AptitudeItem[];
    sortsDisponible?: SortItem[];
    sorts?: SortItem[];
    choix?: Choix[];
    dons?: DonItem[];
    statistiques?: StatistiqueItem[];
    resistances?: ResistanceItem[];
    immunitesRef: string[];
    type: string; // Lanceur de sort
    sort: string; // Divin ou Profane
    prestige: boolean;
  }

  interface ClasseItem {
    classe?: Classe;
    classeRef: string;
    niveau: Number;
  }

  interface Divinite extends DiviniteDB {
    id?: string;
  }
  interface DiviniteDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    prononciation: string;
    titre: string;
    rang: string;
    alignementRef: string;
    alignementPermisRef: string[];
    domainesRef: string[];
    armeDePredilection: string;
    relations: string;
    dogmes: string;
  }

  interface Domaine extends DomaineDB {
    id?: string;
  }
  interface DomaineDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    bonus: string;
    domaineContraireRef: string[];
    alignementPermisRef: string[];
    multiclassementRef: string[];
    aptitudes: AptitudeItem[];
    dons?: DonItem[];
    sorts?: SortItem[];
    choix?: Choix[];
  }

  interface Don extends DonDB {
    id?: string;
  }
  interface DonDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    niveauRequis?: number;
    nlsRequis?: number;
    niveauMaxObtention?: number;
    categorie: string; // Normal, Épique
    afficherNiveau?: boolean;
    classesAutorise?: ClasseItem[];
    donsRequisRef?: string[];
    immunitesRef?: string[];
    racesAutoriseRef?: string[];
    resistances?: ResistanceItem[];
    statistiques?: StatistiqueItem[];
    modificateursRef?: string[];
  }
  interface DonItem {
    don?: Don;
    donRef: string;
    niveauObtention?: number;
    niveauEffectif?: number;
  }

  interface Ecole extends EcoleDB {
    id?: string;
  }
  interface EcoleDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
  }

  interface Esprit extends EspritDB {
    id?: string;
  }
  interface EspritDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    aptitudes?: AptitudeItem[];
    dons?: DonItem[];
    sorts?: SortItem[];
  }

  interface Evenement extends EvenementDB {
    // ...
  }
  interface EvenementDB {
    // ...
  }

  interface Fourberie extends FourberieDB {
    id?: string;
  }
  interface FourberieDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    afficherNiveau?: boolean;
    fourberiesRequisRef?: string[];
    donsEquivalentRef?: string[];
    modificateurRef?: string[];
  }
  interface FourberieItem {
    fourberie?: Fourberie;
    fourberieRef: string;
    niveauObtention: number;
    niveauEffectif: number;
  }

  interface Immunite extends ImmuniteDB {
    id?: string;
  }
  interface ImmuniteDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
  }

  interface Ordre extends OrdreDB {
    id?: string;
    alignementPermis?: Alignement[];
  }
  interface OrdreDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    description: string;
    classeRef: string;
    multiclassementRef: string[];
    alignementPermisRef: string[];
  }

  // ...Progression sort recopiable...
  interface Personnage extends PersonnageDB {
    id?: string;
  }
  interface PersonnageDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    alignementRef?: string;
    classes?: ClasseItem[];
    dons?: DonItem[];
    aptitudes?: AptitudeItem[];
    sorts?: SortItem[];
    fourberies?: FourberieItem[];
    raceRef?: string;
    userRef: string;
    ecoleRef?: string;
    espritRef?: string;
    dieuRef?: string; // ... Need migration throught a script to diviniteRef in DB
    ordreRef?: string;
    domainesRef?: string[];
    vie?: number;
    gnEffectif?: number;
  }

  interface Race extends RaceDB {
    id?: string;
    statistiques?: StatistiqueItem[];
    resistances?: ResistanceItem[];
  }
  interface RaceDB {
    nom: string;
    description: string;
    obligations: string;
    avantages: string;
    desavantages: string;
    alignementPermisRef?: string[];
    classesDisponibleRef?: string[];
    ajustement?: number;
    immunitesRef?: string[];
    sortsRacialRef?: string[];
    donsRacialRef?: string[];
    aptitudesRacialRef?: string[];
  }

  interface Resistance extends ResistanceDB {
    id?: string;
  }
  interface ResistanceDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
  }
  interface ResistanceItem {
    resistance?: Resistance;
    resistanceRef: string;
    niveau: number;
    valeur: number;
    cummulable: boolean;
  }
  interface ResistanceValue {
    resistance?: Resistance;
    valeur: number;
  }

  interface Statistique extends StatistiqueDB {
    id?: string;
  }
  interface StatistiqueDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
  }
  interface StatistiqueItem {
    statistique?: Statistique;
    statistiqueRef: string;
    niveau: number;
    valeur: number;
    cummulable: boolean;
  }
  interface StatistiqueValue {
    statistique?: Statistique;
    valeur: number;
  }

  interface Roles {
    animateur: boolean;
    organisateur: boolean;
  }

  interface Sort extends SortDB {
    id?: string;
    ecole: Ecole;
  }
  interface SortDB {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    nom: string;
    niveau: string;
    porte: string;
    duree: string;
    zone: string;
    sommaire: string;
    description: string;
    incantation: string;
    ecoleRef: string;
  }
  interface SortItem {
    sort?: Sort;
    sortRef: string;
    niveauObtention: number;
  }

  interface UserWithRoles extends User {
    roles?: Roles;
  }
}

export {};
