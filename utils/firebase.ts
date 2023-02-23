export const setStateFirebaseUser = (user?: UserWithRoles) => {
  useFirebaseUser().value = user ? user : null;
  setStateIsAnimateur();
  setStateIsOrganisateur();
};

const setStateIsAnimateur = () => {
  if (useFirebaseUser().value?.roles?.animateur || useFirebaseUser().value?.roles?.organisateur) {
    isAnimateur().value = true;
  } else {
    isAnimateur().value = false;
  }
};

const setStateIsOrganisateur = () => {
  if (useFirebaseUser().value?.roles?.organisateur) {
    isOrganisateur().value = true;
  } else {
    isOrganisateur().value = false;
  }
};
