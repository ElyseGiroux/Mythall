<template>
  <div class="my-8">
    <p class="text-center text-lg font-bold">{{ props.sort.nom }} ({{ props.sort.ecole.nom }})</p>
    <p>
      <strong>Niveau:</strong>
      {{ props.sort.niveau }}
    </p>
    <p>
      <strong>Portée:</strong>
      {{ props.sort.porte }}
    </p>
    <p>
      <strong>Durée:</strong>
      {{ props.sort.duree }}
    </p>
    <p>
      <strong>Zone d'effet:</strong>
      {{ props.sort.zone }}
    </p>
    <p>
      <strong>Incantation:</strong>
      {{ props.sort.incantation }}
    </p>
    <p>
      <strong>Sommaire:</strong>
      {{ props.sort.sommaire }}
    </p>
    <p>
      <strong>Description:</strong>
      {{ props.sort.description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ sort: Sort }>();
</script>
