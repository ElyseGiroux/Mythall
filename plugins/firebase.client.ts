import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  // Set Global State
  setStateFirebaseUser(JSON.parse(localStorage.getItem("user") as any));

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Fetch User Roles
      const { data: roles } = await useFetch(`/api/roles/${user.uid}`);
      const userWithRoles: UserWithRoles = {
        ...user,
        roles: roles.value as Roles,
      };

      // Set Global State
      setStateFirebaseUser(userWithRoles);

      // Set to local storage to avoid waiting on onAuthStateChanged when refreshing the app
      localStorage.setItem("user", JSON.stringify(userWithRoles));
    } else {
      // Set Global State
      setStateFirebaseUser();

      // Reset local storage to make sure middleware are effective as soon as we reload
      localStorage.setItem("user", JSON.stringify(null));
    }
  });
});
