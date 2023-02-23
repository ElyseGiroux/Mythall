<template>
  <section class="">
    <div class="max-w-main px-main py-32">
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
