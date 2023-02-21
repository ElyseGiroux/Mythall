<template>
  <section class="my-8 mx-auto max-w-7xl">
    <Sort :sort="sort" />
    <NuxtLink to="/sorts">Retour à la liste des sorts</NuxtLink>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: sort } = await useFetch(`/api/sorts/${route.params.id}`);
</script>
