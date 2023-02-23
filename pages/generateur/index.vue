<template>
  <section class="">
    <div class="max-w-main px-main py-32">
      <ClientOnly>
        <Joueurs v-if="user" />
        <Animateurs v-if="isAnimateur().value" />
        <Organisateurs v-if="isOrganisateur().value" />
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["joueur"],
});
const user = useFirebaseUser();
</script>
