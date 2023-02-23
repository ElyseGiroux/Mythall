export default defineNuxtRouteMiddleware((to, from) => {
  // Skip server check
  if (process.server) return;

  // Auth Check
  const firebaseUser = useFirebaseUser();
  if (!firebaseUser?.value?.uid) {
    return navigateTo("/");
  }

  // Role Check
  if (!firebaseUser?.value?.roles?.organisateur) {
    return navigateTo("/");
  }
});
