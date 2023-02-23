export const useFirebaseUser = () => useState("firebaseUser", () => null as UserWithRoles | null);
export const isAnimateur = () => useState("isAnimateur", () => false);
export const isOrganisateur = () => useState("isOrganisateur", () => false);
