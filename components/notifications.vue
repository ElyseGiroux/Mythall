<template>
  <div class="fixed top-32 h-auto w-full">
    <div class="max-w-main px-main relative">
      <div
        v-for="(notification, i) of notifications"
        class="card my-4 flex items-center justify-between gap-4 bg-primary/40 text-white backdrop-blur">
        <p v-html="notification"></p>
        <button @click="removeNotification(i)">
          <IconXCircle class="h-8 w-8 fill-primary transition-colors hover:fill-accent" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const notifications = useNotifications().value;
const removeNotification = (i: number) => {
  notifications.splice(i, 1);
};
</script>
