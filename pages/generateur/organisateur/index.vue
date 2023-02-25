<template>
  <section class="">
    <div class="main-section">
      <Organisateurs v-if="isOrganisateur" />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["organisateur"],
});
const isOrganisateur = useIsOrganisateur().value;
</script>
