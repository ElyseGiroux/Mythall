import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useSignIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(getAuth(), email, password);
};
export const useSignOut = async () => {
  await getAuth().signOut();
  navigateTo("/");
};
