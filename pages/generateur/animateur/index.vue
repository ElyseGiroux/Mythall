<template>
  <section class="">
    <div class="main-section">
      <Animateurs v-if="isAnimateur" />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["animateur"],
});
const isAnimateur = useIsAnimateur().value;
</script>
