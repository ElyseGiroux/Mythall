<template>
  <div
    v-if="props.isOpen"
    class="fixed top-0 flex h-screen w-screen flex-col items-center justify-center gap-4">
    <div
      class="absolute h-full w-full bg-black bg-opacity-75"
      @click="$emit('cancel')"></div>
    <div class="max-w-main px-main relative">
      <div class="card bg-white">
        <p
          class="my-4"
          v-html="props.message"></p>
        <div class="flex justify-center gap-4 md:justify-end">
          <button
            @click="$emit('cancel')"
            class="btn-secondary">
            Annuler
          </button>
          <button
            @click="$emit('confirm')"
            class="btn-primary">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean; message?: string }>();
</script>
