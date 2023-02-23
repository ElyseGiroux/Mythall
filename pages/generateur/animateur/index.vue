<template>
  <section class="">
    <div class="max-w-main px-main py-32">
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
