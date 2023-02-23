<template>
  <section class="">
    <div class="main-section">
      <ClientOnly>
        <Organisateurs v-if="isOrganisateur" />
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["organisateur"],
});
const isOrganisateur = useIsOrganisateur().value;
</script>
