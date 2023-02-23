<template>
  <div class="my-8 grid gap-4 md:grid-cols-3">
    <div
      v-for="sort in sorts"
      class="text-center">
      <NuxtLink :to="`/generateur/joueur/sorts/${sort.id}`">{{ sort.nom }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: sorts } = await useFetch("/api/sorts");
</script>
