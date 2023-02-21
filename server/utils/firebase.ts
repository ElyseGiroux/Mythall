import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const config = useRuntimeConfig();
const serviceAccount = JSON.parse(config.FIREBASE);

export const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: config.FIREBASEURL,
});

export const firestore = getFirestore();
