<template>
  <section class="">
    <div class="main-section">
      <ClientOnly>
        <Animateurs v-if="isAnimateur" />
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["animateur"],
});
const isAnimateur = useIsAnimateur().value;
</script>
