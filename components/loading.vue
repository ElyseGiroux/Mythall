<template>
  <div
    v-if="isLoading"
    class="fixed top-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black bg-opacity-75">
    <span
      class="h-20 w-20 animate-spin rounded-full border-t-4 border-l-4 border-r-4 border-l-accent border-t-primary border-r-primary"></span>
    <p
      class="text-2xl font-light text-white"
      v-html="message ? message : 'Les gobelins travaillent fort...'"></p>
  </div>
</template>

<script lang="ts" setup>
const isLoading = useIsLoading();
const message = useLoadingMessage();
</script>
