import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const body = await readBody(event);

  if (params && params.id) {
    // Convert body data to typed object for typings
    const user: UserDB = body.user;

    // Map data to DB data to remove unwanted properties
    const userDB: UserDB = {
      createdAt: user.createdAt ? user.createdAt : Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      uid: user.uid,
      email: user.email,
      displayname: user.displayname,
      photoURL: user.photoURL,
      roles: user.roles,
    };

    if (params.id == "creation") {
      await firestore
        .collection("users")
        .doc()
        .create(userDB as any);
    } else {
      await firestore
        .collection("users")
        .doc(params.id)
        .update(userDB as any);
    }

    return true;
  }
});
