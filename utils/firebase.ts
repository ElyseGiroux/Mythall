export const setStateFirebaseUser = (user?: UserWithRoles) => {
  useFirebaseUser().value = user ? user : null;
  setStateIsAnimateur();
  setStateIsOrganisateur();
};

const setStateIsAnimateur = () => {
  if (useFirebaseUser().value?.roles?.animateur || useFirebaseUser().value?.roles?.organisateur) {
    useIsAnimateur().value = true;
  } else {
    useIsAnimateur().value = false;
  }
};

const setStateIsOrganisateur = () => {
  if (useFirebaseUser().value?.roles?.organisateur) {
    useIsOrganisateur().value = true;
  } else {
    useIsOrganisateur().value = false;
  }
};
