export default defineNuxtRouteMiddleware((to, from) => {
  // Skip server check
  if (process.server) return;

  const firebaseUser = useFirebaseUser();
  if (!firebaseUser?.value?.uid) {
    return navigateTo("/");
  }
});
