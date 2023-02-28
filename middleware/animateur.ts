export default defineNuxtRouteMiddleware((to, from) => {
  // Skip server check
  if (process.server) return;

  // Auth Check
  const firebaseUser = useFirebaseUser();
  if (!firebaseUser?.value?.uid) {
    return navigateTo("/");
  }

  // Roles Check
  if (!firebaseUser?.value?.roles?.animateur && !firebaseUser?.value?.roles?.organisateur) {
    return navigateTo("/");
  }
});
