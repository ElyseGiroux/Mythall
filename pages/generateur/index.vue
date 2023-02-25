<template>
  <section class="">
    <div class="main-section">
      <Joueurs v-if="user" />
      <Animateurs v-if="isAnimateur" />
      <Organisateurs v-if="isOrganisateur" />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["joueur"],
});
const user = useFirebaseUser();
const isAnimateur = useIsAnimateur().value;
const isOrganisateur = useIsOrganisateur().value;
</script>
