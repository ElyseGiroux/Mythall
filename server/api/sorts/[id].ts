import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serviceAccount = JSON.parse(config.FIREBASE);

  const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: config.FIREBASEURL,
  });

  const firestore = getFirestore(app);

  const params = event.context.params;
  if (params && params.id) {
    const snap = await firestore.collection("sorts").doc(params.id).get();
    const ecoleSnap = await firestore.collection("ecoles").doc(snap.data()?.ecoleRef).get();
    return {
      id: snap.id,
      ...snap.data(),
      ecole: ecoleSnap.data() as Ecole,
    } as Sort;
  }
});
