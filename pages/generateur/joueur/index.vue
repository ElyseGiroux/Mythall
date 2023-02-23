<template>
  <section class="">
    <div class="main-section">
      <ClientOnly>
        <Joueurs v-if="user" />
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
