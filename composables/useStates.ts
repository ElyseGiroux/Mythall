export const useFirebaseUser = () => useState("firebaseUser", () => null as UserWithRoles | null);
export const useIsAnimateur = () => useState("isAnimateur", () => false);
export const useIsOrganisateur = () => useState("isOrganisateur", () => false);
export const useNotifications = () => useState("notifications", () => []);
export const useIsLoading = () => useState("isLoading", () => false);
export const useLoadingMessage = () => useState("loadingMessage", () => "");
