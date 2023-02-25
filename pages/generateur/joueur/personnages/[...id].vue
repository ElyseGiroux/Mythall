<template>
  <section class="my-8 mx-auto max-w-7xl">
    <Personnage :personnage="personnage" />
    <NuxtLink to="/generateur/joueur/personnages">Retour à la liste des personnages</NuxtLink>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["joueur"],
});
const route = useRoute();
const { data: personnage } = await useFetch(`/api/personnages/${route.params.id}`);
</script>
