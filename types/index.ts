import { Timestamp } from "firebase-admin/firestore";
import { User } from "firebase/auth";

declare global {
  // Database layer
  interface EcoleDB {
    id: string;
    nom: string;
  }

  interface Roles {
    animateur: boolean;
    organisateur: boolean;
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

  interface UserWithRoles extends User {
    roles?: Roles;
  }

  // Frontend layer
  interface Ecole extends EcoleDB {}

  interface Sort extends SortDB {
    id?: string;
    ecole: Ecole;
  }
}

export {};
