import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

//import { firestore } from "../../utils/firebase";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serviceAccount = JSON.parse(config.FIREBASE);

  const apps = getApps();
  if (!apps.length) {
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: config.FIREBASEURL,
    });
  }

  const firestore = getFirestore();

  const snap = await firestore.collection("sorts").limit(9).get();
  return snap.docs.map((snap) => {
    return {
      id: snap.id,
      ...snap.data(),
    };
  });
});
